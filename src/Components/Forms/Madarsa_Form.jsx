import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import "../../css/Discrete_Enquiry_Form.css";
import { basepath, getUsersList } from "../../config";
import { useNavigate } from 'react-router-dom';
import { Select, FormControl, MenuItem, InputLabel, OutlinedInput, Chip, TextField, Box, Typography } from '@mui/material';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import TodayIcon from '@mui/icons-material/Today';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTheme } from '@mui/material/styles';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from "dayjs";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import { useDropzone } from "react-dropzone";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

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



const Madarsa_Form = ({ selectedEnquiry }) => {

    const theme = useTheme();

    const [userList, setUserList] = useState([])

    const [To, setTO] = React.useState([]);
    const [CC, setCC] = React.useState([]);
    const [date, setDate] = React.useState('');
    const [callReceivedTime, setCallReceivedTime] = useState(null);
    const [callReceivedDate, setCallReceivedDate] = React.useState();
    const [preRegisteredTime, setPreRegisteredTime] = useState(null);
    const [preRegisteredDate, setPreRegisteredDate] = useState(null);
    const [crimeRegisteredDate, setCrimeRegisteredDate] = useState(null);
    const [crimeRegisteredTime, setCrimeRegisteredTime] = useState(null);
    const [userDetails, setUserDetails] = useState([]);
    const [uploadedFile, setUploadedFile] = useState([]);
    const [students_details, setStudents_details] = useState(['']);

    async function getUsers() {
        setUserList(await getUsersList());
        console.log(userList,'/././/././../././mnmmnmn')
      }
    const [alert1, setAlert] = useState('')
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

        report_type                : '',
        outward_no                 : '',
        reference                  : '',
        enq_officer                : '',
        date                       : '',
        religion_id                : '',
        religion_name              : '',
        sect_id                    : '',
        sect_name                  : '',
        report_by                  : '',
        report_date                : '',
        report_to                  : '',
        report_via                 : '',
        subject                    : '',
        faculty_id                 : '',
        faculty_name               : '',
        faculty_address            : '',
        faculty_city               : '',
        faculty_district           : '',
        faculty_state              : '',
        faculty_country            : '',
        faculty_contact_details    : '',
        faculty_email              : '',
        faculty_education          : '',
        faculty_passport_no        : '',
        faculty_uid_no             : '',
        faculty_pan                : '',
        madarasa_id                : '',
        madarasa_name              : '',
        madarasa_address1          : '',
        madarasa_address2          : '',
        madarasa_city              : '',
        madarasa_pin               : '',
        madarasa_district          : '',
        madarasa_state             : '',
        madarasa_pstn              : '',
        madarasa_reg_no            : '',
        madarasa_contact_nos       : '',
        madarasa_lat_long          : '',
        madarasa_email             : '',
        madarasa_website           : '',
        madarasa_cctv_details      : '',
        education_type_given       : '',
        students_details           : [''],
        funding_by                 : '',
        bank_details               : '',
        disputed_details           : '',

        attachments                : [],

    });

    const handleBack = () => {
        navigate('/marvel/home')
    }
 /* For Students Multi */
const MultiPhone = (event, i) => {
    const updatedDetails = [...students_details];
    updatedDetails[index] = event.target.value;
    setStudents_details(updatedDetails);
};

const removePhone = (event, i) => {
    event.preventDefault();
    const updatedDetails = [...students_details];
    updatedDetails.splice(i, 1); // Remove the item
    setStudents_details(updatedDetails);
};

const MultiPhoneAdd = (event) => {
    event.preventDefault(); 
    setStudents_details([...students_details, '']); // Add a new empty email);
};
    

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
                    attachments: uploadedFiles,
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

    async function madarasa_form() {
        if (To.length === 0){
            return alert('Please Select "To" Field');
          }
        const responce = await fetch(basepath() + "/madarasa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                enquiry                    : selectedEnquiry,
                user_name                  : userDetails.officername,
                user_email                 : userDetails.email,
                designation                : userDetails.designation,
                created_date               : formattedDate,
                source_unit                : userDetails.unit,
                address_to                 : To,
                cc                         : CC,
                report_type                : selectedEnquiry,
                report_date                : preRegisteredDate,
                date                       : date,
                students_details           : students_details,

                outward_no                 : formData.outward_no,
                reference                  : formData.reference,
                enq_officer                : formData.enq_officer,
                religion_id                : formData.religion_id,
                sect_id                    : formData.sect_id,
                religion_name              : formData.religion_name          ,
                sect_name                  : formData.sect_name              ,
                report_by                  : formData.report_by              ,
                report_to                  : formData.report_to              ,
                report_via                 : formData.report_via             ,
                subject                    : formData.subject                ,
                faculty_id                 : formData.faculty_id             ,
                faculty_name               : formData.faculty_name           ,
                faculty_address            : formData.faculty_address        ,
                faculty_city               : formData.faculty_city           ,
                faculty_district           : formData.faculty_district       ,
                faculty_state              : formData.faculty_state          ,
                faculty_country            : formData.faculty_country        ,
                faculty_contact_details    : formData.faculty_contact_details,
                faculty_email              : formData.faculty_email          ,
                faculty_education          : formData.faculty_education      ,
                faculty_passport_no        : formData.faculty_passport_no    ,
                faculty_uid_no             : formData.faculty_uid_no         ,
                faculty_pan                : formData.faculty_pan            ,
                madarasa_id                : formData.madarasa_id            ,
                madarasa_name              : formData.madarasa_name          ,
                madarasa_address1          : formData.madarasa_address1      ,
                madarasa_address2          : formData.madarasa_address2      ,
                madarasa_city              : formData.madarasa_city          ,
                madarasa_pin               : formData.madarasa_pin           ,
                madarasa_district          : formData.madarasa_district      ,
                madarasa_state             : formData.madarasa_state         ,
                madarasa_pstn              : formData.madarasa_pstn          ,
                madarasa_reg_no            : formData.madarasa_reg_no        ,
                madarasa_contact_nos       : formData.madarasa_contact_nos   ,
                madarasa_lat_long          : formData.madarasa_lat_long      ,
                madarasa_email             : formData.madarasa_email         ,
                madarasa_website           : formData.madarasa_website       ,
                madarasa_cctv_details      : formData.madarasa_cctv_details  ,
                education_type_given       : formData.education_type_given   ,
                funding_by                 : formData.funding_by      ,
                bank_details               : formData.bank_details    ,
                disputed_details           : formData.disputed_details,
                attachments                : formData.attachments,

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
                enquiry                    : selectedEnquiry,
                user_name                  : userDetails.officername,
                user_email                 : userDetails.email,
                designation                : userDetails.designation,
                created_date               : formattedDate,
                source_unit                : userDetails.unit,
                address_to                 : To,
                cc                         : CC,
                report_type                : selectedEnquiry,
                report_date                : preRegisteredDate,
                date                       : date,
                students_details           : students_details,

                outward_no                 : formData.outward_no,
                reference                  : formData.reference,
                enq_officer                : formData.enq_officer,
                religion_id                : formData.religion_id,
                sect_id                    : formData.sect_id,
                religion_name              : formData.religion_name          ,
                sect_name                  : formData.sect_name              ,
                report_by                  : formData.report_by              ,
                report_to                  : formData.report_to              ,
                report_via                 : formData.report_via             ,
                subject                    : formData.subject                ,
                faculty_id                 : formData.faculty_id             ,
                faculty_name               : formData.faculty_name           ,
                faculty_address            : formData.faculty_address        ,
                faculty_city               : formData.faculty_city           ,
                faculty_district           : formData.faculty_district       ,
                faculty_state              : formData.faculty_state          ,
                faculty_country            : formData.faculty_country        ,
                faculty_contact_details    : formData.faculty_contact_details,
                faculty_email              : formData.faculty_email          ,
                faculty_education          : formData.faculty_education      ,
                faculty_passport_no        : formData.faculty_passport_no    ,
                faculty_uid_no             : formData.faculty_uid_no         ,
                faculty_pan                : formData.faculty_pan            ,
                madarasa_id                : formData.madarasa_id            ,
                madarasa_name              : formData.madarasa_name          ,
                madarasa_address1          : formData.madarasa_address1      ,
                madarasa_address2          : formData.madarasa_address2      ,
                madarasa_city              : formData.madarasa_city          ,
                madarasa_pin               : formData.madarasa_pin           ,
                madarasa_district          : formData.madarasa_district      ,
                madarasa_state             : formData.madarasa_state         ,
                madarasa_pstn              : formData.madarasa_pstn          ,
                madarasa_reg_no            : formData.madarasa_reg_no        ,
                madarasa_contact_nos       : formData.madarasa_contact_nos   ,
                madarasa_lat_long          : formData.madarasa_lat_long      ,
                madarasa_email             : formData.madarasa_email         ,
                madarasa_website           : formData.madarasa_website       ,
                madarasa_cctv_details      : formData.madarasa_cctv_details  ,
                education_type_given       : formData.education_type_given   ,
                funding_by                 : formData.funding_by      ,
                bank_details               : formData.bank_details    ,
                disputed_details           : formData.disputed_details,
                attachments                : formData.attachments,
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
                                value={formData.enq_officer}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        enq_officer: e.target.value,
                                    })
                                }
                                label="Enquiry Officer"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                value={formData.outward_no}
                                onChange={(e) =>
                                    setFormData({ ...formData, outward_no: e.target.value })
                                }
                                label="Outward No"
                                variant="standard"
                            />
                        </div>
                    </div>

                    <hr style={{ margin: "4rem 2rem" }} />
                    <h2 className="heading_suspect_det">Religion and Section Details</h2>

                    <div className="form_fields_div1">
                        <div className="form_fields_left">
                            <TextField
                                id="standard-basic"
                                value={formData.religion_id}
                                onChange={(e) =>
                                    setFormData({ ...formData, religion_id: e.target.value })
                                }
                                label="Religion Id"
                                variant="standard"
                            />
                            
                            <TextField
                                id="standard-basic"
                                value={formData.sect_id}
                                onChange={(e) =>
                                    setFormData({ ...formData, sect_id: e.target.value })
                                }
                                label="Section Id"
                                variant="standard"
                            />

                        </div>
                        <div className="form_fields_right">
                        <TextField
                                id="contact-number"
                                value={formData.religion_name}
                                onChange={(e) =>
                                    setFormData({ ...formData, religion_name: e.target.value })
                                }
                                label="Religion Name"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                value={formData.sect_name}
                                onChange={(e) =>
                                    setFormData({ ...formData, sect_name: e.target.value })
                                }
                                label="Section Name"
                                variant="standard"
                            />
                        </div>
                    </div>

                    <hr style={{ margin: "4rem 2rem" }} />
                    <h2 className="heading_suspect_det">Reporting Details</h2>

                    <div className="form_fields_div1">
                        <div className="form_fields_left">
                            <TextField
                                id="standard-basic"
                                value={formData.report_by}
                                onChange={(e) =>
                                    setFormData({ ...formData, report_by: e.target.value })
                                }
                                label="Report by"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                value={formData.report_to}
                                onChange={(e) =>
                                    setFormData({ ...formData, report_to: e.target.value })
                                }
                                label="Report To"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                value={formData.subject}
                                onChange={(e) =>
                                    setFormData({ ...formData, subject: e.target.value })
                                }
                                label="Subject"
                                variant="standard"
                            />
                        </div>

                        <div className="form_fields_right">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        className="form-control"
                                        label="Report Date"
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
                                value={formData.report_via}
                                onChange={(e) =>
                                    setFormData({ ...formData, report_via: e.target.value })
                                }
                                label="Report Via"
                                variant="standard"
                            />
                            
                        </div>
                    </div>

                    <hr style={{ margin: "4rem 2rem" }} />
                    <h2 className="heading_suspect_det">Faculty Details</h2>

                    <div className="form_fields_div1">
                        <div className="form_fields_left">
                            <TextField
                                id="standard-basic"
                                value={formData.faculty_id}
                                onChange={(e) =>
                                    setFormData({ ...formData, faculty_id: e.target.value })
                                }
                                label="Id"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                value={formData.faculty_name}
                                onChange={(e) =>
                                    setFormData({ ...formData, faculty_name: e.target.value })
                                }
                                label="Name"
                                variant="standard"
                            />
            
                            <TextField
                                id="standard-basic"
                                value={formData.faculty_address}
                                onChange={(e) =>
                                    setFormData({ ...formData, faculty_address: e.target.value })
                                }
                                label="Address"
                                variant="standard"
                            />

                            <TextField
                                id="standard-basic"
                                value={formData.faculty_city}
                                onChange={(e) =>
                                    setFormData({ ...formData, faculty_city: e.target.value })
                                }
                                label="City"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                value={formData.faculty_state}
                                onChange={(e) =>
                                    setFormData({ ...formData, faculty_state: e.target.value })
                                }
                                label="State"
                                variant="standard"
                            />
                            
                            <TextField
                                id="standard-basic"
                                value={formData.faculty_country}
                                onChange={(e) =>
                                    setFormData({ ...formData, faculty_country: e.target.value })
                                }
                                label="Country"
                                variant="standard"
                            />
                        </div>
                        <div className="form_fields_right">
                            <TextField
                                id="standard-basic"
                                value={formData.faculty_contact_details}
                                onChange={(e) =>
                                    setFormData({ ...formData, faculty_contact_details: e.target.value })
                                }
                                label="Contact Details"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                value={formData.faculty_email}
                                onChange={(e) =>
                                    setFormData({ ...formData, faculty_email: e.target.value })
                                }
                                label="Email"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                value={formData.faculty_education}
                                onChange={(e) =>
                                    setFormData({ ...formData, faculty_education: e.target.value })
                                }
                                label="Education"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                value={formData.faculty_passport_no}
                                onChange={(e) =>
                                    setFormData({ ...formData, faculty_passport_no: e.target.value })
                                }
                                label="Passport Number"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                value={formData.faculty_uid_no}
                                type="number"
                                onChange={(e) =>
                                    setFormData({ ...formData, faculty_uid_no: e.target.value })
                                }
                                label="Aadhaar Number"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                value={formData.faculty_pan}
                                onChange={(e) =>
                                    setFormData({ ...formData, faculty_pan: e.target.value })
                                }
                                label="PAN Number"
                                variant="standard"
                            />
                        </div>
                    </div>
                    <hr style={{ margin: "4rem 2rem" }} />
                    <h2 className="heading_suspect_det">Madarsa Details</h2>

                    <div className="form_fields_div1">
                        <div className="form_fields_left">
                            <TextField
                                id="standard-basic"
                                value={formData.madarasa_id}
                                onChange={(e) =>
                                    setFormData({ ...formData, madarasa_id: e.target.value })
                                }
                                label="Madarsa Id"
                                variant="standard"
                            />

                            <TextField
                                id="standard-basic"
                                value={formData.madarasa_name}
                                onChange={(e) =>
                                    setFormData({ ...formData, madarasa_name: e.target.value })
                                }
                                label="Name"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                value={formData.madarasa_address1}
                                onChange={(e) =>
                                    setFormData({ ...formData, madarasa_address1: e.target.value })
                                }
                                label="Madarsa Address 1"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                value={formData.madarasa_address2}
                                onChange={(e) =>
                                    setFormData({ ...formData, madarasa_address2: e.target.value })
                                }
                                label="Madarsa Address 2"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                value={formData.madarasa_city}
                                onChange={(e) =>
                                    setFormData({ ...formData, madarasa_city: e.target.value })
                                }
                                label="City"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                type="number"
                                value={formData.madarasa_pin}
                                onChange={(e) =>
                                    setFormData({ ...formData, madarasa_pin: e.target.value })
                                }
                                label="PIN"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                value={formData.madarasa_district}
                                onChange={(e) =>
                                    setFormData({ ...formData, madarasa_district: e.target.value })
                                }
                                label="District"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                value={formData.madarasa_state}
                                onChange={(e) =>
                                    setFormData({ ...formData, madarasa_state: e.target.value })
                                }
                                label="State"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                value={formData.madarasa_pstn}
                                onChange={(e) =>
                                    setFormData({ ...formData, madarasa_pstn: e.target.value })
                                }
                                label="Madarsa Pstn"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                value={formData.madarasa_reg_no}
                                onChange={(e) =>
                                    setFormData({ ...formData, madarasa_reg_no: e.target.value })
                                }
                                label="Madarsa Reg. Number"
                                variant="standard"
                            />
                        </div>
                        <div className="form_fields_right">
                            <TextField
                                id="standard-basic"
                                value={formData.madarasa_contact_nos}
                                onChange={(e) =>
                                    setFormData({ ...formData, madarasa_contact_nos: e.target.value })
                                }
                                label="Contact Number"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                value={formData.madarasa_lat_long}
                                onChange={(e) =>
                                    setFormData({ ...formData, madarasa_lat_long: e.target.value })
                                }
                                label="Lat - Long"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                value={formData.madarasa_email}
                                onChange={(e) =>
                                    setFormData({ ...formData, madarasa_email: e.target.value })
                                }
                                label="Email"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                value={formData.madarasa_website}
                                onChange={(e) =>
                                    setFormData({ ...formData, madarasa_website: e.target.value })
                                }
                                label="Website"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                value={formData.madarasa_cctv_details}
                                onChange={(e) =>
                                    setFormData({ ...formData, madarasa_cctv_details: e.target.value })
                                }
                                label="CCTV Details"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                value={formData.education_type_given}
                                onChange={(e) =>
                                    setFormData({ ...formData, education_type_given: e.target.value })
                                }
                                label="Education Type"
                                variant="standard"
                            />
                    {students_details.map((num, numI) => (
                      <>
                      
                      <div className="d-flex"> {/* Unique key for each field */}
                        <TextField
                          id="standard-basic" // Unique id for each field
                          className="form-control"
                          label="Phone Number"
                          value={num}
                          variant="standard"
                          onInput={(event) => {
                            MultiPhone(event, numI);
                          }}
                        />
                        
                        {students_details.length > 1 && (
                          <button
                            className="btn btn-danger"
                            onClick={(e) => removePhone(e, numI)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-minus-fill" viewBox="0 0 16 16">
                              <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877zM10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5"/>
                            </svg>
                          </button>
                        )}
                        {numI === students_details.length - 1 && (
                          <button
                            className="btn btn-primary"
                            id="button-addon2"
                            onClick={(e) => MultiPhoneAdd(e,numI)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-plus-fill" viewBox="0 0 16 16">
                              <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877zM12.5 1a.5.5 0 0 1 .5.5V3h1.5a.5.5 0 0 1 0 1H13v1.5a.5.5 0 0 1-1 0V4h-1.5a.5.5 0 0 1 0-1H12V1.5a.5.5 0 0 1 .5-.5"/>
                            </svg>
                          </button>
                        )}
                      </div>                      
                      </>
                      
                    ))
                  }
                            <TextField
                                id="standard-basic"
                                value={formData.funding_by}
                                onChange={(e) =>
                                    setFormData({ ...formData, funding_by: e.target.value })
                                }
                                label="Funding By"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                value={formData.bank_details}
                                onChange={(e) =>
                                    setFormData({ ...formData, bank_details: e.target.value })
                                }
                                label="Bank Details"
                                variant="standard"
                            />
                            <TextField
                                id="standard-basic"
                                value={formData.disputed_details}
                                onChange={(e) =>
                                    setFormData({ ...formData, disputed_details: e.target.value })
                                }
                                label="Disputed Details"
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
                        <button className="btn2_form" onClick={madarasa_form}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Madarsa_Form