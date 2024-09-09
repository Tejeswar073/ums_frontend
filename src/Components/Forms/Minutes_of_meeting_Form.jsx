import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import {
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  OutlinedInput,
  Chip,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import TodayIcon from '@mui/icons-material/Today';

import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
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
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
const MinutesOfMeeting = ({ selectedEnquiry }) => {
  const [uploadedFile, setUploadedFile] = useState([]);
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
      handleFileUpload(acceptedFiles);
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

  const [alert1, setAlert] = useState('')
  async function handleFileUpload(files) {
    const formData = new FormData();
    setUploadedFile(prevFiles => [...prevFiles, ...files]);

    files.forEach((file) => {
      formData.append("doc_type", file);
    });
    try {
      const response = await fetch(basepath() + "/file_upload_handle", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const doc_path = await response.json();
        setAlert('Path Fetched')
        const uploadedFiles = doc_path["document_type"];
        setFormData((prevData) => ({
          ...prevData,
          documents: uploadedFiles,
        }));
      } else {
        setAlert('Path Fetched Failed')
        console.error("Failed to upload files:", response.statusText);
      }
    } catch (error) {
      setAlert('Path Fetched Failed')
      console.error("Error uploading files:", error);
    }
    // console.log(suspect_details);
  }

  const renderFileList = () => (
    <List>
        {uploadedFile.map((file, index) => (
            <ListItem key={index}>
                <ListItemIcon>
                    <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText primary={file.name} />
            </ListItem>
        ))}
    </List>
);

  console.log(formattedDate);
  const navigate = useNavigate(); // Hook for navigation
  //   const location = useLocation();
  const [counter, setCounter] = useState(1);
  const [To, setTO] = React.useState([]);
  const [CC, setCC] = React.useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [filesField1, setFilesField1] = useState([]);
  const [userList, setUserList] = useState([]);

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

  const [endTime, setEndTime] = useState(null);
  const [startTime, setStartTime] = useState(null);

  const [formData, setFormData] = useState({
    reportType: selectedEnquiry,
    to: "",
    cc: "",
    date: "",
    reference: "",
    outwardNo: "",

    meet_agenda: "",
    meet_organiser: "",
    meet_start_date: "",
    start_time: "",
    end_time: "",
    meet_attendees: "",

    meet_desc_agenda: "",
    meet_points: "",
    meeting_date: "",
    documents: [],
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
    const responce = await fetch(basepath() + "/mom", {
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
        source_unit: userDetails.unit,
        address_to: To,
        cc: CC,
        report_type: selectedEnquiry,
        date: formData.date,
        reference: formData.reference,
        outward_no: formData.outwardNo,

        meet_agenda: formData.meet_agenda,
        meet_organiser: formData.meet_organiser,
        meet_start_date: formData.meet_start_date,
        start_time: startTime,
        end_time: endTime,
        meet_attendees: formData.meet_attendees,

        meet_desc_agenda: formData.meet_desc_agenda,
        meet_points: formData.meet_points,
        meeting_date: formData.meeting_date,
        documents: formData.documents,
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
        status: formData.status,
        user_name: userDetails.officername,
        user_email: userDetails.email,
        designation: userDetails.designation,
        created_date: formattedDate,
        source_unit: userDetails.unit,
        address_to: To,
        cc: CC,
        report_type: selectedEnquiry,
        date: formData.date,
        reference: formData.reference,
        outward_no: formData.outwardNo,

        meet_agenda: formData.meet_agenda,
        meet_organiser: formData.meet_organiser,
        meet_start_date: formData.meet_start_date,
        start_time: startTime,
        end_time: endTime,
        meet_attendees: formData.meet_attendees,

        meet_desc_agenda: formData.meet_desc_agenda,
        meet_points: formData.meet_points,
        meeting_date: formData.meeting_date,
        documents: formData.documents,
      }),
    });
    if (responce.ok) {
      const data = await responce.json();
      console.log(data);
      navigate("/marvel/home");
    }
  }

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
                  value={formData.reportType}
                  InputProps={{
                    readOnly: true, // Makes the TextField read-only
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
                          ...formData, date: e.target.value,
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
                  setFormData({ ...formData, outwardNo: e.target.value })
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
          <h2 className="heading_suspect_det">Meetings of Minutes</h2>
          <div className="form_fields_div1">
            <div className="form_fields_left">
              <TextField
                id="meet-agenda"
                label="Agenda"
                variant="standard"
                value={formData.meet_agenda}
                onChange={(e) =>
                  setFormData({ ...formData, meet_agenda: e.target.value })
                }
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    className="form-control"
                    label="Select Date"
                    format="DD/MM/YYYY"
                    onChange={(newValue) =>
                      setFormData({
                        ...formData,
                        meet_start_date: newValue
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
              {/* <TextField
                id="end-time"
                label="End Time"
                variant="standard"
                type="time"
                value={formData.end_time}
                onChange={(e) =>
                  setFormData({ ...formData, end_time: e.target.value })
                }
              /> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimePicker"]}>
                  <TimePicker
                    label="End Time"
                    value={endTime}
                    // onChange={(newTime) => setCrimeRegisteredTime(newTime)}
                    onChange={(e) => setEndTime(e)}
                    className="form-control"
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
                id="meet-desc-agenda"
                label="Brief Description on Agenda"
                variant="standard"
                multiline
                rows={4}
                value={formData.meet_desc_agenda}
                onChange={(e) =>
                  setFormData({ ...formData, meet_desc_agenda: e.target.value })
                }
              />

              {renderDropField(
                getRootProps1,
                getInputProps1,
                isDragActive1,
                "Upload Documents"
              )}
              <p className="text-sm text-gray-500" style={{
                  marginTop: '-30px',
                  color: "gray"
              }}>
                  Attach file. File size of your documents should not exceed 10MB
              </p>
              {(alert1 === 'Path Fetched') ?  
                  (
                      <Box>
                          <Typography variant="h6">Uploaded Files:</Typography>
                          {renderFileList()}
                      </Box>
                  ) : (alert1 === 'Path Fetched Failed') && (
                      <Stack direction="horizontal">
                  <Badge bg="danger">File Upload Failed....!</Badge>
                </Stack>
                  )}
            </div>
            <div></div>
            <div className="form_fields_right">
              <TextField
                id="meet-organiser"
                label="Organiser"
                variant="standard"
                value={formData.meet_organiser}
                onChange={(e) =>
                  setFormData({ ...formData, meet_organiser: e.target.value })
                }
              />
              {/* <TextField
                id="start-time"
                label="Start Time"
                variant="standard"
                type="time"
                value={formData.start_time}
                onChange={(e) =>
                  setFormData({ ...formData, start_time: e.target.value })
                }
              /> */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimePicker"]}>
                  <TimePicker
                    label="Start Time"
                    value={startTime}
                    // onChange={(newTime) => setCrimeRegisteredTime(newTime)}
                    onChange={(e) => setStartTime(e)}
                    className="form-control"
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
                id="meet-attendees"
                label="Attendees"
                variant="standard"
                value={formData.meet_attendees}
                onChange={(e) =>
                  setFormData({ ...formData, meet_attendees: e.target.value })
                }
              />

              <TextField
                id="meet-points"
                label="Meeting Points"
                variant="standard"
                multiline
                rows={4}
                value={formData.meet_points}
                onChange={(e) =>
                  setFormData({ ...formData, meet_points: e.target.value })
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

export default MinutesOfMeeting;
