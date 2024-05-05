import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './style.css'; // Import your CSS file
const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        dateNais: '',
        mobile: '',
        language: '',
        languageLevel: '',
        accessKey: '',
        cin: '',
        country: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          formData.join=formData.accessKey
            const response = await axios.post('https://call-1.onrender.com/signUp', formData);
            console.log(response.data); // Handle success response
            alert(response.data.message+"\n"+response.data.user.username)
        } catch (error) {
            console.error('Error signing up:', error); // Handle error
        }
    };

    return (
        <section className="signup-section">
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={8} lg={6}>
                        <div className="signup-box">
                            <h2 className="text-center mb-4">Sign Up</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Control type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required style={{ marginBottom: '20px' }} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required style={{ marginBottom: '20px' }} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="text" name="firstName" placeholder="Enter your first name" value={formData.firstName} onChange={handleChange} required style={{ marginBottom: '20px' }} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="text" name="lastName" placeholder="Enter your last name" value={formData.lastName} onChange={handleChange} required style={{ marginBottom: '20px' }} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="date" name="dateNais" value={formData.dateNais} onChange={handleChange} required style={{ marginBottom: '20px' }} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="tel" name="mobile" placeholder="Enter your mobile number" value={formData.mobile} onChange={handleChange} required style={{ marginBottom: '20px' }} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control as="select" name="language" value={formData.language} onChange={handleChange} required style={{ marginBottom: '20px' }}>
                                        <option value="">Select language</option>
                                        <option value="English">English</option>
                                        <option value="French">French</option>
                                        <option value="Arabic">Arabic</option>
                                        <option value="German">German</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control as="select" name="languageLevel" value={formData.languageLevel} onChange={handleChange} required style={{ marginBottom: '20px' }}>
                                        <option value="">Select language level</option>
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="advanced">Advanced</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="password" name="accessKey" placeholder="Enter access key" value={formData.accessKey} onChange={handleChange} className="special-input" required style={{ marginBottom: '20px' }} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="text" name="cin" placeholder="Enter your CIN" value={formData.cin} onChange={handleChange} required style={{ marginBottom: '20px' }} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control type="text" name="country" placeholder="Enter your country" value={formData.country} onChange={handleChange} required style={{ marginBottom: '20px' }} />
                                </Form.Group>
                                <Button type="submit" className="btn btn-primary btn-block">Sign Up</Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default SignUp;
