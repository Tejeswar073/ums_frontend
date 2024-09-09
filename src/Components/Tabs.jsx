import React, { useState, useEffect } from "react";
import { HiPlus } from "react-icons/hi";
import { IoMdArrowRoundBack, IoMdArrowDown,IoMdArrowUp } from "react-icons/io";
import { IoFilterSharp, IoCloudDownloadOutline } from "react-icons/io5";
import {basepath} from '../config'
import EnquiryModal from "./EnquiryModal";
import { Table, Button, Row, Col, Modal } from "react-bootstrap";
import "../css/Tabs.css";
import Preview from "./Preview"; 
import { useLocation } from 'react-router-dom';

const Tabs = ({ isOpen, onClose, tabs }) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [selectedRowData, setSelectedRowData] = useState(null); 
	const [showPreview, setShowPreview] = useState(false); 
	const [showEnquiryForm, setShowEnquiryForm] = useState(false);
	const [sortOrder, setSortOrder] = useState("asc");
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
	useEffect(() => {
		if (isOpen && tabs) {
			setLoading(true);
			fetchData(tabs);
		}
	}, [isOpen, tabs]);

	const fetchData = async (children) => {
		try {
			let tab = null;
			switch (children) {
				case "RAISED REPORTS":
					tab = "raised";
					break;
				case "APPROVED REPORTS":
					tab = "approved";
					break;
				case "REJECTED REPORTS":
					tab = "rejected";
					break;
				case "REVERTED REPORTS":
					tab = "reverted";
					break;
				case "RECEIVED REPORTS":
					tab = "received";
					break;
				case "CC REPORTS":
					tab = "cc";
					break;
				case "FORWARDED REPORTS":
					tab = "tag";
					break;
				default:
					tab = "draft";
			}

			const requestBody = {
				tab,
				email: "pi@gmail.com",
				design: "PI",
			};
			console.log(requestBody, "requet body")

			const response = await fetch(basepath()+ "/tab_data", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					tab : tab,
					email: userDetails.officername,
					design : userDetails.designation,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to fetch data");
			}

			const result = await response.json();
			console.log(result.Data,"unsorted data")
			setData(result.Data);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const handleRowClick = (rowData) => {
		setSelectedRowData(rowData);
		setShowPreview(true);
	};

	const handleClosePreview = () => {
		setShowPreview(false);
		setSelectedRowData(null);
	};

	const handleOpenPopup = () => {
		setShowEnquiryForm(true); 
	};

	const handleClosePopup = () => {
		setShowEnquiryForm(false); 
	};

	const handleBackClick = () => {
		onClose(); 
	};

	const handleSortByDate = () => {
		const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    	setSortOrder(newSortOrder);

		const sortedData = [...data].sort((a, b) => {
		  	const dateA = new Date(a.created_at);
      		const dateB = new Date(b.created_at);

      		return newSortOrder === "asc" ? dateA - dateB : dateB - dateA;
		});
		console.log(sortedData,"sorted data")
		setData(sortedData );
	};

	if (!isOpen) return null;

	return (
		<div className={`popup-overlay tab-container ${showEnquiryForm ? "blurred" : ""}`} onClick={onClose}>
			<div className="popup-content" onClick={(e) => e.stopPropagation()}>
				<Row className="align-items-center mb-3 border-bottom pb-3">
					<Col>
						<h6 className="m-0" style={{ color: "#0A3673" }}>
							<span
								onClick={handleBackClick}
								style={{ cursor: "pointer", color: "#667085" }}
							>
								<IoMdArrowRoundBack />
							</span>
							&nbsp; {tabs}
						</h6>
					</Col>
					<Col className="text-end">
						<Button
							variant="light"
							style={{ color: "#0A3673" }}
							className="me-2 font-inter "
						>
							<IoFilterSharp /> &nbsp; Filters
						</Button>
						<Button
							variant="light"
							style={{ color: "#0A3673" }}
							className="me-2"
						>
							<IoCloudDownloadOutline /> &nbsp; Export
						</Button>
						<EnquiryModal/>
					</Col>
				</Row>
				<Row className="data-row-header border-bottom text-start">
					<Col onClick={handleSortByDate} style={{ cursor: "pointer" }}>Date{sortOrder === "desc" ? <IoMdArrowDown className="date-arrow"/> : <IoMdArrowUp className="date-arrow"/>}</Col>
					<Col className="data-cell">To</Col>
					<Col>CC</Col>
					<Col>Outward No</Col>
					<Col>Enquiry Type</Col>
					<Col>Current Status</Col>
				</Row>
				{data?.map((item, index) => (
					<Row
						key={index}
						className="data-row p-2 fs-6"
						onClick={() => handleRowClick(item)}
					>
						<Col>{item.created_date}</Col>
						<Col>{item.address_to}</Col>
						<Col>{item.cc}</Col>
						<Col>{item.outward_no}</Col>
						<Col>{item.enquiry_type || item.enquiry}</Col>
						<Col>{item.status}</Col>
					</Row>
				))}

				{selectedRowData && (
					<Preview
						show={showPreview}
						handleClose={handleClosePreview}
						rowData={selectedRowData}
					/>
				)}

				{/* <Modal show={showEnquiryForm} onHide={handleClosePopup} centered>
					<Create
						onEnquirySelect={(enquiry) => {
							console.log(enquiry);
							handleClosePopup();
						}}
						onClose={handleClosePopup}
					/>
				</Modal> */}
			</div>
		</div>
	);
};

export default Tabs;
