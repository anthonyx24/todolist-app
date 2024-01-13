import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import GuestNav from './GuestNav';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const handleCreateAccount = () => {
    console.log(`Email: ${email}, Password: ${password}`);
  };

  const sendInfo = async (event) => {
    event.preventDefault();
    try {
      
      console.log("trying to send!");

      handleCreateAccount();
  
      const action = {
        action: "login",
        user_data: 
          {
            email: email,
            password: password
          }
      };
  
      const response = await fetch('http://localhost:8080/todo-list-201/account', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action),
      });

      console.log(response.status);
      if(response.status === 200){
        // CORRECT LOGIN COMBO
        const userDataJson = await response.text();
        console.log(userDataJson);
        const userData = JSON.parse(userDataJson);
        history.push({
          pathname: '/TaskPage',
          state: { userData: userData }
        });
      }
      else if(response.status === 400){
        // NO EMAIL
        document.getElementById('errorMessage').innerText = 'No account associated with that email.';
      }
      else if(response.status === 403){
        // WRONG PASSWORD
        document.getElementById('errorMessage').innerText = 'Incorrect password.';
      }
    } catch (error) {
       console.error('Error sending user info:', error);
    }
  };
  // CSS STYLES

  // const headerStyle = {
  //   background: '#A795FF', 
  //   padding: '20px', 
  //   textAlign: 'left', 
  //   color: 'white !important', 
  //   };

  const bodyStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // height: '100vh',
    margin: '100px 0px',
    padding: '0',
    background: '#A795FF',
  };

  const formStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '480px', 
    //height: '540px',
    

  };

  const inputStyle = {
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '10px',
    fontSize: '16px',
  };

  const labelStyle = {
    fontSize: '14px',
    color: '#333',
    marginBottom: '5px',
  };

  const buttonStyle = {
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    background:'#2B1887',
    width:'384px',
    borderRadius: '4px',
    height:'56px',
    marginTop:'14px',
    alignItems: 'center',
    marginLeft:'48px',
  };

  return (
    <div>
      <GuestNav></GuestNav>

      <div style={bodyStyle}>
        <div style={formStyle}>
          <div style={{ ...labelStyle, textAlign: 'center', fontSize: '40px', fontWeight:'bold', marginTop:'24px' }}>
            Welcome Back!
          </div>
          <div id="errorMessage" style={{marginLeft: '48px', color: 'red'}}></div>
          <form onSubmit={sendInfo}>
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft:'48px', marginRight:'48px'}}>
              <label style={labelStyle}>
                EMAIL*
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' , marginLeft:'48px', marginRight:'48px', marginTop:'24px',}}>
              <label style={labelStyle}>
                PASSWORD*
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
              />
            </div>
            <label style={{ display: 'flex', alignItems: 'center',  marginLeft:'48px', marginRight:'48px', marginTop:'24px', fontSize:'12px',}}>
             Forgot your password?
            </label>
            <button type="submit" style={buttonStyle}>
              Log In
            </button>
            <button type="button" onClick={handleCreateAccount} style={buttonStyle}>
              Continue as Guest
            </button>
            <div style={{ textAlign: 'center', marginTop: '10px', marginBottom:'25px',fontSize: '14px' }}>
            Don't have an account yet?  <span style={{ color: '#4C3A51', cursor: 'pointer' }}><Link to='/Signup'>Sign up now</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
