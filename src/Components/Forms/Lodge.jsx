import React, { useCallback, useRef, useState, useEffect } from "react";
import Navbar from "../Navbar";
import "../../css/Discrete_Enquiry_Form.css";
import { basepath, getUsersList } from "../../config";

import { useNavigate, useLocation } from 'react-router-dom';
import {Select,FormControl,MenuItem,Radio,RadioGroup,InputLabel,OutlinedInput,Chip, TextField,FormControlLabel,Checkbox,Box,Typography} from '@mui/material';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDropzone } from "react-dropzone";
import TodayIcon from '@mui/icons-material/Today';

import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useTheme } from '@mui/material/styles';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import dayjs from "dayjs";

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
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

const TodayDate = new Date();

// Extract the day, month, and year
const day = String(TodayDate.getDate()).padStart(2, '0'); // Get day and pad with leading zero if needed
const month = String(TodayDate.getMonth() + 1).padStart(2, '0'); // Get month (0-based) and pad with leading zero if needed
const year = TodayDate.getFullYear(); // Get the 4-digit year

// Format the date in DD/MM/YYYY
const formattedDate = `${day}/${month}/${year}`;
const yesterday = `${day - 1}/${month}/${year}`;
console.log(formattedDate);

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];


function getStyles(name, personName, theme) {
    return {
      fontWeight:
      personName.indexOf(name) === -1
      ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
        };
    }
    
    const Lodge_fir_form = ()=> {
        const [userList, setUserList] = useState([])
        const theme = useTheme();
        const [counter, setCounter] = useState(1)
        const [date, setValue] = React.useState('');
        const [Lodgedtime, setValueTime] = React.useState();
        const [Occuredtime, setValueTime2] = React.useState();
        const [Lodgedate, setLodgedate] = React.useState();
        const [Occureddate, setOccureddate] = React.useState();
        const [uploadedFile, setUploadedFile] = useState([]);

        const [To, setTO] = React.useState([]);
        const [CC, setCC] = React.useState([]);
        const [userDetails, setUserDetails] = useState([]);
        const navigate = useNavigate(); // Hook for navigation
        const location = useLocation();
        const { selectedEnquiry } = location.state || {}; // Default to {} if state is undefined
        
        async function getUsers() {
          setUserList(await getUsersList());
          console.log(userList,'/././/././../././mnmmnmn')
        }

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
          const handleBack = ()=>{
          navigate('/marvel/home')
          }
          
        
        useEffect(() => {
            // Retrieve the data from localStorage when the component mounts
            setUserDetails(JSON.parse(localStorage.getItem('userData')));
            console.log(selectedEnquiry)
            getUsers();
        }, [])
        const [Sections, setSection] = useState([''])
        /* Suspect Phone and Email */
        const MultiSection = (event,index) => {
          const updatedDetails = [...Sections];
          updatedDetails[index] = event.target.value;
          setSection(updatedDetails);
        };

        const removeSections = (i, event) => {
          event.preventDefault();
          const updatedDetails = [...Sections];
          updatedDetails.splice(i, 1); // Remove the item
          setSection(updatedDetails);
        };

        const MultiSectionsAdd = (event) => {
          event.preventDefault(); 
          setSection([...Sections, '']); // Add a new empty email);
        };

        const [accused_details, setAccused_Details] = useState([{
            accused_name  : '',
            dms_daw_id    : '',
            address       : '',
            age           : '',
            profession    : '',
            education     : '',
            phone         : [''],
            email         : [''],
            aadhaar_no    : '',
            passport_no   : '',
            pan_no        : '',
            photos        : [],
        }])

        /* For Accused Multi Phone */
          const MultiPhone = (event, i, index) => {
            const updatedDetails = [...accused_details];
            updatedDetails[index].phone[i] = event.target.value;
            setAccused_Details(updatedDetails);
            console.log(updatedDetails[index].phone, 'updated after input');
          };

          const removePhone = (i, event, index) => {
            event.preventDefault();
            const updatedDetails = [...accused_details];
            updatedDetails[index].phone = updatedDetails[index].phone.filter((_, idx) => idx !== i);
            setAccused_Details(updatedDetails);
            console.log(updatedDetails[index].email, 'updated after removal');
          };

          const MultiPhoneAdd = (event, index) => {
            event.preventDefault();
            const updatedDetails = [...accused_details];
            updatedDetails[index].phone = [...updatedDetails[index].phone, ''];
            setAccused_Details(updatedDetails);
            console.log(updatedDetails, 'updated after adding a new phone');
          };

          const MultiEmail = (event, i, index) => {
            const updatedDetails = [...accused_details];
            updatedDetails[index].email[i] = event.target.value;
            setAccused_Details(updatedDetails);
            console.log(updatedDetails[index].email, 'updated after input');
          };
          
          const removeEmail = (i, event, index) => {
            event.preventDefault();
            const updatedDetails = [...accused_details];
            updatedDetails[index].email = updatedDetails[index].email.filter((_, idx) => idx !== i);
            setAccused_Details(updatedDetails);
            console.log(updatedDetails[index].email, 'updated after removal');
          };
          
          const MultiEmailAdd = (event, index) => {
            event.preventDefault();
            const updatedDetails = [...accused_details];
            updatedDetails[index].email = [...updatedDetails[index].email, ''];
            setAccused_Details(updatedDetails);
            console.log(updatedDetails, 'updated after adding a new phone');
          };
          /* End Here=================================================================> */
          

        /* Multiple Suspect Relatives Details */
        const handleRelativeInputs = (event,index, type) => {
          const updatedDetails = [...accused_details];
          if(type==='pan_no'){
            updatedDetails[index][type] = event.target.value.toLocaleUpperCase();
          }
          else{
            updatedDetails[index][type] = event.target.value;
          }
          setAccused_Details(updatedDetails);
          console.log(updatedDetails, 'updated after input');
        };
        const removeRelative = (i, event) => {
          event.preventDefault();
          const updatedDetails = accused_details.filter((_, idx) => idx !== i);
          setAccused_Details(updatedDetails);
          console.log(updatedDetails, 'updated after removal');
        };

        const handleRelativeAdd = (event) => {
          event.preventDefault();
          const  updatedDetails = [
            ...accused_details, 
            {
            accused_name  : '',
            dms_daw_id    : '',
            address       : '',
            age           : '',
            profession    : '',
            education     : '',
            phone         : [''],
            email         : [''],
            aadhaar_no    : '',
            passport_no   : '',
            pan_no        : '',
            photos        : [],
            }
          ];
          setAccused_Details(updatedDetails);
          console.log(updatedDetails, 'updated after adding a new phone');
        };


        const {
          getRootProps: getRootProps,
          getInputProps: getInputProps,
          isDragActive: isDragActive,
        } = useDropzone({
          onDrop: (acceptedFiles) => {
            setFilesField3(acceptedFiles);
            console.log("Files in Field 3:", acceptedFiles);
          },
        });

        const [alert2, setAlert] = useState('')
        async function documenttype_handler(event, i) {
          const files = Array.from(event.target.files); // Convert FileList to an array
          console.log(files);
          setUploadedFile(prevFiles => [...prevFiles, ...files]);

          const formData = new FormData();
          // Append each file with a unique key
          files.forEach((file, i) => {
            formData.append('doc_type', file);
          });
          try {
            const response = await fetch(basepath() + "/file_upload_handle", {
              method: "POST",
              body: formData,
            });
        
            if (response.ok) {
              const doc_path = await response.json();
              console.log(doc_path)
              setAlert('Path Fetched')
              accused_details[i]['photos'] = doc_path['document_type'];
            } else {
              setAlert('Path Fetched Failed')
              console.error('Failed to upload files:', response.statusText);
            }
          } catch (error) {
            setAlert('Path Fetched Failed')
            console.error('Error uploading files:', error);
          }
          console.log(accused_details);
        }
        // drop file field
          const renderDropField = (
            getRootProps,
            getInputProps,
            isDragActive,
            label,
            index
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
              <input {...getInputProps()} onChange={(e)=> documenttype_handler(e, index)} />
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

        
        const [formData, setFormData] = useState({
            report_type            : '',
            outward_no             : '',
            cc                     : '',
            reference              : '',
            enq_officer            : '',
            enq_person             : '',
            enq_place              : '',
            date                   : '',
            agency                 : '',
            fir_no                 : '',
            police_station         : '',
            sections               : '',
            lodged_by              : '',
            lodged_date            : '',
            lodged_time            : '',
            occured_date           : '',
            occured_time           : '',
            accused_arrest         : '',
            arrest_date            : '',
            arrest_time            : '',
            late_reason            : '',
            seizer                 : '',
            investigation_officer  : '',
            crime_brief            : '',
            enq_brief              : '',
            accused_status         : '',
        })

    async function Lodge_form() {

      if (To.length === 0){
        return alert('Please Select "To" Field');
      }
        const responce = await fetch(basepath() + "/lodged", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
            enquiry         : selectedEnquiry,
            user_name       : userDetails.officername,
            user_email      : userDetails.email,
            created_date    : formattedDate,
            designation     : userDetails.designation,
            report_type     : selectedEnquiry,
            source_unit     : userDetails.unit,
            address_to      : To,
            cc              : CC,
            sections        : Sections,
            outward_no      : formData.outward_no,
            reference       : formData.reference,
            enq_officer     : formData.enq_officer,
            enq_person      : formData.enq_person,
            date            : formData.date,
            agency          : formData.agency,
            fir_no          : formData.fir_no,
            police_station  : formData.police_station,
            lodged_by       : formData.lodged_by,
            lodged_date     : formData.lodged_date,
            lodged_time     : formData.lodged_time,
            occured_date    : formData.occured_date,
            occured_time    : formData.occured_time,
            accused_arrest  : formData.accused_arrest,
            arrest_date     : formData.arrest_date,
            arrest_time     : formData.arrest_time,
            late_reason     : formData.late_reason,
            seizer          : formData.seizer,
            investigation_officer : formData.investigation_officer,
            crime_brief     : formData.crime_brief,
            enq_brief       : formData.enq_brief,
            accused_status  : formData.accused_status,
            accused_details : accused_details

            }),
        });
        console.log(accused_details)
        if (responce.ok) {
            const data = await responce.json();
            console.log(data);
            navigate('/marvel/home')
            }
        }

        async function SaveAsDraft() {
          const responce = await fetch(basepath() + "/draft", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
              enquiry         : selectedEnquiry,
              user_name       : userDetails.officername,
              user_email      : userDetails.email,
              created_date    : formattedDate,
              designation     : userDetails.designation,
              report_type     : selectedEnquiry,
              source_unit     : userDetails.unit,
              address_to      : To,
              cc              : CC,
              sections        : Sections,
              outward_no      : formData.outward_no,
              reference       : formData.reference,
              enq_officer     : formData.enq_officer,
              enq_person      : formData.enq_person,
              date            : formData.date,
              agency          : formData.agency,
              fir_no          : formData.fir_no,
              police_station  : formData.police_station,
              lodged_by       : formData.lodged_by,
              lodged_date     : formData.lodged_date,
              lodged_time     : formData.lodged_time,
              occured_date    : formData.occured_date,
              occured_time    : formData.occured_time,
              accused_arrest  : formData.accused_arrest,
              arrest_date     : formData.arrest_date,
              arrest_time     : formData.arrest_time,
              late_reason     : formData.late_reason,
              seizer          : formData.seizer,
              investigation_officer : formData.investigation_officer,
              crime_brief     : formData.crime_brief,
              enq_brief       : formData.enq_brief,
              accused_status  : formData.accused_status,
              accused_details : accused_details
  
              }),
          });
          console.log(accused_details)
          if (responce.ok) {
              const data = await responce.json();
              console.log(data);
              navigate('/marvel/home')
              }
          }

    return (
        <>
        <div className="form_discrete_enquiry_main_div">
            <Navbar/>
            <div className="discrete_enquiry_form_div">
                <div className="form_top">
                    <div id="form_top_heading">
                        <ArrowBackIcon   onClick={handleBack} style={{ cursor: "pointer"}}/>
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
                    <TextField
                        id="standard-readonly"
                        label="Report Type"
                        variant="standard"
                        value={selectedEnquiry}
                        InputProps={{
                        readOnly: true, // Makes the TextField read-only
                        }}
                        fullWidth
                    />

                    <FormControl className="form-control">
                        <InputLabel id="demo-multiple-chip-label">To</InputLabel>
                        <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        value={To}
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                            borderBottom: '1px solid #737B7D;',
                            borderRadius: 0,
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderBottom: '1px solid #737B7D;',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderBottom: '1px solid #737B7D;',
                            borderColor: '#737B7D',
                            },
                        }}
                        onChange={handleChangeTo}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
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
                        <Stack direction="horizontal" className="mt-1">
                        <Badge bg="danger">
                            'To' field cannot be empty.
                        </Badge>
                        </Stack>
                        ))}
                    </FormControl>
                    <TextField
                        id="standard-basic"
                        label="Reference"
                        value={formData.reference}
                        variant="standard"
                        onChange={(e) =>
                        setFormData({ ...formData, reference: e.target.value })
                        }
                    />
                    <TextField
                        id="standard-basic"
                        label="Enquired Person"
                        variant="standard"
                        value={formData.enquiredPerson}
                        onChange={(e) =>
                            setFormData({
                            ...formData,
                            enquiredPerson: e.target.value,
                            })
                        }
                    />
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
                      value={date}  // Ensure `value` is never undefined
                      onChange={(e) => setValue(e.target.value)}
                    >
                      <MenuItem key="" value="">
                        <em>Select Date</em>
                      </MenuItem>
                      <MenuItem key={formattedDate} value={formattedDate}>{formattedDate}</MenuItem>,
                      <MenuItem key={yesterday} value={yesterday}>{yesterday}</MenuItem>,
                    </Select>
                    <TodayIcon className="calendar-icon" />
                  </FormControl>
                </div>
                <div className="form_fields_right">
                  <TextField
                    id="standard-basic"
                    value={formData.outward_no}
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
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                      borderBottom: '1px solid #737B7D;',
                      borderRadius: 0,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderBottom: '1px solid #737B7D;',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderBottom: '1px solid #737B7D;',
                      borderColor: '#737B7D',
                    },
                  }}
                  onChange={handleChangeCC}
                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
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
                    className="mt-4"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        enquiryOfficer: e.target.value,
                      })
                    }
                    label="Enquiry Officer"
                    variant="standard"
                  />
                  <TextField
                    id="standard-basic"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        enquiredPlace: e.target.value,
                      })
                    }
                    label="Enquired Place"
                    variant="standard"
                  />
                </div>
            </div>
            <hr style={{ margin: "4rem 2rem" }} />
            <h2 className="heading_suspect_det">Action Taken Agency</h2>
            <div className="form_fields_div1">
                <div className="form_fields_left">
                <TextField
                    id="standard-basic"
                    value={formData.agency}
                    onChange={(e) =>
                      setFormData({ ...formData, agency: e.target.value })
                    }
                    label="Action Taken Agency"
                    variant="standard"
                  />
                  <TextField
                    id="standard-basic"
                    value={formData.police_station}
                    onChange={(e) =>
                      setFormData({ ...formData, police_station: e.target.value })
                    }
                    label="Police Station"
                    variant="standard"
                  />
                  <TextField
                    id="standard-basic"
                    value={formData.lodged_by}
                    onChange={(e) =>
                      setFormData({ ...formData, lodged_by: e.target.value })
                    }
                    label="Lodged By"
                    variant="standard"
                  />
                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                        <TimePicker
                        className="form-control"
                        label="Lodged Time"
                        value={Lodgedtime}
                        onChange={(newValue) => setValueTime(newValue)}
                        ampm={true} // Enable AM/PM format
                        views={['hours', 'minutes', 'seconds']} // Include seconds in the picker
                        format="hh:mm:ss A" // Custom format for time display
                        slotProps={{
                            textField: {
                            InputProps: {
                                sx: {
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none',
                                    borderBottom: '1px solid #737B7D',
                                    borderRadius: 0,
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderBottom: '1px solid #737B7D',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderBottom: '1px solid #737B7D',
                                    borderColor: '#737B7D',
                                },
                                },
                            },
                            },
                        }}
                        />
                    </DemoContainer>
                 </LocalizationProvider>
                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                        <TimePicker
                        className="form-control"
                        label="Occurred Time"
                        value={Occuredtime}
                        onChange={(newValue) => setValueTime2(newValue)}
                        ampm={true} // Enable AM/PM format
                        views={['hours', 'minutes', 'seconds']} // Include seconds in the picker
                        format="hh:mm:ss A" // Custom format for time display
                        slotProps={{
                            textField: {
                            InputProps: {
                                sx: {
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none',
                                    borderBottom: '1px solid #737B7D',
                                    borderRadius: 0,
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderBottom: '1px solid #737B7D',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderBottom: '1px solid #737B7D',
                                    borderColor: '#737B7D',
                                },
                                },
                            },
                            },
                        }}
                        />
                    </DemoContainer>
                 </LocalizationProvider>
                </div>
                <div className="form_fields_right">
                  <TextField
                      id="standard-basic"
                      value={formData.fir_no}
                      onChange={(e) =>
                        setFormData({ ...formData, fir_no: e.target.value })
                      }
                      label="FIR No."
                      variant="standard"
                    />
                    {Sections.map((num, numI) => (
                      <>
                      
                      <div className="d-flex"> {/* Unique key for each field */}
                        <TextField
                          id="standard-basic" // Unique id for each field
                          className="form-control"
                          label="Sections"
                          value={num}
                          variant="standard"
                          onInput={(event) => {MultiSection(event, numI)}}
                        />
                        
                        {Sections.length > 1 && (
                          <button
                            className="btn btn-danger"
                            onClick={(e) => removeSections(numI, e)}
                          >
                            -
                          </button>
                        )}
                        {numI === Sections.length - 1 && (
                          <button
                            className="btn btn-primary"
                            id="button-addon2"
                            onClick={(e) => MultiSectionsAdd(e)}
                          >
                            +
                          </button>
                        )}
                      </div>                      
                      </>                      
                    ))
                  }
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            className="form-control"
                            label="Lodged Date"
                            value={Lodgedate}
                            format="DD/MM/YYYY"
                            onChange={(newValue) => setLodgedate(newValue)}
                            slotProps={{
                            textField: {
                                InputProps: {
                                sx: {
                                    '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none',
                                    borderBottom: '1px solid #737B7D',
                                    borderRadius: 0,
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderBottom: '1px solid #737B7D',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderBottom: '1px solid #737B7D',
                                    borderColor: '#737B7D',
                                    },
                                },
                                },
                            },
                            }}
                        />
                        </DemoContainer>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            className="form-control"
                            label="Occurred Date"
                            value={Occureddate}
                            format="DD/MM/YYYY"
                            onChange={(newValue) => setOccureddate(newValue)}
                            slotProps={{
                            textField: {
                                InputProps: {
                                sx: {
                                    '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none',
                                    borderBottom: '1px solid #737B7D',
                                    borderRadius: 0,
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderBottom: '1px solid #737B7D',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderBottom: '1px solid #737B7D',
                                    borderColor: '#737B7D',
                                    },
                                },
                                },
                            },
                            }}
                        />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
            </div>    

            <hr style={{ margin: "4rem 2rem" }} />
            <h2 className="heading_suspect_det">Accused Details</h2>
                {accused_details.map((accuse, i) => (
                  <>
              <div className="form_fields_div1">
                <div className="form_fields_left">

                    <TextField
                      id="standard-basic"
                      label="Name"
                      variant="standard"
                      value={accuse.accused_name}
                      onInput={(event) => handleRelativeInputs(event, i,"accused_name")}
                    />
                    <TextField
                      id="standard-basic"
                      label="Address"
                      variant="standard"
                      value={accuse.address}
                      onInput={(event) => handleRelativeInputs(event, i,"address")}
                    />
                    <TextField
                      id="standard-basic"
                      label="Profession"
                      variant="standard"
                      value={accuse.profession}
                      onInput={(event) => handleRelativeInputs(event, i,"profession")}
                    />

                    {accuse.phone.map((num, numI) => (
                      <>
                      
                      <div className="d-flex"> {/* Unique key for each field */}
                        <TextField
                          id="standard-basic" // Unique id for each field
                          className="form-control"
                          label="Phone Number"
                          value={num}
                          variant="standard"
                          inputProps={{ maxLength: 10 }} // Set maxLength to 10
                          onInput={(event) => {
                            const value = event.target.value;
                            if (/[^0-9]/.test(value)) {
                              event.target.value = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                            }
                            MultiPhone(event, numI, i);
                          }}
                        />
                        
                        {accuse.phone.length > 1 && (
                          <button
                            className="btn btn-danger"
                            onClick={(e) => removePhone(numI, e, i)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-minus-fill" viewBox="0 0 16 16">
                              <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877zM10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5"/>
                            </svg>
                          </button>
                        )}
                        {numI === accuse.phone.length - 1 && (
                          <button
                            className="btn btn-primary"
                            id="button-addon2"
                            onClick={(e) => MultiPhoneAdd(e, i)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-plus-fill" viewBox="0 0 16 16">
                              <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877zM12.5 1a.5.5 0 0 1 .5.5V3h1.5a.5.5 0 0 1 0 1H13v1.5a.5.5 0 0 1-1 0V4h-1.5a.5.5 0 0 1 0-1H12V1.5a.5.5 0 0 1 .5-.5"/>
                            </svg>
                          </button>
                        )}
                      </div>
                        {(num !== '' && num.length < 10) && (
                          <Stack direction="horizontal" gap={2}>
                            <Badge bg="danger">Enter Only 10 Digits</Badge>
                          </Stack>
                        )}
                      
                      </>
                      
                    ))
                  }
                     <TextField
                            id="standard-basic"
                            label="Aadhaar Number"
                            variant="standard"
                            inputProps={{ maxLength: 12 }} // Set maxLength to 12
                            value={accuse.aadhaar_no}
                          
                            onInput={(event) => {
                              const value = event.target.value;
                              if (/[^0-9]/.test(value)) {
                                event.target.value = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                              }
                              handleRelativeInputs(event, i,"aadhaar_no")
                            }}
                            
                          />
                          {(accuse.aadhaar_no !== '' && accuse.aadhaar_no.length < 12) && (
                            <Stack direction="horizontal" gap={2}>
                              <Badge bg="danger">Enter Only 12 Digits</Badge>
                            </Stack>
                          )}
          
                    <TextField
                      id="standard-basic"
                      label="PAN Number"
                      variant="standard"
                      value={accuse.pan_no.toLocaleUpperCase()}
                      onInput={(event) => handleRelativeInputs(event, i,"pan_no")}
                    />
                    {(!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(accuse.pan_no) && accuse.pan_no !== "") && (
                      <Stack direction="horizontal" gap={2}>
                        <Badge bg="danger">Please enter a valid PAN number (e.g., ABCDE1234F).</Badge>
                      </Stack>
                    )}
                    
                  
                </div>
                <div className="form_fields_right">
                <TextField
                      id="standard-basic"
                      label="dms_daw_id"
                      variant="standard"
                      value={accuse.dms_daw_id}
                      onInput={(event) => handleRelativeInputs(event, i,"dms_daw_id")}
                    />
                <TextField
                      id="standard-basic"
                      label="Age"
                      variant="standard"
                      value={accuse.age}
                      onInput={(event) => handleRelativeInputs(event, i,"age")}
                    />
                <TextField
                      id="standard-basic"
                      label="Education"
                      variant="standard"
                      value={accuse.education}
                      onInput={(event) => handleRelativeInputs(event, i,"education")}
                    />
                {accuse.email.map((mail, mailI) => (
                    <>
                      <div className="d-flex"> {/* Updated unique key */}
                        <TextField
                          id="standard-basic"
                          className="form-control"
                          label="Email Id"
                          value={mail}
                          variant="standard"
                          onInput={(event) => MultiEmail(event, mailI, i)}
                        />
                        {accuse.email.length > 1 && (
                          <button
                            className="btn btn-danger"
                            onClick={(e) => removeEmail(mailI, e, i)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-dash-fill" viewBox="0 0 16 16">
                              <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 4.697v4.974A4.5 4.5 0 0 0 12.5 8a4.5 4.5 0 0 0-1.965.45l-.338-.207z"/>
                              <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-5.5 0a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5"/>
                            </svg>
                          </button>
                        )}
                        {mailI === accuse.email.length - 1 && (
                          <button
                            className="btn btn-primary"
                            id="button-addon2"
                            onClick={(e) => MultiEmailAdd(e, i)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-plus-fill" viewBox="0 0 16 16">
                              <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 4.697v4.974A4.5 4.5 0 0 0 12.5 8a4.5 4.5 0 0 0-1.965.45l-.338-.207z"/>
                              <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5"/>
                            </svg>
                          </button>
                        )}
                      </div>
                      {(!emailPattern.test(mail) && mail !== '') && (
                        <Stack direction="horizontal" gap={2}>
                          <Badge id={mailI} bg="danger">Enter Valid Email Format (abc@xyz.com)</Badge>
                        </Stack>
                      )}
                    </>
                  ))
                }
                <TextField
                      id="standard-basic"
                      role="textarea"
                      label="Passport Number"
                      variant="standard"
                      value={accuse.passport_no}
                      onInput={(event) => handleRelativeInputs(event, i,"passport_no")}
                    />
                {renderDropField(
                    getRootProps,
                    getInputProps,
                    isDragActive,
                    "Upload Documents",
                    `${i}`
                  )}
                  <p className="text-sm text-gray-500" style={{
                      marginTop: '-30px',
                      color: "gray"
                  }}>
                      Attach file. File size of your documents should not exceed 10MB
                  </p>
                  {(alert2 === 'Path Fetched') ?  
                      (
                          <Box>
                              <Typography variant="h6">Uploaded Files:</Typography>
                              {renderFileList()}
                          </Box>
                      ) : (alert2 === 'Path Fetched Failed') && (
                          <Stack direction="horizontal">
                      <Badge bg="danger">File Upload Failed....!</Badge>
                    </Stack>
                      )}
                   <div style={{ marginLeft: "30rem" }}>
                        {accused_details.length > 1 && (
                          <button
                            style={{
                              width: "150px",
                              height: "39px", // Adjust height if needed
                              marginTop: "3rem",
                              borderRadius: "7.65px",
                              backgroundColor: "#ff0000",
                              color: "white",
                            }}
                            onClick={(e) => removeRelative(i, e)}
                          >
                            <PersonRemoveAlt1Icon /> Remove
                          </button>
                        )}
                        {i === accused_details.length - 1 && (
                          <div>
                            {(accuse.accused_name.length === 0) ? 
                            (<button
                              style={{
                                width: "150px",
                                height: "39px", // Adjust height if needed
                                // marginTop: "3rem",
                                marginLeft: "10px",
                                borderRadius: "7.65px",
                                backgroundColor: "rgb(204 213 225)",
                                color: "white",
                              }}
                              id="button-addon2"
                              disabled
                              onClick={handleRelativeAdd}
                            >
                              <PersonAddAlt1Icon /> Add Relative
                            </button>
                            
                            )
                                :

                                (<button
                                  style={{
                                    width: "150px",
                                    height: "39px", // Adjust height if needed
                                    // marginTop: "3rem",
                                    marginLeft: "10px",
                                    borderRadius: "7.65px",
                                    backgroundColor: "#022759",
                                    color: "white",
                                  }}
                                  id="button-addon2"
                                  onClick={handleRelativeAdd}
                                >
                                  <PersonAddAlt1Icon /> Add Accused
                                </button>)
                            }
                            {(accuse.accused_name.length === 0) && 
                               <Stack direction="horizontal" gap={2} className="mt-1">
                               <Badge bg="danger">At least Name Field Should Fill.</Badge>
                             </Stack>
                            }
                            
                          </div>
                        )}
                      </div>
                </div>
                  
                  
              </div>  
            </>
          ))}
          <hr style={{ margin: "4rem 2rem" }} />
          <h2 className="heading_suspect_det">Officer Notes & Additional Information</h2>
          <div className="form_fields_div1">
            <div className="form_fields_left">
              <TextareaAutosize aria-label="Enquiry Brief" 
              className="form-control" 
              placeholder="Enquiry Brief" 
              value={formData.enq_brief} 
              style={{
                border : 'none',
                borderBottom: '1px solid #737B7D',
                borderRadius: 0,
                borderColor: '#737B7D',
              }}
              onChange={(e) =>
                  setFormData({
                  ...formData,
                  enq_brief: e.target.value,
                  })
              }
              />
            </div>
            <div className="form_fields_right">

              <TextareaAutosize aria-label="Accused Status" 
              className="form-control" 
              style={{
                border : 'none',
                borderBottom: '1px solid #737B7D',
                borderRadius: 0,
                borderColor: '#737B7D',
              }}
              
              placeholder="Accused Status" 
              value={formData.accused_status} 
              onChange={(e) =>
                  setFormData({
                  ...formData,
                  accused_status: e.target.value,
                  })
              } 
              />
            </div>
          </div>
          <hr />
              <br />
          <div className="buttons">
            <button className="btn1_form" onClick={SaveAsDraft}>SAVE AS DRAFT</button>
              <button
                type="button"
                className="btn2_form"
                onClick={()=> Lodge_form()}
              >
                SUBMIT
              </button>
          </div>
            </div>
        </div>
        </>
    )
}
  export default Lodge_fir_form; 