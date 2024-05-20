import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap'; // Import React Bootstrap components
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import { useNavigate } from 'react-router-dom';

import './style.css';

function AdminDashboard() {
  const { t } = useTranslation(); // Initialize useTranslation hook

  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [email, setEmail] = useState(''); // State for email input
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  };


  const fetchData = async () => {
    try {
      const response = await axios.post('https://call-1.onrender.com/admin', null, config);
      setUserData(response.data);
    } catch (error) {
      setError(error);
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/sign");
    } else {
      fetchData();
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://call-1.onrender.com/join', { receiver: email }, config);
      alert(t('messages.emailSent')); // Translate success message
      setEmail('');
    } catch (error) {
      console.error('Error sending email:', error);
      alert(t('messages.emailFailed')); // Translate error message
    }
  };

  const handleDelete = async (userId) => {
    try {
      if (!userId) {
        console.error('User ID is undefined');
        return;
      }

      await axios.delete(`https://call-1.onrender.com/users/${userId}`, config);
      alert(t('messages.deleteSuccess')); // Translate success message
      await fetchData();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <div className="background-image">
        <div className="admin-title">{t('dashboard.adminDashboard')}</div>
      </div>
      <div className="dashboard-container">
        <Form onSubmit={handleSubmit} className="my-form">
          <Form.Group controlId="formEmail">
            <Form.Label>{t('dashboard.emailLabel')}</Form.Label>
            <Form.Control
              type="email"
              placeholder={t('dashboard.emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="my-input"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="my-button">
            {t('dashboard.sendButton')}
          </Button>
        </Form>
        <div className="table-responsive"> {/* Add this div for responsive table */}
          <Table hover className="custom-table">
            <thead>
              <tr>
                <th>{t('dashboard.cin')}</th>
                <th>{t('dashboard.email')}</th>
                <th>{t('dashboard.username')}</th>
                <th>{t('dashboard.phoneNumber')}</th>
                <th>{t('dashboard.action')}</th>
              </tr>
            </thead>
            <tbody>
              {userData.map(user => (
                <tr key={user._id}>
                  <td>{user.cin}</td>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td>{user.mobile}</td>
                  <td className="action-cell">
                    <Button className="delete-button" onClick={() => handleDelete(user._id)}>
                      {t('dashboard.deleteButton')}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
