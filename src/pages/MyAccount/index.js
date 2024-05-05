import axios from 'axios';
import { useEffect, useState } from 'react';
import {Container,Row,Col,Form,Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const MyAccount=()=>{
  const BASE_URL="gfxcfcfc/"
const [user, setUser] = useState("");
const token=localStorage.getItem("token")
const [change, setChange] = useState(false);
const [newPassword, setNewPassword] = useState("");
const [name, setName] = useState('');
const [mobile, setMobile] = useState("");
const [password, setPassword] = useState("");
const [email, setEmail] = useState("");
const handleFormSubmit = async (event) => {
  event.preventDefault();
  try {
    const { email: userEmail, name: userName, mobile: userMobile } = user;
    if (userEmail === email && userName === name && userMobile === mobile) {
      return alert("No changes detected");
    }
    const { data: { success: loginSuccess } } = await axios.post(`${BASE_URL}/login`,{ email: user.email, password });
    if (!loginSuccess) {
      alert("Incorrect password");
      return ;
    }
    const updatedUserData = { password: newPassword || password, email, name, mobile };
    const config = {
      headers: {
        authorization: `real ${token}`,
      },
    };
    const { data: { success, message } } = await axios.put(`${BASE_URL}/users`, updatedUserData, config);
    if (success) {
      alert(message);
      fetchdata();
    } else {
      alert(message);
    }
  } catch (error) {
    alert(error);
  }
  setChange(false);
};

const navigate=useNavigate()

async function fetchdata(){
  try {
    const {data:{name,email,mobile}}= await axios.post(`${BASE_URL}/user`,{},{headers:{authorization: `real ${token}`}});
    setUser({name,email,mobile})
    setName(name)
    setEmail(email)
    setMobile(mobile)
  } catch (error) {
    navigate('/Sign')
  }
}
useEffect(()=>{
  if (!token) {
    navigate("/Sign")
  }
  else{
    fetchdata()
  }
},[token, navigate,fetchdata()])
  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <h2>User Information</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          {!change ? (
            <>
              <p><strong>Name:</strong> {user?.name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>mobile:</strong> {user?.mobile}</p>
              <Button onClick={() => setChange(true)}>Change</Button>
            </>
          ) : (
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name:</Form.Label>
                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formMobile">
                <Form.Label>Mobile:</Form.Label>
                <Form.Control type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Current Password:</Form.Label>
                <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formNewPassword">
                <Form.Label>New Password:</Form.Label>
                <Form.Control type="password" onChange={(e) => setNewPassword(e.target.value)} />
              </Form.Group>

              <Button type="submit">Save Changes</Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default MyAccount;