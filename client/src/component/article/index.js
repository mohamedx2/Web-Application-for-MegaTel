import React from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';




function ArticleForm({title, setTitle, body, setBody, img, setImg, update ,setUpdate,getUserArticles}) {
  const BASE_URL="uyuvvgjh"
  const token = localStorage.getItem('token'); // Get token from localStorage
  const insert_update = async () => {
    if (!update) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` }, // Include token in headers
        };
        const { data } = await axios.post(`${BASE_URL}/articles/new`, {title, body, img }, config) // Add config to POST request
        alert(data.message)
      } catch (error) {
        console.log(error)
      }
    } 
    else {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` }, // Include token in headers
        };
        const { data } = await axios.put(`${BASE_URL}/articles/${update}`, { title, body, img }, config) // Add config to PUT request
        alert(data.message)
      } catch (error) {
        console.log(error)
      }
    }
    setUpdate('')
    setTitle('');
    setBody('');
    setImg('');
    getUserArticles()
  };

  return (
    <Form onSubmit={(event) => {
      event.preventDefault();
      insert_update();
    }}>
      <Form.Group controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" value={title || ''} onChange={(e) => setTitle(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBody">
        <Form.Label>Body</Form.Label>
        <Form.Control as="textarea" rows={3} value={body || ''} onChange={(e) => setBody(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formImage">
        <Form.Label>Image</Form.Label>
        <Form.Control type="text" value={img || ''} onChange={(e) => setImg(e.target.value)} />
      </Form.Group>

      {update !== '' ?
        <Button variant="primary" type="submit">Update</Button> :
        <Button variant="primary" type="submit">Insert</Button>
      }
    </Form>
  );
}

export default ArticleForm;