import "./TopNav.css";
import { Link } from 'react-router-dom';

const GuestNav = () => {

    return (
        <div id="TopNav">
            {/* <Link to={"/"}>To-Do List</Link> */}
            <h1>To-Do List</h1>
        {/* 11/11 - https://www.pluralsight.com/guides/understanding-links-in-reactjs */}
        <ul>
            <Link to={"/"}>Home</Link>
            {/* <Link to={"/AuthenticatedUserProfile"}>Profile</Link> */}

            {/* Add Sign Up link when user is a guest */}
            <Link to={"/Login"}>Login</Link> 
            <Link to={"/Signup"}>Signup</Link> 
        </ul>
        </div>
    );
}
 
export default GuestNav;
