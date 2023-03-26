import axios from 'axios';
import { useState } from 'react';
import  {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../../user";
import { useEffect } from 'react';
const Sign = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const user = JSON.parse(localStorage.getItem("user")) || false;
  
  useEffect(()=>
    {
      if(user!==false)navigate("/MyArticles");
    },[])
  const handleSubmit = async () => {
    

    try {
      const {data} = await axios.post(`${process.env.BASE_URL}/login`, {
        email,
        password,
      });

      localStorage.setItem('user', JSON.stringify(data));
       // toggles the value of LoggedIn
      dispatch(login(data))
      navigate(`/MyArticles`);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container">
      <form onSubmit={(e)=>{
        e.preventDefault();
        handleSubmit()
        }}>
        {/* Email input */}
        <div className="form-outline mb-4">
          <input
            type="email"
            id="form2Example1"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="form-label" htmlFor="form2Example1">
            Email address
          </label>
        </div>

        {/* Password input */}
        <div className="form-outline mb-4">
          <input
            type="password"
            id="form2Example2"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="form-label" htmlFor="form2Example2">
            Password
          </label>
        </div>

        {/* 2 column grid layout for inline styling */}
        <div className="row mb-4">
          <div className="col d-flex justify-content-center">
            {/* Checkbox */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="form2Example31"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="form2Example31">
                {' '}
                Remember me{' '}
              </label>
            </div>
          </div>

          <div className="col">
            {/* Simple link */}
            <a href="#!">Forgot password?</a>
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="btn btn-primary btn-block mb-4"
          
        >
          Sign in
        </button>

        {/* Register buttons */}
        <div className="text-center">
          <p>
            Not a member? <a href="#!">Register</a>
          </p>
          <p>or sign up with:</p>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-facebook-f"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-google"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-twitter"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-github"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Sign;