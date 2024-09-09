import React, { useState, useEffect } from "react";
import filter_icon from "../../assets/filter_icon.png";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchIcon from "@mui/icons-material/Search";
import { basepath } from "../../config";
import { useLocation } from 'react-router-dom';

import { useNavigate } from "react-router-dom";
import '../../css/HomageCSS/HomePageTest.css'
import Navbar from "../Navbar";
import EnquiryModal from '../EnquiryModal'
import ProfileTable from "./Profiles"
import RaisedReportTable from "./RecentReport"
import TotalReports from "./TotalReports"
import OverallReports from "./OverallReports";

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
            const response = await fetch(basepath() + "/tab_count", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: userDetails.officername,
                    design: userDetails.designation,
                }),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            console.log(result, "result");
            setData(result);

            const profile_response = await fetch(basepath() + `/profiles`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: userDetails.officername,
                    design: userDetails.designation,
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
        console.log(key, '/........................./')
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
                    <EnquiryModal
                        onEnquirySelect={(enquiry) => {
                            handleCloseCreate();
                        }} />
                </div>
                <div className="grid-container">
                    <div className="row1">
                        <div className="block block1"><TotalReports userDetails={userDetails} /></div>
                        <div className="block block2"><RaisedReportTable userDetails={userDetails} /></div>
                    </div>
                    <div className="row2">
                        <div className="block block3"><ProfileTable userDetails={userDetails} /></div>
                        <div className="block block4"><OverallReports userDetails={userDetails} /></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Homepage;