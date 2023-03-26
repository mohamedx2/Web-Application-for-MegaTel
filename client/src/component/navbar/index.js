import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import  {useDispatch} from "react-redux";
import {logout} from '../../user';
function MainNav() {
  const state=useSelector((state)=>state.user?.value)
  const dispatch=useDispatch()

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark">
      <Navbar.Brand as={Link} to="/">
        all articles
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link}  disabled={(state._id==='')} to="/myAccount">
            MY Account
          </Nav.Link>
        </Nav>
        <Nav className="me-auto">
          <Nav.Link as={Link}  disabled={(state._id==='')} to={`/MyArticles`}>
            MY Articles
          </Nav.Link>
        </Nav>
        <Nav className="ml-auto bg-secondary text-light">
          {state.password===""&& !JSON.parse(localStorage.getItem("user"))?(<Nav.Link as={Link} to="/Sign">
            Log in
          </Nav.Link>):(<Nav.Link as={Link} onClick={()=>{
            localStorage.removeItem('user')
            dispatch(logout())
          }
          } to="/Sign">
            Log out
          </Nav.Link>)}
          <Nav.Link as={Link} eventKey={0} to="/SignUp">
            Sign up
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default MainNav;