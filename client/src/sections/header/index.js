import {MainNav} from '../../component';
import React from 'react';

function Header({LoggedIn,setLoggedIn}) {
  return (
    
      <MainNav LoggedIn={LoggedIn} setLoggedIn={setLoggedIn}/>
  );
}

export default Header;