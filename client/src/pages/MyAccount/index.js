import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Calendar from "./calendar";
import './style.css';

const MyAccount = () => {
  const { t } = useTranslation();
  const BASE_URL = "https://call-1.onrender.com";
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState("");
  const token = localStorage.getItem("token");
  const [change, setChange] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { email: userEmail, name: userName, mobile: userMobile, lastName: userLastName } = user;
      if (userEmail === email && userName === firstName && userLastName === lastName && userMobile === mobile && !image && !newPassword) {
        return alert(t('myAccount.noChangesDetected'));
      }
      const updatedUserData = new FormData();
      updatedUserData.append('email', email);
      updatedUserData.append('firstName', firstName);
      updatedUserData.append('lastName', lastName);
      updatedUserData.append('mobile', mobile);
      if (newPassword) {
        updatedUserData.append('password', newPassword);
      }
      if (image) {
        updatedUserData.append('image', image);
      }

      const config = {
        headers: {
          authorization: `real ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      };

      const { data: { success, message } } = await axios.put(`${BASE_URL}/users/${userId}`, updatedUserData, config);
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

  const fetchdata = useCallback(async () => {
    try {
      const { data } = await axios.post(`${BASE_URL}/user`, {}, { headers: { authorization: `real ${token}` } });
      setUser(data);
      setUserId(data._id);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setMobile(data.mobile);
      setImage(null);
    } catch (error) {
      navigate('/sign');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (!token) {
      navigate("/sign");
    } else {
      fetchdata();
    }
  }, [token, navigate, change, fetchdata]);

  const openInNewWindow = (url) => {
    window.open(url, '_blank', 'width=800,height=600');
  };

  return (
    <div className='MyAccount'>
      <div className="about-us-hero" style={{ marginTop: '-200px' }}>
        <div><h2>{t('myAccount.myAccount')}</h2></div>
      </div>
      <Container>
        <Row className="mb-4">
          <Col md={{ span: 6, offset: 3 }}>
            <h2 className="text-center">{t('myAccount.userInformation')}</h2>

            {user && (
              <div className="card">
                <div className="card-body">
                  {user.image && <Image src={user.image} alt="User" className="mb-3" fluid />}

                  <h5 className="card-title">{t('myAccount.userInformation')}</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>{t('myAccount.firstName')}:</strong> {user.firstName}</li>
                    <li className="list-group-item"><strong>{t('myAccount.lastName')}:</strong> {user.lastName}</li>
                    <li className="list-group-item"><strong>{t('myAccount.email')}:</strong> {user.email}</li>
                    <li className="list-group-item"><strong>{t('myAccount.mobile')}:</strong> {user.mobile}</li>
                    <li className="list-group-item"><strong>{t('myAccount.userName')}:</strong> {user.username}</li>
                    <li className="list-group-item"><strong>{t('myAccount.dateOfBirth')}:</strong> {user.dateNais}</li>
                  </ul>
                </div>
              </div>
            )}

            <Button variant="primary" onClick={() => setChange(!change)} block>{t('myAccount.change')}</Button>

            {change && (
              <Form onSubmit={handleFormSubmit} className="mt-4">
                <Form.Group controlId="formFirstName">
                  <Form.Label>{t('myAccount.firstName')}:</Form.Label>
                  <Form.Control type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formLastName">
                  <Form.Label>{t('myAccount.lastName')}:</Form.Label>
                  <Form.Control type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Label>{t('myAccount.email')}:</Form.Label>
                  <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formMobile">
                  <Form.Label>{t('myAccount.mobile')}:</Form.Label>
                  <Form.Control type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>{t('myAccount.currentPassword')}:</Form.Label>
                  <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formNewPassword">
                  <Form.Label>{t('myAccount.newPassword')}:</Form.Label>
                  <Form.Control type="password" onChange={(e) => setNewPassword(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formImage">
                  <Form.Label>{t('myAccount.profileImage')}:</Form.Label>
                  <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
                </Form.Group>

                <Button type="submit" variant="primary" block>{t('myAccount.saveChanges')}</Button>
              </Form>
            )}

            <div className="text-center mt-3">
              <Button
                variant="success"
                onClick={() => openInNewWindow(`https://video-call-26jf.onrender.com/${userId}`)}
              >
                {t('myAccount.joinCall')}
              </Button>
            </div>

          </Col>
        </Row>
      </Container>
      <Row>
        <Col>
          <Calendar />
        </Col>
      </Row>
    </div>
  );
}

export default MyAccount;
