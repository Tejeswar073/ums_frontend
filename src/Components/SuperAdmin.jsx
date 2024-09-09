import React, { useState, useEffect } from "react";
import filter_icon from "../assets/filter_icon.png";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "./Navbar";
import '../css/SuperAdmin.css'
import UserCreationModal from "./UserCreate";
import '../css/ReportCard.css';
import TotalReports from "./ReportCard";
import RecentReports from "./RecentReport";
import ProfileTable from "./ProfilesCard";
import OverallReportsChart from "./ChartReport";
const SuperAdminPage = () => {
  const reports = [
    { title: 'Discrete Report', count: 23, color: '#29AB91' },
    { title: 'Radicalisation Report', count: 88, color: '#377DFF' },
    { title: 'Open Report', count: 67, color: '#9590A8' },
    { title: 'De-Radicalisation Report', count: 67, color: '#FFA600' },
    { title: 'Vital Installation', count: 9, color: '#2D82B7CC' },
    { title: 'ICP', count: 67, color: '#4ADBC8' },
    { title: 'Hoax Call', count: 67, color: '#9590A8' },
    { title: 'Madarsa', count: 67, color: '#FFA600' },
    { title: 'Minutes of Meeting', count: 88, color: '#EB8A90' },
    { title: 'Lodged FIR/Missing', count: 88, color: '#D0AB4C' },
  ];
    return (
      <>
        <Navbar />
        <div className="containe homepage-container">
          <div className="search_filter_div">
            <div className="search_filter">
              <form className="form-inline my-2 my-lg-0">
                <div className="searchBar_cls" style={{ position: "relative" }}>
                  <SearchIcon fontSize="large" className="search_icon" />
                  <input
                    className="searchBar"
                    name="query"
                    type="text"
                    placeholder="Click here to search"
                    aria-label="Search"
                  />
                </div>
              </form>
              <img src={filter_icon} />
            </div>
            <UserCreationModal />
          </div>
          <div className="d-flex">
            <div className="ReportDiv">
              <TotalReports/>
            </div>
            <div>
              <RecentReports/>
            </div>
          </div>
          <div className="Dividers">
            <div>
              <p style={{
                color: 'rgba(10, 54, 115, 1)',
                fontSize: '20px',
              }}>Profiles</p>
            </div>
            <div>
              <p style={{
                textDecoration:'underline',
                color: 'rgba(2, 39, 89, 0.61)',

              }}>View More</p>
            </div>
          </div>
          <div className="d-flex">
            <div className="ReportDiv">
              <ProfileTable/>
            </div>
            <div>
                <OverallReportsChart/>
            </div>
          </div>
        </div>
      </>
    );
    











}

export default SuperAdminPage;