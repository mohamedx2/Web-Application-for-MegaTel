import React from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

function ArticleForm({ poster, title, setTitle, body, setBody, img, setImg, update }) {
  const insert_update = async () => {
    if (!update) {
      try {
        const { data } = await axios.post(`${process.env.BASE_URL}/articles/new`, { poster, title, body, img })
        alert(data.message)
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const { data } = await axios.put(`${process.env.BASE_URL}/articles/${update}`, { title, body, img })
        alert(data.message)
      } catch (error) {
        console.log(error)
      }
    }
    setTitle('');
    setBody('');
    setImg('');
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