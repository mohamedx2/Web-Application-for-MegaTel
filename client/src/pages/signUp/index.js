import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from 'axios';
function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();
    const { data: { message, data, success } } = await axios.post(`http://localhost:3001/SignUp`, { name, email, password, mobile });
    alert(message);
    if(success){
        localStorage.setItem('user', JSON.stringify(data));
        window.location.href = `/user/${data._id}`;
    }
  };

  return (
    <Container>
      
    <Form onSubmit={handleSignUp}>
      <Form.Group controlId="formName">
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text" value={name} onChange={(event) => setName(event.target.value)} required />
      </Form.Group>

      <Form.Group controlId="formMobile">
        <Form.Label>Mobile:</Form.Label>
        <Form.Control type="text" value={mobile} onChange={(event) => setMobile(event.target.value)} required />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
      </Form.Group>

      <Button variant="primary" type="submit">Sign Up</Button>
    </Form>
    </Container>
  );
}

export default SignUp;