import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import GuestNav from './GuestNav';

const Signup = () => {
  const [fname, setFirstName] = useState('');
  const [lname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleCreateAccount = () => {
    console.log(`Email: ${email}, Password: ${password}`);
  };

  const sendInfo = async (event) => {
    event.preventDefault();
    try {
      
      if(fname === null){
        document.getElementById('errorMessage').innerText = 'Enter';
        return;
      }
      console.log("trying to send!");

      handleCreateAccount();
  
      const action = {
        action: "signup",
        user_data: 
          {
            fname: fname,
            lname: lname,
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
        // SUCCESSFUL ACCOUNT CREATION
        history.push('/TaskPage');
      }
      else if(response.status === 400){
        // EMAIL IN USE
        document.getElementById('errorMessage').innerText = 'User with email already exists';
      }
    } catch (error) {
      console.error('Error sending user info:', error);
    }
  };

  // CSS STYLES

  const headerStyle = {
    background: '#A795FF', 
    padding: '20px', 
    textAlign: 'left', 
    color: 'white !important', 
    };

  const bodyStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
   // height: '100vh',
    margin: '0',
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
    height:'56px',
    marginTop:'14px',
    alignItems: 'center',
    marginLeft:'48px',
    borderRadius: '4px',
  };

  return (
    <div>
      <GuestNav></GuestNav>;
      <div style={headerStyle}>
      </div>
      <div style={bodyStyle}>
        <div style={formStyle}>
          <div style={{ ...labelStyle, textAlign: 'center', fontSize: '40px', fontWeight:'bold', marginTop:'24px' }}>
            Create an account
          </div>
          <div id="errorMessage" style={{marginLeft: '48px', color: 'red'}}></div>
          <form onSubmit={sendInfo}>
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft:'48px', marginRight:'48px',marginTop:'0px',}}>
              <label style={labelStyle}>
                FIRST NAME*
              </label>
              <input
                type="text"
                value={fname}
                onChange={(e) => setFirstName(e.target.value)}
                style={inputStyle}
                required
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft:'48px', marginRight:'48px',marginTop:'24px',}}>
              <label style={labelStyle}>
                LAST NAME*
              </label>
              <input
                type="text"
                value={lname}
                onChange={(e) => setLastName(e.target.value)}
                style={inputStyle}
                required
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft:'48px', marginRight:'48px',marginTop:'24px',}}>
              <label style={labelStyle}>
                EMAIL*
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                required
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
                required
              />
            </div>
            <label style={{ display: 'flex', alignItems: 'center',  marginLeft:'48px', marginRight:'48px', marginTop:'24px', fontSize:'12px',}}>
              <input type="checkbox" required style={{ marginRight: '10px', width: 'auto' }} />
              I agree with Privacy Policy and Terms of Conditions
            </label>
            <button type="submit" style={buttonStyle}>
              Create account
            </button>
            <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px' }}>
              Already have an account? <span style={{ color: '#4C3A51', cursor: 'pointer' }}><Link to='/Login'>Sign in here</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
