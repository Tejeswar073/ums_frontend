import React, { useState, useEffect } from "react";
import profile_pic from "../assets/profile.png";
import filter_icon from "../assets/filter_icon.png";
import plus_icon from "../assets/plus.png";
import { Button, Image, Modal } from "react-bootstrap";
import ticket_count_icon from "../assets/ticket_count_icon.png";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchIcon from "@mui/icons-material/Search";
import { basepath } from "../config";
import { useLocation } from 'react-router-dom';

import { useNavigate } from "react-router-dom";
import Tabs from "./Tabs";
import profile_png from '../../src/assets/profile_default.jpeg'
import '../css/Homepage.css'
import Navbar from "./Navbar";
import EnquiryModal from './EnquiryModal'
const Homepage = () => {
  const [data, setData] = useState([]);
  const [profile_data, setProfileData] = useState({ profiles: [] });
  const [isTabOpen, setIsPopupOpen] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(() => {
    // Use initial state function to avoid unnecessary parsing on each render
    const storedUserData = localStorage.getItem('userData');
    return storedUserData ? JSON.parse(storedUserData) : {}; // Default to an empty object if no data is found
  });
    const location = useLocation();


    useEffect(() => {
      if (Object.keys(userDetails).length === 0) {
        // Retrieve the data from localStorage when the component mounts if not already set
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
          setUserDetails(JSON.parse(storedUserData));
        }
      }
      fetchData();
    }, [userDetails]); // Depend on userDetails to fetch data after it's set
  
  console.log(userDetails.designation)
  const tickets_type_array = [
    "RAISED REPORTS",
    "APPROVED REPORTS",
    "REJECTED REPORTS",
    "REVERTED REPORTS",
    "RECEIVED REPORTS",
    "CC REPORTS",
    "FORWARDED REPORTS",
    "DRAFT REPORTS",
  ];
  const navigate = useNavigate();
    const fetchData = async () => {
      if (!userDetails.email || !userDetails.designation) {
        console.error("User details are not available");
        return;
      }
      try {
        const response = await fetch(basepath()+"/tab_count", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email : userDetails.officername,
            design : userDetails.designation,
          }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log(result, "result");
        setData(result);

        const profile_response = await fetch(basepath()+`/profiles`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email : userDetails.email,
            design : userDetails.designation,
          }),
        });

        if (!profile_response.ok) {
          throw new Error("Network response was not ok");
        }

        const result_profiles = await profile_response.json();
        console.log(result_profiles, "result profiles");
        setProfileData(result_profiles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
  const getCount = (ticketType) => {
    const key = ticketType.toLowerCase().replace(/ /g, "_");
    console.log(key,'/........................./')
    return data[key] || 0;
  };
  const handleClick = (tab) => {
    // Navigate to the Tabs component and pass the ticket type as a URL parameter
    // navigate(`/tabs/${tab}`);
    setSelectedBox(tab);
    setIsPopupOpen(true);
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedBox(null);
  };

  //   For Create Popup
  const handleOpenCreate = () => {
    setIsCreateOpen(true);
  };

  const handleCloseCreate = () => {
    setIsCreateOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className={`containe homepage-container ${isCreateOpen ? "blurred" : ""}`}>
        <div className="search_filter_div">
          <div className="search_filter">
            <form className="form-inline my-2 my-lg-0">
              <div className="searchBar_cls" style={{ position: "relative" }}>
                <SearchIcon fontSize="large" className="search_icon" />
                <input
                  className=" searchBar"
                  name="query"
                  type="text"
                  placeholder="Click here to search"
                  aria-label="Search"
                />
              </div>
            </form>
            <img src={filter_icon} />
          </div>
          {/* <button className="create_ticket_btn"> <img src={plus_icon} /> Create Ticket</button> */}
          {/* <Button
            variant="primary"
            style={{ background: "#0A3673" }}
            onClick={handleOpenCreate}
          >
            + Create Ticket
          </Button> */}
          <EnquiryModal 
            onEnquirySelect={(enquiry) => {
            handleCloseCreate();
            }}/>
        </div>
        <div className="total_tickets_div">
          <div className="total_tickets_drop">
            <h4 id="total_tickets_h4">Total Tickets</h4>
            {/* <select className="total_tickets_drop_down">
              This week
              <option>This week</option>
              <option>option1</option>
              <option>option2</option>
              <option>option3</option>
            </select> */}
          </div>
          <div className="ticket_types">
            {tickets_type_array.map((item, index) => (
              <div
                className="tickets_divs"
                key={index}
                onClick={() => handleClick(item)} // Add click handler
              >
                <p>{item}</p>
                <div className="tickets_count">
                  <img src={ticket_count_icon} alt="ticket count icon" />
                  <h2>{getCount(item)}</h2>
                </div>
              </div>
            ))}
          </div>
          <Tabs
            isOpen={isTabOpen}
            onClose={handleClosePopup}
            tabs={selectedBox}
          ></Tabs>
        </div>
        <div>
          <h4 id="Profiles_h4">Profiles</h4>
          <div className="profiles_cards">
            {profile_data.profiles?.map((items, index) => (
              <div className="profiles_divs" key={index}>
                <Image src={items.profile_image ? `data:image/png;base64,${items.profile_image}` : profile_png} roundedCircle/>


                {/* {items.profile_image?<img className="profile_img" src={`data:image/png;base64,${items.profile_image}`} /> : <img className="profile_img" src={profile_png} alt={index}/>} */}
                <div style={{ width: "100%" }}>
                  <div id="profiles_top">
                    <p>Name : {items.name}</p>
                    <p>Age : {items.age}</p>
                  </div>
                  <div id="profiles_bottom">
                    <p>Aadhaar : {items.aadhaar_no}</p>
                    <p>PAN : {items.pan_no}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* {isCreateOpen && (
        <Create onEnquirySelect={() => {}} onClose={handleCloseCreate} />
      )} */}
	    {/* <Modal show={isCreateOpen} onHide={handleCloseCreate} centered>
        <Create
          onEnquirySelect={(enquiry) => {
            console.log(enquiry);
            handleCloseCreate();
          }}
          onClose={handleCloseCreate}
          show={isCreateOpen} // Pass show prop if needed in Create component
        />
      </Modal> */}
    </>
  );
};

export default Homepage;