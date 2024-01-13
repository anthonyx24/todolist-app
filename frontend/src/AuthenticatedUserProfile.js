import './AuthenticatedUserProfile.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import TopNav from './TopNav';


const AuthenticatedUserProfile = () => {
    const [userName, setUserName] = useState(null); 
    const [firstName, setFirstName] = useState(null); 
    const [lastName, setLastName] = useState(null); 
    const [email, setEmail] = useState(null); 
    // const [firstName, setFirstName] = useState(null); 
    const [userData, setUserData] = useState(null); // Initialize userData state

    const location = useLocation();

    useEffect(() => {
        // Extract userData from the location state
        const userDataFromState = location.state && location.state.userData;

        if (userDataFromState) {
            try {
                console.log(JSON.stringify(userDataFromState));
                setFirstName(userDataFromState.fname);
                console.log(firstName);
                setLastName(userDataFromState.lname);
                setEmail(userDataFromState.email);
                setUserName(userDataFromState.fname + " " + userDataFromState.lname);
                setUserData(userDataFromState); // Set userData state
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        }
    }, [location.state]);

    return ( 
    <div id='UserContainer'>
       <TopNav></TopNav>
        
        <div className='ProfileBox'>
            <h2>Hello, {firstName}</h2>
            <p style={{fontWeight:'bold'}}>Profile Information</p>
            <div>
                <p>First Name: {firstName} </p>
                <p>Last Name: {lastName}</p>
                <p>Email: {email}</p>
            </div>
        </div>
    </div> 
    );
}
 
export default AuthenticatedUserProfile;
