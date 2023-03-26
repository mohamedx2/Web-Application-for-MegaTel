import axios from "axios";
import { useState, useEffect } from "react";
import { Container, ListGroup } from 'react-bootstrap';

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const result = await axios.get(`${process.env.BASE_URL}/articles`);
        setUsers(result.data)

      }catch(error){
        console.error(error.message)
      }
    };
    fetchData();
  }, []);

  return (
    
    <main className="my-5">
      <Container>
        <h1 className="text-center mb-5">ALL articles</h1>
        <ListGroup>
          {users && users.map((user) => (
            <ListGroup.Item key={user._id}>
              <h1 className="mb-3">{user.title}</h1>
              <p>{user.body}</p>
              <img src={user.image}alt="" />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </main>
  );
};

export default Home;
