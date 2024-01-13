import "./TopNav.css";
import { Link } from 'react-router-dom';

const TopNav = ({userData}) => {

    return (
        <div id="TopNav">
            {/* <Link to={"/"}>To-Do List</Link> */}
            <h1>To-Do List</h1>
        {/* 11/11 - https://www.pluralsight.com/guides/understanding-links-in-reactjs */}
        <ul>
            <Link to={"/TaskPage"}>Home</Link>
            <Link to={{
                pathname: "/AuthenticatedUserProfile",
                state: {userData: userData}
                }}>Profile</Link>
            <Link to={"/"}>Logout</Link>
            {/* Add Sign Up link when user is a guest */}
            {/* <Link to={"/Signup"}>Signup</Link>  */}
        </ul>
        </div>
    );
}
 
export default TopNav;
