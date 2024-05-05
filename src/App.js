import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer, Header } from "./sections/index";
import { Home, Sign, SignUp, MyAccount, AdminDashboard, AboutUs,Contact } from "./pages";
import i18n from './i18n'; // Import i18n configuration

function App() {
  const [LoggedIn, setLoggedIn] = useState(localStorage.getItem('token'));
  const [languageDirection, setLanguageDirection] = useState(i18n.dir());

  // Subscribe to language changes and update language direction state
  useEffect(() => {
    const handleChangeLanguage = () => {
      setLanguageDirection(i18n.dir());
    };

    i18n.on('languageChanged', handleChangeLanguage);

    return () => {
      i18n.off('languageChanged', handleChangeLanguage);
    };
  }, []);

  return (
    <div dir={languageDirection}>
      <Router>
        <Header LoggedIn={LoggedIn} setLoggedIn={setLoggedIn} /> 
        <Routes>
          <Route path="/Admin" element={<AdminDashboard/>} />
          <Route path="/user" element={<MyAccount/>}/>
          <Route path="/sign" element={<Sign LoggedIn={LoggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/About" element={<AboutUs />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
