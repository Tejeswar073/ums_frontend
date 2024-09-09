import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import "../../css/Discrete_Enquiry_Form.css";
import { basepath, getUsersList } from "../../config";
import { useNavigate } from 'react-router-dom';
import { Select, FormControl, MenuItem, InputLabel, OutlinedInput, Chip, TextField, Box, Typography } from '@mui/material';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TodayIcon from '@mui/icons-material/Today';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTheme } from '@mui/material/styles';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from "dayjs";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { useDropzone } from "react-dropzone";

import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import "../../css/Hoax_call.css";


  
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



const Hoax_Call_Form = ({ selectedEnquiry }) => {

    const [userList, setUserList] = useState([])
    async function getUsers() {
        setUserList(await getUsersList());
        console.log(userList,'/././/././../././mnmmnmn')
    }
    const theme = useTheme();


    const [To, setTO] = React.useState([]);
    const [CC, setCC] = React.useState([]);
    const [date, setDate] = useState('');
    const [callReceivedTime, setCallReceivedTime] = useState(null);
    const [callReceivedDate, setCallReceivedDate] = React.useState();
    const [preRegisteredTime, setPreRegisteredTime] = useState(null);
    const [preRegisteredDate, setPreRegisteredDate] = useState(null);
    const [crimeRegisteredDate, setCrimeRegisteredDate] = useState(null);
    const [crimeRegisteredTime, setCrimeRegisteredTime] = useState(null);
    const [userDetails, setUserDetails] = useState([]);
    const [Doc_type, setFilesField1] = useState([]);
    const [Photos, setFilesField2] = useState([]);
    const [Rel_photo, setFilesField3] = useState([]);
    const [uploadedFile, setUploadedFile] = useState([]);

    const handleChangeTo = (event) => {
        const {
            target: { value },
        } = event;
        setTO(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleChangeCC = (event) => {
        const {
            target: { value },
        } = event;
        setCC(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const navigate = useNavigate();

    useEffect(() => {
        setUserDetails(JSON.parse(localStorage.getItem('userData')));
        getUsers();
    }, [])

    const [formData, setFormData] = useState({
        status: "",
        tag: [],
        reject_reason: "",
        reference: "",
        date: '',
        enquiryOfficer: "",
        enquiredPlace: "",
        outwardNo: "",

        report_by: "",
        report_date: "",
        report_to: "",
        report_via: "",
        subject: "",

        hoax_call_rcvd_on: "",
        hoax_contact_no: "",
        hoax_call_location: "",
        hoax_call_rcvd_by: "",
        hoax_call_sdr: "",
        hoax_call_conversation: "",

        pre_crime_id: "",
        pre_crime_no: "",
        pre_crime_summary: "",
        unit_hoax_id: "",
        pre_crime_section: "",

        police_station: "",
        police_station_district: "",
        crime_id: "",
        crime_no: "",
        crime_section: "",
        police_station_city: "",
        police_station_state: "",
        crime_summary: "",
        documents: []
    });

    const handleBack = () => {
        navigate('/marvel/home')
    }
    const [alert1, setAlert] = useState('')
    async function handleFileUpload(files) {
        
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('doc_type', file);
        });

        try {
            const response = await fetch(basepath() + "/file_upload_handle", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const doc_path = await response.json();
                const uploadedFiles = doc_path['document_type'];
                console.log(uploadedFiles, "pathsof uploaded files..................................................")
                setFormData((prevData) => ({
                    ...prevData,
                    documents: uploadedFiles,
                }));
                setAlert('Path Fetched')
                console.log(uploadedFiles, 'Uploaded document paths');
            } else {
                setAlert('Path Fetched Failed')
                console.error('Failed to upload files:', response.statusText);
            }
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    }



    console.log(formData.date)

    async function hoax_call_form() {
        if (To.length === 0){
            return alert('Please Select "To" Field');
          }
        const responce = await fetch(basepath() + "/hoax", {
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

                report_by: formData.report_by,
                report_date: formData.report_date,
                report_to: formData.report_to,
                report_via: formData.report_via,
                subject: formData.subject,

                address_to: To,
                cc: CC,
                reference: formData.reference,
                enq_officer: formData.enquiryOfficer,
                date: date,
                enq_place: formData.enquiredPlace,
                outward_no: formData.outwardNo,

                hoax_call_rcvd_on: formData.hoax_call_rcvd_on,
                hoax_call_rcvd_date: callReceivedDate,
                hoax_call_rcvd_time: callReceivedTime,
                hoax_call_rcvd_by: formData.hoax_call_rcvd_by,
                hoax_contact_no: formData.hoax_contact_no,
                hoax_call_sdr: formData.hoax_call_sdr,
                hoax_call_location: formData.hoax_call_location,
                hoax_call_conversation: formData.hoax_call_conversation,


                pre_crime_id: formData.pre_crime_id,
                pre_crime_no: formData.pre_crime_no,
                pre_crime_summary: formData.pre_crime_summary,
                unit_hoax_id: formData.unit_hoax_id,
                pre_crime_section: formData.pre_crime_section,
                pre_crime_reg_time: preRegisteredTime,
                pre_crime_reg_date: preRegisteredDate,

                police_station: formData.police_station,
                police_station_district: formData.police_station_district,
                police_station_city: formData.police_station_city,
                police_station_state: formData.police_station_state,

                crime_id: formData.crime_id,
                crime_no: formData.crime_no,
                crime_reg_time: crimeRegisteredTime,
                crime_reg_date: crimeRegisteredDate,
                crime_summary: formData.crime_summary,
                crime_section: formData.crime_section,

                attachments: formData.documents
            }),
        });
        if (responce.ok) {
            const data = await responce.json();
            console.log(data);
            navigate('/marvel/home')
        }
    }



    /* Draft Func. */

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
                tag: formData.tag,
                reject_reason: formData.reject_reason,
                source_unit: userDetails.unit,

                report_by: formData.report_by,
                report_date: formData.report_date,
                report_to: formData.report_to,
                report_via: formData.report_via,
                subject: formData.subject,

                address_to: To,
                cc: CC,
                reference: formData.reference,
                enq_officer: formData.enquiryOfficer,
                date: date,
                enq_place: formData.enquiredPlace,
                outward_no: formData.outwardNo,

                hoax_call_rcvd_on: formData.hoax_call_rcvd_on,
                hoax_call_rcvd_date: callReceivedDate,
                hoax_call_rcvd_time: callReceivedTime,
                hoax_call_rcvd_by: formData.hoax_call_rcvd_by,
                hoax_contact_no: formData.hoax_contact_no,
                hoax_call_sdr: formData.hoax_call_sdr,
                hoax_call_location: formData.hoax_call_location,
                hoax_call_conversation: formData.hoax_call_conversation,


                pre_crime_id: formData.pre_crime_id,
                pre_crime_no: formData.pre_crime_no,
                pre_crime_summary: formData.pre_crime_summary,
                unit_hoax_id: formData.unit_hoax_id,
                pre_crime_section: formData.pre_crime_section,
                pre_crime_reg_time: preRegisteredTime,
                pre_crime_reg_date: preRegisteredDate,

                police_station: formData.police_station,
                police_station_district: formData.police_station_district,
                police_station_city: formData.police_station_city,
                police_station_state: formData.police_station_state,

                crime_id: formData.crime_id,
                crime_no: formData.crime_no,
                crime_reg_time: crimeRegisteredTime,
                crime_reg_date: crimeRegisteredDate,
                crime_summary: formData.crime_summary,
                crime_section: formData.crime_section,

                attachments: formData.documents
            }),
        });
        if (responce.ok) {
            const data = await responce.json();
            console.log(data);
            navigate('/marvel/home')

            //  if(editData !== ''){
            //    delete_draft(editData._id);
            //    requested_fun();
            //  }


        }
    }

    const {
        getRootProps: getRootProps3,
        getInputProps: getInputProps3,
        isDragActive: isDragActive3,
    } = useDropzone({
        onDrop: (acceptedFiles) => {
            setUploadedFile(prevFiles => [...prevFiles, ...acceptedFiles]);
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
    return (
        <>
            <div className="hoax_call_main_div">
                <Navbar />
                <div className="hoax_call_body">
                    <div className="form_top">
                        <div id="form_top_heading">
                            <ArrowBackIcon onClick={handleBack} style={{ cursor: "pointer" }} />
                            <div>
                                <p className="form_heading">{selectedEnquiry} Form</p>
                                <hr id="hr_d" />
                            </div>
                        </div>
                    </div>
                    <div className="form_fields_div1">
                        <div className="form_fields_left">
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
                                    <Stack direction="horizontal" className="mt-2">
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
                                onChange={(e) => setDate(e.target.value)}
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
                            <TextField
                                id="standard-basic"
                                value={formData.outwardNo}
                                onChange={(e) =>
                                    setFormData({ ...formData, outwardNo: e.target.value })
                                }
                                label="Outward No"
                                variant="standard"
                            />
                        </div>
                    </div>

                    <hr style={{ margin: "4rem 2rem" }} />
                    <h2 className="heading_suspect_det">Suspect Information</h2>

                    <div className="form_fields_div1">
                        <div className="form_fields_left">
                            <TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, hoax_call_rcvd_on: e.target.value })
                                }
                                label="Call Received On"
                                variant="standard"
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker
                                        label="Call Received Time"
                                        value={callReceivedTime}
                                        onChange={(newTime) => setCallReceivedTime(newTime)}
                                        className="form-control"
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
                            <TextField
                                id="standard-basic"
                                className="form-control"
                                label="Contact Number"
                                variant="standard"
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, ""); // Remove any non-digit characters
                                    if (value.length <= 10) {
                                        setFormData({ ...formData, hoax_contact_no: value });
                                    }
                                }}
                                value={formData.hoax_contact_no} // Ensure the input field value is controlled
                                inputProps={{
                                    maxLength: 10, // Restrict length to 10 digits
                                }}
                            />
                            <TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, hoax_call_location: e.target.value })
                                }
                                label="Call Location"
                                variant="standard"
                            />

                        </div>
                        <div className="form_fields_right">
                        <TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, hoax_call_rcvd_by: e.target.value })
                                }
                                label="Call Received By"
                                variant="standard"
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        className="form-control"
                                        label="Call Received Date"
                                        value={callReceivedDate}
                                        format="DD/MM/YYYY"
                                        onChange={(newValue) => setCallReceivedDate(newValue)}
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
                            
                            <TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, hoax_call_sdr: e.target.value })
                                }
                                label="Call SDR"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, hoax_call_conversation: e.target.value })
                                }
                                label="Call Conversation"
                                variant="standard"
                            />
                        </div>
                    </div>

                    <hr style={{ margin: "4rem 2rem" }} />
                    <h2 className="heading_suspect_det">Pre Crime Information</h2>

                    <div className="form_fields_div1">
                        <div className="form_fields_left">
                            <TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, pre_crime_id: e.target.value })
                                }
                                label="Pre ID"
                                variant="standard"
                            />

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker
                                        label="Pre Registered Time"
                                        value={preRegisteredTime}
                                        onChange={(newTime) => setPreRegisteredTime(newTime)}
                                        className="form-control"
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
                            <TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, pre_crime_summary: e.target.value })
                                }
                                label="Pre Crime Summary"
                                variant="standard"
                            />
                        </div>

                        <div className="form_fields_right">
                            <TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, unit_hoax_id: e.target.value })
                                }
                                label="Unit Hoax ID"
                                variant="standard"
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        className="form-control"
                                        label="Pre Registered Date"
                                        value={preRegisteredDate}
                                        format="DD/MM/YYYY"
                                        onChange={(newValue) => setPreRegisteredDate(newValue)}
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
                            <TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, pre_crime_section: e.target.value })
                                }
                                label="Pre Crime Section"
                                variant="standard"
                            />
                        </div>
                    </div>

                    <hr style={{ margin: "4rem 2rem" }} />
                    <h2 className="heading_suspect_det">Station Information</h2>

                    <div className="form_fields_div1">
                        <div className="form_fields_left">
                            

                            <TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, police_station: e.target.value })
                                }
                                label="Police Station"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, police_station_district: e.target.value })
                                }
                                label="District"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, crime_id: e.target.value })
                                }
                                label="Crime ID"
                                variant="standard"
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker
                                        label="Crime Registered Time"
                                        value={crimeRegisteredTime}
                                        onChange={(newTime) => setCrimeRegisteredTime(newTime)}
                                        className="form-control"
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
                            <TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, crime_section: e.target.value })
                                }
                                label="Crime Section"
                                variant="standard"
                            />

                        </div>
                        <div className="form_fields_right">
                            
                            <TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, police_station_city: e.target.value })
                                }
                                label="City"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, police_station_state: e.target.value })
                                }
                                label="State"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, crime_no: e.target.value })
                                }
                                label="Crime Number"
                                variant="standard"
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        className="form-control"
                                        label="Crime Registered Date"
                                        value={crimeRegisteredDate}
                                        format="DD/MM/YYYY"
                                        onChange={(newValue) => setCrimeRegisteredDate(newValue)}
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
                            
                            <TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, age: e.target.value })
                                }
                                label="Crime Summary"
                                variant="standard"
                            />
                        </div>
                    </div>

                    <div className="form_fields_div1">
                        <div className="form_fields_left">
                            {renderDropField(
                                getRootProps3,
                                getInputProps3,
                                isDragActive3,
                                "Attachments"
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
                    </div>

                    <div className="buttons">
                        <button className="btn1_form" onClick={Draft_form}>SAVE AS DRAFT</button>
                        <button className="btn2_form" onClick={hoax_call_form}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hoax_Call_Form