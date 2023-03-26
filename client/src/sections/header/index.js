import {MainNav} from '../../component';
import React from 'react';
import {  Row, Col } from 'react-bootstrap';

function Header({LoggedIn}) {
  return (
    <header className="sticky-top">
      
        <Row>
          <Col>
            <MainNav LoggedIn={LoggedIn}/>
          </Col>
        </Row>
    </header>
  );
}

export default Header;