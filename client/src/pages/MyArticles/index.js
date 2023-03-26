import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ArticleForm from '../../component/article';
import './MyArticles.css';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
function MyArticles() {
  const navigate=useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))||false;
  const [res, setRes] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [img, setImg] = useState('');
  const [update, setUpdate] = useState('');
  
  useEffect(() => {
    if (!user) {
      return navigate("/Sign")
    }
    async function getUserArticles(id) {
      try {
        const { data } = await axios.post(`${process.env.BASE_URL}/users/${id}/myArticles`);
        setRes(data);
      } catch (error) {
        console.log(error);
      }
    }
    
    getUserArticles(user._id);
    

  }, [user, res,navigate]); // Add res to the dependencies array

  const updateArticle = async ({ _id, title, image, body }) => {
    // add update functionality
    setBody(body)
    setImg(image)
    setTitle(title)
    setUpdate(_id) // Move setUpdate here
  };

  const deleteArticle = async (id) => {
    try {
      const { data } = await axios.delete(`${process.env.BASE_URL}/articles/${id}`);
      alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <h1>{user.name}</h1>
          <ArticleForm poster={user._id} title={title} setTitle={setTitle} img={img}setImg={setImg} body={body} setBody={setBody} update={update} />
          {res.length > 0 ?
            res.map(({ _id, title, image, body, date_added }) => (
              <div key={_id} data={_id}>
                <h2>{title}</h2>
                <Image src={image} alt="not found" fluid />
                <p>{body}</p>
                <p>{date_added}</p>
                <Button variant="primary" onClick={() => updateArticle({ _id, title, image, body })}>update</Button>{' '}
                <Button variant="danger" onClick={() => deleteArticle(_id)}>delete</Button>
              </div>
            )) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default MyArticles;