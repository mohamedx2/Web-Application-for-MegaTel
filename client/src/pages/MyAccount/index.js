import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

const MyAccount = () => {
  const user = JSON.parse(localStorage.getItem("user")) || false;
  const [change, setChange] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [name, setName] = useState(user.name)
  const [mobile, setMobile] = useState(user.mobile)
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState(user.email)
  const navigate = useNavigate
  useEffect(() => {
    if (!user) {
      return navigate("/Sign")
    }
  }, [user, navigate])

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(`${process.env.BASE_URL}/login`, { password, email });
      const { _id } = user;
      const updatedUserData = { _id, password: newPassword || password, email, name, mobile };
      const { data: updatedUser } = await axios.put(`${process.env.BASE_URL}/users/${_id}`, updatedUserData);
      if (updatedUser.success) {
        alert(updatedUser.message);
      } else {
        alert("problem");
      }
    } catch (error) {
      alert("current password");
    }
  }

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
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>mobile:</strong> {user.mobile}</p>
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