import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import "../../css/Discrete_Enquiry_Form.css";
import { basepath,getUsersList } from "../../config";
import { useNavigate } from 'react-router-dom';
import TodayIcon from '@mui/icons-material/Today';

import { Select, FormControl, MenuItem, InputLabel, OutlinedInput, Chip, TextField, Box } from '@mui/material';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTheme } from '@mui/material/styles';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from "dayjs";
import { useDropzone } from "react-dropzone";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import Typography from '@mui/material/Typography';
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



const ICP_Form = ({ selectedEnquiry }) => {
    const [userList, setUserList] = useState([])

    const theme = useTheme();
    const [To, setTO] = React.useState([]);
    const [CC, setCC] = React.useState([]);
    const [date, setDate] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [reportDate, setReportDate] = useState(null);
    const [userDetails, setUserDetails] = useState([]);
    const [isValid, setIsValid] = useState(true); // State to track validity
    const [uploadedFile, setUploadedFile] = useState([]);
    const [uploadedFile2, setUploadedFile2] = useState([]);


    const handleChange = (e) => {
        const value = e.target.value.toUpperCase(); // Convert to uppercase to ensure consistency
        const regex = /^[A-Z]{5}[0-9]{4}[A-Z]$/; // PAN-like format: 5 letters, 4 digits, 1 letter

        // Update state only if the length is 10 or less
        if (value.length <= 10) {
            setFormData({ ...formData, pan_no: value });

            // Check validity and set the isValid state
            setIsValid(regex.test(value));
        }
    };

    async function getUsers() {
        setUserList(await getUsersList());
        console.log(userList,'/././/././../././mnmmnmn')
      }

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
        outwardNo: "",

        icp_id: "",
        report_to: "",
        subject: "",
        name: "",
        address: "",

        district: "",
        state: "",
        pan_no: "",
        passport_no: "",
        visa: "",
        travel_reason: "",

        travelling_route: "",
        icp_number: "",


        report_by: "",
        report_via: "",
        serial_no: "",

        pin: "",
        city: "",
        aadhaar_no: "",
        passport_validity: "",
        date_of_departure: "",
        travelled_address: "",
        ec_reason: "",
        attachments: [],
        photos: []

    });

    const handleBack = () => {
        navigate('/marvel/home')
    }



    const [alert1, setAlert] = useState('')
    const [alert2, setAlert2] = useState('')

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
                const data = await response.json();
                const uploadedFiles = data['document_type'];
                setAlert('Path Fetched')
                setFormData((prevData) => ({
                    ...prevData,
                    attachments:  uploadedFiles,
                }));
            } else {
                setAlert('Path Fetched Failed')
                console.error('Failed to upload files:', response.statusText);
            }
        } catch (error) {
            setAlert('Path Fetched Failed')
            console.error('Error uploading files:', error);
        }
    }
    async function handleFileUpload2(files) {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('photos', file);
        });

        try {
            const response = await fetch(basepath() + "/file_upload_handle", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                const uploadedFiles = data['photos'];
                setAlert2('Path Fetched')
                setFormData((prevData) => ({
                    ...prevData,
                    photos:  uploadedFiles,
                }));
            } else {
                setAlert2('Path Fetched Failed')
                console.error('Failed to upload files:', response.statusText);
            }
        } catch (error) {
            setAlert2('Path Fetched Failed')
            console.error('Error uploading files:', error);
        }
    }

    async function ICP_Form() {
        if (To.length === 0){
            return alert('Please Select "To" Field');
          }
        const responce = await fetch(basepath() + "/icp", {
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

                address_to: To,
                cc: CC,
                reference: formData.reference,
                date: date,
                outward_no: formData.outwardNo,

                icp_id: formData.icp_id,
                report_to: formData.report_to,
                subject: formData.subject,
                name: formData.name,
                address: formData.address,

                district: formData.district,
                state: formData.state,
                pan_no: formData.pan_no,
                passport_no: formData.passport_no,
                visa: formData.visa,
                travel_reason: formData.travel_reason,

                travelling_route: formData.travelling_route,
                icp_number: formData.icp_number,


                report_by: formData.report_by,
                report_via: formData.report_via,
                serial_no: formData.serial_no,

                pin: formData.pin,
                city: formData.city,
                aadhaar_no: formData.aadhaar_no,
                passport_validity: formData.passport_validity,
                date_of_departure: formData.date_of_departure,
                travelled_address: formData.travelled_address,
                ec_reason: formData.ec_reason,
                icp_report_upload: formData.attachments,
                photos: formData.photos
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

                address_to: To,
                cc: CC,
                reference: formData.reference,
                date: date,
                outward_no: formData.outwardNo,

                icp_id: formData.icp_id,
                report_to: formData.report_to,
                subject: formData.subject,
                name: formData.name,
                address: formData.address,

                district: formData.district,
                state: formData.state,
                pan_no: formData.pan_no,
                passport_no: formData.passport_no,
                visa: formData.visa,
                travel_reason: formData.travel_reason,

                travelling_route: formData.travelling_route,
                icp_number: formData.icp_number,


                report_by: formData.report_by,
                report_via: formData.report_via,
                serial_no: formData.serial_no,

                pin: formData.pin,
                city: formData.city,
                aadhaar_no: formData.aadhaar_no,
                passport_validity: formData.passport_validity,
                date_of_departure: formData.date_of_departure,
                travelled_address: formData.travelled_address,
                ec_reason: formData.ec_reason,
                icp_report_upload: formData.attachments,
                photos: formData.photos
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

    // Dropzone for Photos
    const {
        getRootProps: getRootPropsPhotos,
        getInputProps: getInputPropsPhotos,
        isDragActive: isDragActivePhotos,
    } = useDropzone({
        onDrop: (acceptedFiles) => {
            setUploadedFile2(prevFiles => [...prevFiles, ...acceptedFiles]);
            handleFileUpload2(acceptedFiles); // Pass the field name for Photos
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

            {(label === "Upload Documents") && 
                <input {...getInputProps()} />
            }
            {(label === "Photos") &&  
                <input {...getInputProps()}/>
            }
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
    const renderFileList2 = () => (
        <List>
            {uploadedFile2.map((file, index) => (
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
                    <h2 className="heading_suspect_det">Suspect Details</h2>

                    <div className="form_fields_div1">
                        <div className="form_fields_left">
                            <TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, icp_id: e.target.value })
                                }
                                label="ID"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, report_to: e.target.value })
                                }
                                label="Report To"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, subject: e.target.value })
                                }
                                label="Subject"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                label="Name"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, address: e.target.value })
                                }
                                label="Address"
                                variant="standard"
                            /><TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, district: e.target.value })
                                }
                                label="District"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, state: e.target.value })
                                }
                                label="State"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                className="form-control"
                                label="PAN Number"
                                variant="standard"
                                value={formData.pan_no}
                                onChange={handleChange}
                                inputProps={{
                                    maxLength: 10,
                                    spellCheck: false,
                                }}
                                // Conditionally apply the error style
                                style={{
                                    color: isValid ? '' : 'red',
                                }}
                                helperText={!isValid ? "Format should be 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)" : ""}
                                FormHelperTextProps={{
                                    sx: { color: !isValid ? 'red' : 'inherit' }, // Conditionally change helper text color
                                }}
                            />
                            <TextField
                                id="standard-basic"
                                onChange={(e) => {
                                    const value = e.target.value; // Remove any non-digit characters
                                    if (value.length <= 12) {
                                        setFormData({ ...formData, passport_no: value });
                                    }
                                }
                                }
                                inputProps={{
                                    maxLength: 12, // Restrict length to 10 digits
                                }}
                                label="Passport Number"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, visa: e.target.value })
                                }
                                label="Visa Number"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, travel_reason: e.target.value })
                                }
                                label="Travel Reason"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, travelling_route: e.target.value })
                                }
                                label="Travel Route"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, icp_number: e.target.value })
                                }
                                label="ICP Number"
                                variant="standard"
                            />
                        </div>
                        <div className="form_fields_right">
                            <TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, report_by: e.target.value })
                                }
                                label="Report By"
                                variant="standard"
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        className="form-control"
                                        label="Report Date"
                                        value={reportDate}
                                        format="DD/MM/YYYY"
                                        onChange={(newValue) => setReportDate(newValue)}
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
                                    setFormData({ ...formData, report_via: e.target.value })
                                }
                                label="Report Via"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, serial_no: e.target.value })
                                }
                                label="List Serial Number"
                                variant="standard"
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        className="form-control"
                                        label="DOB"
                                        value={dateOfBirth}
                                        format="DD/MM/YYYY"
                                        onChange={(newValue) => setDateOfBirth(newValue)}
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
                                    setFormData({ ...formData, pin: e.target.value })
                                }
                                label="PIN"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, city: e.target.value })
                                }
                                label="City"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                className="form-control"
                                label="UID Number"
                                variant="standard"
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, ""); // Remove any non-digit characters
                                    if (value.length <= 12) {
                                        setFormData({ ...formData, aadhaar_no: value });
                                    }
                                }}
                                value={formData.aadhaar_no} // Ensure the input field value is controlled
                                inputProps={{
                                    maxLength: 12, // Restrict length to 10 digits
                                }}
                            />
                            {renderDropField(
                                getRootPropsPhotos,
                                getInputPropsPhotos,
                                isDragActivePhotos,
                                "Photos"
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
                                        {renderFileList2()}
                                    </Box>
                                ) : (alert1 === 'Path Fetched Failed') && (
                                    <Stack direction="horizontal">
                               <Badge bg="danger">File Upload Failed....!</Badge>
                             </Stack>
                                )}
                            <TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, passport_validity: e.target.value })
                                }
                                label="Passport Validity"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, date_of_departure: e.target.value })
                                }
                                label="Date of Departure"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, travelled_address: e.target.value })
                                }
                                label="Travelled Address"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                onChange={(e) =>
                                    setFormData({ ...formData, ec_reason: e.target.value })
                                }
                                label="Reason"
                                variant="standard"
                            />
                            {renderDropField(
                                getRootProps3,
                                getInputProps3,
                                isDragActive3,
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
                    </div>
                    <div className="buttons">
                        <button className="btn1_form" onClick={Draft_form}>SAVE AS DRAFT</button>
                        <button className="btn2_form" onClick={ICP_Form}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ICP_Form