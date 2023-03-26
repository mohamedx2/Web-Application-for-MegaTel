const User = require('../models/user.model');
const Article = require('../models/article.model');
let controller={}
controller.signUp = async (req, res) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });

    // If user already signed up, don't allow them to make another account
    if (existingUser) {
      return res.send({message:"already signed up",success:false});
    }

    // If not, create a new user and save
    const newUser = new User(req.body);

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Return success response with the saved user
    return res.send({
      success: true,
      message: "Created new user",
      data: savedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred while signing up.");
  }
};
controller.update=(req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUser) => {
    if (err) {
      res.send({err,success:false});
    }else{
      res.json({updatedUser,message:"user updated succesfulay",success:true});
    }
  });
}
controller.login = async (req, res) => {
  try {
      // Access the credentials passed up in the request body
      const { email, password } = req.body; 
      
      // Attempt to find the user based on the provided email
      const theUser = await User.findOne({email});
      
      // Check if the password matches the one stored in the database
      if(password == theUser.password) {
          // If the passwords match then we send the user 
          res.status(200).send(theUser);
      }
      else {
          // Otherwise, we respond with an invalid login message
          res.status(400).send('Invalid Login!');
      }
  } catch (error) {
        // In case of an error, we can simply send an error message
        res.status(400).send('user not in db');
  }
}
controller.updateArticle = async (req, res) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ updatedArticle, message: 'updated with successfuly' });
  } catch (error) {
    res.send(error);
  }
};
controller.createArticle=async(req,res)=>{
      const newArticle = new Article(req.body);
      // Save the new user to the database
      newArticle.save()
             .then( article => {
               // Return success response with the saved user
               return res.send({
                 success: true,
                 message: "Created new article",
                 data: article
               });
             });
}
controller.showArticles = async (req, res) => {
  try {
    const allArticle = await Article.find();
    res.json(allArticle);
  } catch (error) {
    res.status(500).send(error);
  }
};

controller.myArticles = async (req, res) => {
  try {
    const allArticle = await Article.find({ poster: req.params.id });
    res.json(allArticle);
  } catch (error) {
    res.status(500).send(error);
  }
};

controller.delateArticle = async (req, res) => {    
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Article deleted successfully!' });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports=controller