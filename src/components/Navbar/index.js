import React from 'react'
import {NavLink} from 'react-router-dom'
import Firebase from '../Firebase/firebase'

const Navbar = ({isLoggedIn, currentUser, doSetCurrentUser}) => {
    const logoutUser = async () => {
        try{
            await Firebase.doSignOut();
            doSetCurrentUser(null);
        }catch (error){
            console.log(error)
        }
    }
    return (
    <div>
        <NavLink exact to='/'>
            Home
        </NavLink>
        <NavLink exact to='/movies/search'>Search for a Movie</NavLink>
    {isLoggedIn ? (
    <>
    <span>Hello {currentUser.username}</span>
    <span style={{cursor:'pointer'}} onClick={logoutUser}>Logout</span>
    </>
) : (
    <> 
        <NavLink exact to='/login'>Login</NavLink>
        <NavLink exact to='/signup'>SignUp</NavLink>
        
    </>
)}
    </div>
    )};

export default Navbar;