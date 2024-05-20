const User = require('../models/user.model');
const Join = require('../models/join.model');
const Calendar = require('../models/calendar.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');


// Create a nodemailer transporter for Outlook
const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com', // Outlook SMTP server
  port: 587, // Outlook SMTP port (587 or 465)
  secure: false, // TLS requires secure connection set to false
  auth: {
    user: process.env.EMAIL_USERNAME, // Your Outlook email address
    pass: process.env.EMAIL_PASSWORD // Your Outlook email password
  },
  tls: {
    rejectUnauthorized: false // Ignore SSL certificate verification
  }
});



const controller = {};
controller.createCalendar = async (req, res) => {

  const d= req.body
  d.date=now()
    d.owner=req.decodedToken.userId
  try {
      const calendar = new Calendar(d);
      const savedCalendar = await calendar.save();
      res.status(201).json(savedCalendar);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

// Get all calendar entries for a user
controller.getCalendarsByUser = async (req, res) => {

  try {
      const calendars = await Calendar.find({ owner: req.decodedToken.userId });
      res.status(200).json(calendars);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};
controller.getAllCalendars = async (req, res) => {
  try {
      const calendars = await Calendar.find();
      res.status(200).json(calendars);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

// Get a single calendar entry by ID
controller.getCalendarById = async (req, res) => {
  try {
      const calendar = await Calendar.findById(req.params.id).populate('owner', 'username email');
      if (!calendar) {
          return res.status(404).json({ message: 'Calendar entry not found' });
      }
      res.status(200).json(calendar);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

// Update a calendar entry
controller.updateCalendar = async (req, res) => {
  if(req.body.owner!==req.decodedToken.userId)return req.status(404).json({message:'not the user'})
  try {
      const updatedCalendar = await Calendar.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedCalendar) {
          return res.status(404).json({ message: 'Calendar entry not found' });
      }
      res.status(200).json(updatedCalendar);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

// Delete a calendar entry
controller.deleteCalendar = async (req, res) => {
  try {
      const deletedCalendar = await Calendar.findByIdAndDelete(req.params.id);
      if (!deletedCalendar) {
          return res.status(404).json({ message: 'Calendar entry not found' });
      }
      res.status(200).json({ message: 'Calendar entry deleted' });
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};


// Middleware to verify JWT token
controller.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
 
    if (!token) return res.status(401).send({ message: 'Unauthorized' });

    const decodedToken = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.decodedToken = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).send({ message: 'Unauthorized' });
  }
};

// Middleware to verify admin privileges
controller.verifyAdmin = async (req, res, next) => {
  try {let token = req.headers.authorization; // Use 'authorization' instead of 'Authorization'
  if (!token) return res.status(401).send({ message: 'Unauthorized no token' });
  token=token.split(" ")[1]
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.decodedToken = decodedToken;
    if (decodedToken.userId !== process.env.ADMIN_ID) {

      return res.status(401).send({ message: 'Unauthorized admin' });
    }

    next();
  } catch (error) {
    console.error('Error verifying admin:', error);
    return res.status(401).send({ message: 'Unauthorized error' });
  }
};

// Function to generate a random join code
function generateJoinCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

// Controller to send join code via email
controller.sendJoinCodeByEmail = async (req, res) => {
  const receiver = req.body.receiver;
  const joinkey = generateJoinCode(6);

  try {
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: receiver,
      subject: 'Your Join Code',
      text: `Your join code is: ${joinkey}`
    };

    await transporter.sendMail(mailOptions);
    const newJoin = new Join({ key: joinkey });
    await newJoin.save();

    res.send({ message: 'Join code sent successfully' });
  } catch (error) {
    console.error('Error sending join code:', error);
    res.status(500).send('An error occurred while sending the join code');
  }
};

// Controller to handle user signup
controller.signUp = async (req, res) => {
  try {
    const { join, email, password, firstName, lastName, dateNais, mobile } = req.body;

    if (!join || !email || !password || !firstName || !lastName || !dateNais || !mobile) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    const joined = await Join.findOne({ key: join });
    if (!joined) {
      return res.status(400).send({ message: 'Invalid join code' });
    }

    // Remove the join document from the database
    await Join.findOneAndDelete({ key: join });

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const username = `${firstName.substring(0, 2)}${lastName.substring(0, 2)}${dateNais.substring(0, 2)}`;

    const newUser = new User({ email, password: hashedPassword, username, firstName, lastName, dateNais, mobile });
    const savedUser = await newUser.save();

    return res.status(201).send({
      message: "User created successfully",
      user: savedUser
    });
  } catch (error) {
    console.error('Error signing up:', error);
    return res.status(500).send("An error occurred while signing up.");
  }
};

// Controller to handle user login
controller.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(404).send({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }
//create token to connect
    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.send({
      message: "Logged in successfully",
      token,
      isAdmin:existingUser._id==process.env.ADMIN_ID
    });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).send("An error occurred while logging in.");
  }
};

// Controller to update user information


controller.updateUser = async (req, res) => {
  try {
    const { password, firstName, lastName, mobile, dateNais, email, username } = req.body;
    
    // Check if password is provided and hash it
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Construct the updated user data object
    const updatedUserData = {};
    if (hashedPassword) updatedUserData.password = hashedPassword;
    if (firstName) updatedUserData.firstName = firstName;
    if (lastName) updatedUserData.lastName = lastName;
    if (mobile) updatedUserData.mobile = mobile;
    if (dateNais) updatedUserData.dateNais = dateNais;
    if (email) updatedUserData.email = email;
    if (username) updatedUserData.username = username;

    // Update the user document in the database
    const updatedUser = await User.findByIdAndUpdate(
      req.decodedToken.userId,
      updatedUserData,
      { new: true }
    );

    // Check if user document was found and updated
    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    // Send response with updated user data
    res.send({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).send("An error occurred while updating user.");
  }
};



// Controller to retrieve all users
controller.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    allUsers.splice(0, 1);
        res.json(allUsers);
  } catch (error) {
    console.error('Error getting all users:', error);
    res.status(500).send("An error occurred while retrieving users.");
  }
};

// Controller to delete a user
controller.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).send("An error occurred while deleting user.");
  }
};

module.exports = controller;
