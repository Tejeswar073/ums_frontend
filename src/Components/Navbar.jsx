import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";

import profile_pic from "../assets/profile.png";
import logo from "../assets/police.png";
import '../css/Navbar.css'
import 'bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import BadgeIcon from '@mui/icons-material/Badge';
const Navbar = () => {
  const navigate = useNavigate(); // Hook for navigation

  const [userDetails, setUserDetails] = useState([]);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function Logout(){
    localStorage.setItem("userAuth", false);
    navigate('/marvel')
  }

  useEffect(() => {
    // Retrieve the data from localStorage when the component mounts
    setUserDetails(JSON.parse(localStorage.getItem('userData')));
  }, [])
  return (
    <>
       <div className="navbar2">
        <div className="d-flex">
            <Image src={logo} width={200}/>
          <p className="nav_p">Home</p>
        </div>
          {/* <div className="profile_section">
            <img src={profile_pic} height={40} />
            <div className="d-grid justify-content-end">
            <p id="nav_p2">
               {userDetails.officername}
            </p>
            <p id="nav_p3">{userDetails.unit}</p>
            </div>
          </div> */}
        <div className="profile_section">

        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          <AccountCircleIcon/> Profile
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a className="dropdown-item" href="#">{userDetails.officername}</a></li>
            <li><a className="dropdown-item" href="#">{userDetails.unit}</a></li>
            <li><a className="dropdown-item" href="#" onClick={Logout}><ExitToAppIcon/> Logout</a></li>

          </ul>
        </div>
        </div>
        </div>
        <hr id="hr" />
  </>
  )
}

export default Navbar