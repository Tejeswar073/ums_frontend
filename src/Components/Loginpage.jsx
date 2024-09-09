import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/Loginpage.css";
import login_logo from '../assets/login_logo.png';
import { basepath } from '../config';

const Loginpage = () => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation
  async function handleLogin(){
   const response = await fetch(basepath()+ '/login',{
    method : 'POST',
    headers : {
      'Content-Type' : 'application/json',
    },
    body : JSON.stringify({
      email : email,
      password: password
    }),
   })
   if(response.ok){
    const data = await response.json();
    console.log(data);
    // Save data to localStorage
    localStorage.setItem("userAuth", true);
    localStorage.setItem('userData', JSON.stringify(data));
    console.log(JSON.parse(localStorage.getItem('userData')),'//////////////////////////////////////////////////')
    if (
      ["ACP", "PI", "ADG", "IG", "Special IG", "SP"].includes(data.designation)) {
        navigate('/marvel/home', { state: { data } }); // Redirect to home
    }
    if (data.designation === 'Administrator'){
      navigate('/marvel/superadmin', { state: { data } }); // Redirect to SuperAdmin Page
    }
   }
  };

  function handleEnter(event) {
    if (event.key === 'Enter') {
      handleLogin();
    }
  }

  return (
    <>
      <div className='container-fluid'>
        <div className='login_right'>
          <div className='login_box' onKeyDown={(e)=>handleEnter(e)}>
            <h3 className='login_h3'>Login</h3>
            <input
              className='login_inputs'
              placeholder='Enter User Email'
              type='text'
              value={email}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className='login_inputs'
              placeholder='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='login_remember'>
              <label htmlFor='checkbox' className='check_box_remember'>
                <input type='checkbox' /> Remember me
              </label>
              <p>Forget Password?</p>
            </div>
            <button className='login_btn' onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Loginpage;
