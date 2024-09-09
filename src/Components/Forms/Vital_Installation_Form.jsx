import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import {
  Select,
  FormControl,
  MenuItem,
  Radio,
  InputLabel,
  OutlinedInput,
  Chip,
  //   TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
} from "@mui/material";
import TodayIcon from '@mui/icons-material/Today';

import TextField from "@mui/material/TextField"; // Ensure this is correct
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import "../../css/Discrete_Enquiry_Form.css";
import { useTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { basepath, getUsersList } from "../../config";
import { useDropzone } from "react-dropzone";

const VitalInstallation = ({ selectedEnquiry }) => {
  const TodayDate = new Date();
  const theme = useTheme();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const day = String(TodayDate.getDate()).padStart(2, "0"); // Get day and pad with leading zero if needed
  const month = String(TodayDate.getMonth() + 1).padStart(2, "0"); // Get month (0-based) and pad with leading zero if needed
  const year = TodayDate.getFullYear(); // Get the 4-digit year
// Format the date in DD/MM/YYYY
const formattedDate = `${day}/${month}/${year}`;
const yesterday = `${day - 1}/${month}/${year}`;
console.log(formattedDate);
  const {
    getRootProps: getRootProps1,
    getInputProps: getInputProps1,
    isDragActive: isDragActive1,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFilesField1(acceptedFiles);
      console.log("Files in Field 1:", acceptedFiles);
    },
  });
  const renderDropField = (
    getRootProps,
    getInputProps,
    isDragActive,
    label
  ) => (
    <Box
      {...getRootProps()}
      sx={{
        border: "2px dashed grey",
        padding: "20px",
        textAlign: "center",
        cursor: "pointer",
        borderRadius: "8px",
        backgroundColor: isDragActive ? "#e0f7fa" : "#fafafa",
        transition: "background-color 0.3s ease",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <input {...getInputProps()} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "2rem",
        }}
      >
        <FileUploadOutlinedIcon sx={{ fontSize: 35 }} />
        <Typography className="drop" variant="h6" sx={{ mt: 2 }}>
          {isDragActive ? "Drop the files here..." : label}
        </Typography>
      </div>
    </Box>
  );

  //   console.log(formattedDate);
  const navigate = useNavigate(); // Hook for navigation
  //   const location = useLocation();
  //   const { selectedEnquiry } = location.state || {};
  const [counter, setCounter] = useState(1);
  const [To, setTO] = React.useState([]);
  const [CC, setCC] = React.useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [filesField1, setFilesField1] = useState([]);
  const [userList, setUserList] = useState([])
  async function getUsers() {
    setUserList(await getUsersList());
    console.log(userList,'/././/././../././mnmmnmn')
  }
  useEffect(() => {
    // Retrieve the data from localStorage when the component mounts
    setUserDetails(JSON.parse(localStorage.getItem("userData")));
    getUsers();
  }, []);
  const [selectedBuilds, setSelectedBuilds] = useState({
    slim: false,
    medium: false,
    athletic: false,
    heavy: false,
    others: false,
  });

  const [formData, setFormData] = useState({
    report_type: selectedEnquiry,
    to: [],
    cc: [],
    date: "",
    reference: "",
    outward_no: "",

    so_id: "",
    so_name: "",
    so_address: "",
    so_contact: "",
    so_email: "",

    vi_id: "",
    report_to: "",
    subject: "",
    vi_name: "",
    vi_address1: "",
    vi_pin: "",
    vi_state: "",
    vi_pstn_contact: "",

    report_by: "",
    report_date: "",
    report_via: "",
    vi_type: "",
    vi_address2: "",
    vi_city: "",
    vi_district: "",
    vi_pstn: "",
  });

  const handleBack = () => {
    navigate("/marvel/home");
  };
  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  //   TO CC
  const handleChangeTo = (event) => {
    const {
      target: { value },
    } = event;
    setTO(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeCC = (event) => {
    const {
      target: { value },
    } = event;
    setCC(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleSubmit = async () => {
    if (To.length === 0){
      return alert('Please Select "To" Field');
    }
    const responce = await fetch(basepath() + "/vital_installation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        enquiry: selectedEnquiry,
        status: formData.status,
        user_name: userDetails.officername,
        user_email: userDetails.email,
        designation: userDetails.designation,
        created_date: formattedDate,
        tag: formData.tag,
        reject_reason: formData.reject_reason,
        source_unit: userDetails.unit,

        report_type: formData.selectedEnquiry,
        address_to: To,
        cc: CC,
        date: formData.date,
        reference: formData.reference,
        outward_no: formData.outward_no,

        so_id: formData.so_id,
        so_name: formData.so_name,
        so_address: formData.so_address,
        so_contact: formData.so_contact,
        so_email: formData.so_email,

        vi_id: formData.vi_id,
        report_to: formData.report_to,
        subject: formData.subject,
        vi_name: formData.vi_name,
        vi_address1: formData.vi_address1,
        vi_pin: formData.vi_pin,
        vi_state: formData.vi_state,
        vi_pstn_contact: formData.vi_pstn_contact,

        report_by: formData.report_by,
        report_date: formData.report_date,
        report_via: formData.report_via,
        vi_type: formData.vi_type,
        vi_address2: formData.vi_address2,
        vi_city: formData.vi_city,
        vi_district: formData.vi_district,
        vi_pstn: formData.vi_pstn,
      }),
    });
    if (responce.ok) {
      const data = await responce.json();
      console.log(data);
      navigate("/marvel/home");
    }
  };

  async function Draft_form() {
    const responce = await fetch(basepath() + "/draft", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        enquiry: selectedEnquiry,
        user_name: userDetails.officername,
        user_email: userDetails.email,
        designation: userDetails.designation,
        source_unit: userDetails.unit,
        address_to: To,
        cc: CC,
      }),
    });
    if (responce.ok) {
      const data = await responce.json();
      console.log(data);
      navigate("/marvel/home");
    }
  }

  //   Handle Errors
  //   const [errorMessage, setErrorMessage] = useState({
  //     phoneError: "",
  //     emailError: "",
  //     aadharError: "",
  //     panError: "",
  //   });

  //   const isValidPhoneNumber = (phone) => {
  //     const phonePattern = /^[6-9]\d{9}$/; // Example pattern for Indian phone numbers
  //     return phonePattern.test(phone);
  //   };

  //   const isValidEmail = (email) => {
  //     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //     return emailPattern.test(email);
  //   };

  //   const isValidAadhar = (aadhar) => {
  //     const aadharPattern = /^\d{12}$/;
  //     return aadharPattern.test(aadhar);
  //   };

  //   const isValidPAN = (pan) => {
  //     const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  //     return panPattern.test(pan);
  //   };

  //   const handlePhoneChange = (value) => {
  //     if (!isValidPhoneNumber(value)) {
  //       setErrorMessage((prev) => ({
  //         ...prev,
  //         phoneError: "Invalid Phone Number",
  //       }));
  //     } else {
  //       setErrorMessage((prev) => ({ ...prev, phoneError: "" }));
  //     }
  //     setFormData((prev) => ({ ...prev, phoneNumber: value }));
  //   };

  //   const handleEmailChange = (value) => {
  //     if (!isValidEmail(value)) {
  //       setErrorMessage((prev) => ({
  //         ...prev,
  //         emailError: "Invalid Email Address",
  //       }));
  //     } else {
  //       setErrorMessage((prev) => ({ ...prev, emailError: "" }));
  //     }
  //     setFormData((prev) => ({ ...prev, email: value }));
  //   };

  //   const handleAadharChange = (value) => {
  //     if (!isValidAadhar(value)) {
  //       setErrorMessage((prev) => ({
  //         ...prev,
  //         aadharError: "Invalid Aadhar Number",
  //       }));
  //     } else {
  //       setErrorMessage((prev) => ({ ...prev, aadharError: "" }));
  //     }
  //     setFormData((prev) => ({ ...prev, aadharNumber: value }));
  //   };

  //   const handlePANChange = (value) => {
  //     if (!isValidPAN(value)) {
  //       setErrorMessage((prev) => ({ ...prev, panError: "Invalid PAN Number" }));
  //     } else {
  //       setErrorMessage((prev) => ({ ...prev, panError: "" }));
  //     }
  //     setFormData((prev) => ({ ...prev, panNumber: value }));
  //   };

  return (
    <>
      <div className="form_discrete_enquiry_main_div">
        <Navbar />
        <div className="discrete_enquiry_form_div">
          <div className="form_top">
            <div id="form_top_heading">
              <ArrowBackIcon
                onClick={handleBack}
                style={{ cursor: "pointer" }}
              />
              <div>
                <p className="form_heading">{selectedEnquiry} Form</p>
                <hr id="hr_d" />
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#56749e",
                borderRadius: "40%",
                width: "40px",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                color: "white",
              }}
            >
              {counter}
            </div>
          </div>
          <div className="form_fields_div1">
            <div className="form_fields_left">
              <FormControl variant="standard" className="form-control">
                <TextField
                  id="standard-readonly"
                  label="Report Type"
                  variant="standard"
                  value={formData.report_type}
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                />
              </FormControl>
              <FormControl className="form-control">
                <InputLabel id="demo-multiple-chip-label">To</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  value={To}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                      borderBottom: "1px solid #737B7D;",
                      borderRadius: 0,
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderBottom: "1px solid #737B7D;",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderBottom: "1px solid #737B7D;",
                      borderColor: "#737B7D",
                    },
                  }}
                  onChange={handleChangeTo}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {userList.map((user) => (
                    <MenuItem
                      key={user.name}
                      value={user.name}
                      style={getStyles(user.name, To, theme)}
                    >
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
                {(To.length === 0 && (
                  <Stack direction="horizontal" className="mt-2">
                  <Badge bg="danger">
                    'To' field cannot be empty.
                  </Badge>
                </Stack>
                ))}
              </FormControl>
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    className="form-control"
                    label="Select Date"
                    format="DD/MM/YYYY"
                    onChange={(newValue) =>
                      setFormData({
                        ...formData,
                        date: newValue ? newValue.format("DD/MM/YYYY") : "",
                      })
                    }
                    slotProps={{
                      textField: {
                        InputProps: {
                          sx: {
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: "none",
                              borderBottom: "1px solid #737B7D",
                              borderRadius: 0,
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderBottom: "1px solid #737B7D",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderBottom: "1px solid #737B7D",
                              borderColor: "#737B7D",
                            },
                          },
                        },
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider> */}
                <FormControl variant="standard" className="form-control">
                    <InputLabel id="demo-simple-select-standard-label">Date</InputLabel>
                    <Select
                    sx={{
                      '.css-rm9hue-MuiSvgIcon-root-MuiSelect-icon' : {
                          display: 'none'
                      },
                      '.css-szadsf-MuiSvgIcon-root-MuiSelect-icon' : {
                        display:'none'
                      }
                                            
                    }}
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={formData.date}  // Ensure `value` is never undefined
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          date: e.target.value,
                        })
                      }
                    >
                      <MenuItem key="" value="">
                        <em>Select Date</em>
                      </MenuItem>
                      <MenuItem value={formattedDate}>{formattedDate}</MenuItem>,
                      <MenuItem value={yesterday}>{yesterday}</MenuItem>,
                    </Select>
                      <TodayIcon className="calendar-icon" />
                  </FormControl>
            </div>
            <div className="form_fields_right">
              <TextField
                id="standard-basic"
                onChange={(e) =>
                  setFormData({ ...formData, outward_no: e.target.value })
                }
                label="Outward No"
                variant="standard"
              />
              <FormControl className="form-control">
                <InputLabel id="demo-multiple-chip-label">CC</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={CC}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                      borderBottom: "1px solid #737B7D;",
                      borderRadius: 0,
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderBottom: "1px solid #737B7D;",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderBottom: "1px solid #737B7D;",
                      borderColor: "#737B7D",
                    },
                  }}
                  onChange={handleChangeCC}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {To.map((to) => (
                      (userList.map((user)=> ((to !== user.name)&& 
                          <MenuItem
                              key={user.name}
                              value={user.name}
                              style={getStyles(user.name, To, theme)}
                          >
                              {user.name}
                          </MenuItem>
                      )))
                  ))}
                </Select>
              </FormControl>
              <TextField
                id="standard-basic"
                label="Reference"
                variant="standard"
                onChange={(e) =>
                  setFormData({ ...formData, reference: e.target.value })
                }
              />
            </div>
          </div>
          <hr style={{ margin: "4rem 2rem" }} />
          <h2 className="heading_suspect_det">Security Officers</h2>
          <div className="form_fields_div1">
            <div className="form_fields_left">
              <TextField
                id="so_id"
                label="ID"
                variant="standard"
                value={formData.so_id}
                onChange={(e) =>
                  setFormData({ ...formData, so_id: e.target.value })
                }
              />
              <TextField
                id="so_address"
                label="Address"
                variant="standard"
                value={formData.so_address}
                onChange={(e) =>
                  setFormData({ ...formData, so_address: e.target.value })
                }
              />

              <TextField
                id="so_email"
                label="Email Address"
                variant="standard"
                value={formData.so_email}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({ ...formData, so_email: value });

                  // Inline validation logic
                  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                  e.target.setCustomValidity(
                    isValidEmail && value !== "" ? "" : "Invalid Email Address"
                  );
                }}
                helperText={
                  formData.so_email !== "" &&
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.so_email)
                    ? "Invalid Email Address"
                    : ""
                }
                style={{
                  color: formData.so_email ? "" : "red",
                }}
                FormHelperTextProps={{
                  sx: { color: !formData.so_email ? "inherit" : "red" }, // Conditionally change helper text color
                }}
              />
            </div>
            <div className="form_fields_right">
              <TextField
                id="meet-organiser"
                label="Name"
                variant="standard"
                value={formData.meet_organiser}
                onChange={(e) =>
                  setFormData({ ...formData, meet_organiser: e.target.value })
                }
              />
              <TextField
                id="so_contact"
                label="Contact"
                variant="standard"
                value={formData.so_contact}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setFormData({ ...formData, so_contact: value });

                  e.target.setCustomValidity(
                    value.length <= 10 ? "" : "Invalid Contact Number"
                  );
                }}
                style={{
                  color: formData.so_contact ? "" : "red",
                }}
                helperText={
                  formData.so_contact.length > 0 &&
                  formData.so_contact.length !== 10
                    ? "Invalid Contact Number"
                    : ""
                }
                inputProps={{
                  maxLength: 10,
                }}
                FormHelperTextProps={{
                  sx: { color: !formData.so_contact ? "inherit" : "red" }, // Conditionally change helper text color
                }}
              />
            </div>
          </div>
          <hr style={{ margin: "4rem 2rem" }} />
          <h2 className="heading_suspect_det">Vital Installation</h2>
          <div className="form_fields_div1">
            <div className="form_fields_left">
              <TextField
                id="vi_id"
                label="ID"
                variant="standard"
                value={formData.vi_id}
                onChange={(e) =>
                  setFormData({ ...formData, vi_id: e.target.value })
                }
              />

              <TextField
                id="report_to"
                label="Report To"
                variant="standard"
                value={formData.report_to}
                onChange={(e) =>
                  setFormData({ ...formData, report_to: e.target.value })
                }
              />
              <TextField
                id="subject"
                label="Subject"
                variant="standard"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
              />
              <TextField
                id="vi_name"
                label="Name"
                variant="standard"
                value={formData.vi_name}
                onChange={(e) =>
                  setFormData({ ...formData, vi_name: e.target.value })
                }
              />

              <TextField
                id="vi_address1"
                label="Address 1"
                variant="standard"
                value={formData.vi_address1}
                onChange={(e) =>
                  setFormData({ ...formData, vi_address1: e.target.value })
                }
              />
              <TextField
                id="vi_pin"
                label="PIN"
                variant="standard"
                value={formData.vi_pin}
                onChange={(e) =>
                  setFormData({ ...formData, vi_pin: e.target.value })
                }
              />
              <TextField
                id="vi_state"
                label="State"
                variant="standard"
                value={formData.vi_state}
                onChange={(e) =>
                  setFormData({ ...formData, vi_state: e.target.value })
                }
              />

              {/* <TextField
                id="vi_pstn_contact"
                label="PSTN Contact"
                variant="standard"
                value={formData.vi_pstn_contact}
                onChange={(e) =>
                  setFormData({ ...formData, vi_pstn_contact: e.target.value })
                }
              /> */}
              <TextField
                id="vi_pstn_contact"
                label="PSTN Contact"
                variant="standard"
                value={formData.vi_pstn_contact}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setFormData({ ...formData, vi_pstn_contact: value });

                  e.target.setCustomValidity(
                    value.length <= 10 ? "" : "Invalid Contact Number"
                  );
                }}
                style={{
                  color: formData.vi_pstn_contact ? "" : "red",
                }}
                helperText={
                  formData.vi_pstn_contact.length > 0 &&
                  formData.vi_pstn_contact.length !== 10
                    ? "Invalid Contact Number"
                    : ""
                }
                inputProps={{
                  maxLength: 10,
                }}
                FormHelperTextProps={{
                  sx: { color: !formData.vi_pstn_contact ? "inherit" : "red" }, // Conditionally change helper text color
                }}
              />
            </div>
            <div className="form_fields_right">
              <TextField
                id="report_by"
                label="Report By"
                variant="standard"
                value={formData.report_by}
                onChange={(e) =>
                  setFormData({ ...formData, report_by: e.target.value })
                }
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    className="form-control"
                    label="Report Date"
                    format="DD/MM/YYYY"
                    onChange={(newValue) =>
                      setFormData({
                        ...formData,
                        report_date: newValue
                          ? newValue.format("DD/MM/YYYY")
                          : "",
                      })
                    }
                    slotProps={{
                      textField: {
                        InputProps: {
                          sx: {
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: "none",
                              borderBottom: "1px solid #737B7D",
                              borderRadius: 0,
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderBottom: "1px solid #737B7D",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderBottom: "1px solid #737B7D",
                              borderColor: "#737B7D",
                            },
                          },
                        },
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <TextField
                id="report_via"
                label="Report Via"
                variant="standard"
                value={formData.report_via}
                onChange={(e) =>
                  setFormData({ ...formData, report_via: e.target.value })
                }
              />
              <TextField
                id="vi_type"
                label="Report Type"
                variant="standard"
                value={formData.vi_type}
                onChange={(e) =>
                  setFormData({ ...formData, vi_type: e.target.value })
                }
              />

              <TextField
                id="vi_address2"
                label="Address 2"
                variant="standard"
                value={formData.vi_address2}
                onChange={(e) =>
                  setFormData({ ...formData, vi_address2: e.target.value })
                }
              />
              <TextField
                id="vi_city"
                label="City"
                variant="standard"
                value={formData.vi_city}
                onChange={(e) =>
                  setFormData({ ...formData, vi_city: e.target.value })
                }
              />
              <TextField
                id="vi_district"
                label="District"
                variant="standard"
                value={formData.vi_district}
                onChange={(e) =>
                  setFormData({ ...formData, vi_district: e.target.value })
                }
              />

              <TextField
                id="vi_pstn"
                label="PSTN"
                variant="standard"
                value={formData.vi_pstn}
                onChange={(e) =>
                  setFormData({ ...formData, vi_pstn: e.target.value })
                }
              />
            </div>
          </div>
          <div className="buttons">
            <button className="btn1_form" onClick={Draft_form}>
              SAVE AS DRAFT
            </button>
            <button className="btn2_form" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VitalInstallation;
