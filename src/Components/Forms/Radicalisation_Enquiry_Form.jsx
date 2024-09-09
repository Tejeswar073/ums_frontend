import React, { useCallback, useRef, useState, useEffect } from "react";
import Navbar from "../Navbar";
import "../../css/Discrete_Enquiry_Form.css";
import { basepath, getUsersList } from "../../config";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  MenuItem,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  Radio,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Chip,
} from "@mui/material";
import TodayIcon from '@mui/icons-material/Today';

import { useDropzone } from "react-dropzone";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import dayjs from "dayjs";

const Radicalisation_Enquiry_Form = () => {

  const [userList, setUserList] = useState([])

  const [Doc_type, setFilesField1] = useState([]);
  const [Photos, setFilesField2] = useState([]);
  const [Rel_photo, setFilesField3] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [date, setValue] = React.useState('');
  const [Email, setEmail] = useState(['']);
  const [Phone, setPhone] = useState(['']);
  const [uploadedFile1, setUploadedFile1] = useState([]);
  const [uploadedFile2, setUploadedFile2] = useState([]);
  const [uploadedFile3, setUploadedFile3] = useState([]);
  const [alert1, setAlert1] = useState('')
  const [alert2, setAlert2] = useState('')
  const [alert3, setAlert3] = useState('')

  async function getUsers() {
    setUserList(await getUsersList());
    console.log(userList,'/././/././../././mnmmnmn')
  }
  useEffect(() => {
    // Retrieve the data from localStorage when the component mounts
    setUserDetails(JSON.parse(localStorage.getItem('userData')));
    getUsers();
  }, [])
  const location = useLocation();
  const form_type = location.state?.selectedEnquiry;
  const label = form_type === 'Radicalisation Enquiry' ? 'Radicaliser' : 'De Radicaliser';

  // console.log("form_type", form_type);

  // Handler for first drop field
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
  // Handler for second drop field
  const {
    getRootProps: getRootProps2,
    getInputProps: getInputProps2,
    isDragActive: isDragActive2,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFilesField2(acceptedFiles);
      console.log("Files in Field 2:", acceptedFiles);
    },
  });

  // Handler for third drop field
  const {
    getRootProps: getRootProps3,
    getInputProps: getInputProps3,
    isDragActive: isDragActive3,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFilesField3(acceptedFiles);
      console.log("Files in Field 3:", acceptedFiles);
    },
  });


  async function documenttype_handler(event) {
    const files = Array.from(event.target.files); // Convert FileList to an array
    console.log(files);
    setUploadedFile1(prevFiles => [...prevFiles, ...files]);

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
        setAlert1('Path Fetched')
        console.log(doc_path,'/............................................../')
        setFilesField1(doc_path['document_type']);
      } else {
        console.error('Failed to upload files:', response.statusText);
        setAlert1('Path Fetched Failed')
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      setAlert1('Path Fetched Failed')
    }
    console.log(suspect_details);
  }

  async function Phototype_handler(event) {
    const files = Array.from(event.target.files); // Convert FileList to an array
    console.log(files);
    setUploadedFile2(prevFiles => [...prevFiles, ...files]);

    const formData = new FormData();
    // Append each file with a unique key
    files.forEach((file, i) => {
      formData.append('photos', file);
    });
    try {
      const response = await fetch(basepath() + "/file_upload_handle", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        const doc_path = await response.json();
        setFilesField2(doc_path['photos']);
        setAlert2('Path Fetched')
      } else {
        console.error('Failed to upload files:', response.statusText);
        setAlert2('Path Fetched Failed')
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      setAlert2('Path Fetched Failed')
    }
    console.log(suspect_details);
  }

  async function Relphotos_handler(event, i) {
    const files = Array.from(event.target.files); // Convert FileList to an array
    console.log(files);
    setUploadedFile3(prevFiles => [...prevFiles, ...files]);

    const formData = new FormData();
    // Append each file with a unique key
    files.forEach((file, i) => {
      formData.append('Photos_relative', file);
    });
    try {
      const response = await fetch(basepath() + "/file_upload_handle", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        const doc_path = await response.json();
        console.log(doc_path)
        relativeDetails[i]['photos'] = doc_path['Photos_relative'];
        setAlert3('Path Fetched')
      } else {
        console.error('Failed to upload files:', response.statusText);
        setAlert3('Path Fetched Failed')
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      setAlert3('Path Fetched Failed')
    }
    console.log(suspect_details);
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
      {(label === "Upload Documents") && 
         <input {...getInputProps()} onChange={(e)=> documenttype_handler(e)} />
      }
      {(label === "Upload Photo") &&  
        <input {...getInputProps()} onChange={(e)=> Phototype_handler(e)} />
      }

      {(label === "Upload Relatives Photos" && index) &&  
        <input {...getInputProps()} onChange={(e)=> Relphotos_handler(e, index)} />
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

  const [relativeDetails, setRelativeDetails] = useState([
    {
      name: "",
      address: "",
      phone: [""],
      aadhaar_no: "",
      pan_no: "",
      relationship: "",
      age: "",
      email: [""],
      passport_no: "",
      photos: [],
    },
  ]);

  // const [showNextFields, setShowNextFields] = useState(false);
  const [formData, setFormData] = useState({
    reportType: form_type,
    to: "",
    reference: "",
    enquiredPerson: "",
    date: "",
    outwardNo: "",
    cc: "",
    enquiryOfficer: "",
    enquiredPlace: "",
    latLong: "",
    suspectName: "",
    age: "",
    skinColor: "",
    phoneNumber: "",
    aadhaarNumber: "",
    bank_acc_no: "",
    panNumber: "",
    dmsDawId: "",
    gender: "",
    address: "",
    address2: "",
    radicalized_inst_name: "",
    email: "",
    passportNumber: "",
    pan_number1: "",
    Brief_History: "",
    Radicalize_Current_Status: "",
    name: "",
    relativeAddress: "",
    phoneNumber: "",
    aadhaarNumber: "",
    panNumber: "",
    relationship: "",
    relativeAge: "",
    email: "",
    passportNumber: "",
    fingerprints: "",
    DNA_Evidence: "",
    Shoe_Prints: "",
    Handwriting_Analysis: "",
    fingerprints_name: "",
    DNA_Evidence_name: "",
    Shoe_Prints_name: "",
    Handwriting_Analysis_name: "",
    remarks: "",
    suspect_enquiry_report: "",
    relative_details: relativeDetails,
  });
  const handleRadioChange = (event) => {
    setFormData({ ...formData, fingerprints: event.target.value });
  };
  const handleRadioChange2 = (event) => {
    setFormData({ ...formData, Shoe_Prints: event.target.value });
  };
  const handleRadioChange3 = (event) => {
    setFormData({ ...formData, DNA_Evidence: event.target.value });
  };
  const handleRadioChange4 = (event) => {
    setFormData({ ...formData, Handwriting_Analysis: event.target.value });
  };
  const handleRadioChange5 = (event) => {
    setFormData({ ...formData, gender: event.target.value });
  };

  // Step up form old logic

  // const handleNextClick = () => {
  //   handleSubmit();
  //   setShowNextFields(true);

  //   console.log("formdata====", formData);
  // };
  // const handlePrevClick = () => {
  //   setShowNextFields(false);
  // };
  const onDrop = useCallback((acceptedFiles) => {
    console.log("Uploaded files:", acceptedFiles);
  }, []);

  const [selectedBuilds, setSelectedBuilds] = useState({
    slim: false,
    medium: false,
    athletic: false,
    heavy: false,
    others: false,
  });

  const handleCheckboxChange = (event) => {
    setSelectedBuilds({
      ...selectedBuilds,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = (event) => {
    console.log("Selected Builds:", selectedBuilds);

    const selectedValues = Object.keys(selectedBuilds).filter(
      (key) => selectedBuilds[key]
    );
    console.log("Selected Values:", selectedValues);
  };

  const navigate = useNavigate();
  const gotohome = () => {
    navigate("/marvel/home");
  };
  const [Heading_form, setHeading_form] = useState(false);
  const [currentSection, setCurrentSection] = useState(1); // for stepup form logic

  // let currentSection = 1;
  const totalSections = 2;

  const handleNextClick = () => {
    if (currentSection < totalSections) setCurrentSection(currentSection + 1);
  };

  const handlePrevClick = () => {
    if (currentSection > 1) setCurrentSection(currentSection - 1);
  };
  // Validations

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
  // TO CC dropdown logic
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
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

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

  const [To, setTO] = React.useState([]);
  const [CC, setCC] = React.useState([]);
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


/* Suspect Phone and Email */
const MultiPhone2 = (event,index) => {
  const updatedDetails = [...Phone];
  updatedDetails[index] = event.target.value;
  setPhone(updatedDetails);
};

const removePhone2 = (i, event) => {
  event.preventDefault();
  const updatedDetails = [...Phone];
  updatedDetails.splice(i, 1); // Remove the item
  setPhone(updatedDetails);
};

const MultiPhoneAdd2 = (event) => {
  event.preventDefault();
  setPhone([...Phone, '']); // Add a new empty email);
};



const MultiEmail2 = (event, index) => {
  const newEmails = [...Email]; // Make a copy of the array
  newEmails[index] = event.target.value; // Update the value
  setEmail(newEmails); // Set the new array
};

const removeEmail2 = (index) => {
  const newEmails = [...Email]; // Make a copy of the array
  newEmails.splice(index, 1); // Remove the item
  setEmail(newEmails); // Set the new array
};

const MultiEmailAdd2 = () => {
  setEmail([...Email, '']); // Add a new empty email
};


  // Multiple Add Relative , Phone, Email

  const MultiPhone = (event, i, index) => {
    const updatedDetails = [...relativeDetails];
    updatedDetails[index].phone[i] = event.target.value;
    setRelativeDetails(updatedDetails);
    console.log(updatedDetails[index].phone, "updated after input");
  };

  const removePhone = (i, event, index) => {
    event.preventDefault();
    const updatedDetails = [...relativeDetails];
    updatedDetails[index].phone = updatedDetails[index].phone.filter(
      (_, idx) => idx !== i
    );
    setRelativeDetails(updatedDetails);
    console.log(updatedDetails[index].email, "updated after removal");
  };

  const MultiPhoneAdd = (event, index) => {
    event.preventDefault();
    const updatedDetails = [...relativeDetails];
    updatedDetails[index].phone = [...updatedDetails[index].phone, ""];
    setRelativeDetails(updatedDetails);
    console.log(updatedDetails, "updated after adding a new phone");
  };

  const MultiEmail = (event, i, index) => {
    const updatedDetails = [...relativeDetails];
    updatedDetails[index].email[i] = event.target.value;
    setRelativeDetails(updatedDetails);
    console.log(updatedDetails[index].email, "updated after input");
  };

  const removeEmail = (i, event, index) => {
    event.preventDefault();
    const updatedDetails = [...relativeDetails];
    updatedDetails[index].email = updatedDetails[index].email.filter(
      (_, idx) => idx !== i
    );
    setRelativeDetails(updatedDetails);
    console.log(updatedDetails[index].email, "updated after removal");
  };

  const MultiEmailAdd = (event, index) => {
    event.preventDefault();
    const updatedDetails = [...relativeDetails];
    updatedDetails[index].email = [...updatedDetails[index].email, ""];
    setRelativeDetails(updatedDetails);
    console.log(updatedDetails, "updated after adding a new phone");
  };

  // Multiple Suspect Relatives Details

  const handleRelativeInputs = (event, index, type) => {
    const updatedDetails = [...relativeDetails];
    updatedDetails[index][type] = event.target.value;
    setRelativeDetails(updatedDetails);
    console.log(updatedDetails, "updated after input");
  };

  const removeRelative = (i, event) => {
    event.preventDefault();
    const updatedDetails = relativeDetails.filter((_, idx) => idx !== i);
    setRelativeDetails(updatedDetails);
    console.log(updatedDetails, "updated after removal");
  };

  const handleRelativeAdd = (event) => {
    event.preventDefault();
    const updatedDetails = [
      ...relativeDetails,
      {
        name: "",
        address: "",
        phone: [""],
        aadhaar_no: "",
        pan_no: "",
        relationship: "",
        age: "",
        email: [""],
        passport_no: "",
        photos: [],
      },
    ];
    setRelativeDetails(updatedDetails);
    console.log(updatedDetails, "updated after adding a new phone");
  };

  // Error Handling
  const [errorMessage, setErrorMessage] = useState({
    nameError: "",
    aadharError: "",
    panError: "",
  });

  const isValidAadhar = (aadhar) => {
    const aadharPattern = /^\d{12}$/;
    return aadharPattern.test(aadhar);
  };

  const isValidPAN = (pan) => {
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panPattern.test(pan);
  };
  const handleAadharChange = (value) => {
    if (!isValidAadhar(value)) {
      setErrorMessage((prev) => ({
        ...prev,
        aadharError: "Invalid Aadhar Number",
      }));
    } else {
      setErrorMessage((prev) => ({ ...prev, aadharError: "" }));
    }
  };

  const handlePANChange = (value) => {
    if (!isValidPAN(value)) {
      setErrorMessage((prev) => ({ ...prev, panError: "Invalid PAN Number" }));
    } else {
      setErrorMessage((prev) => ({ ...prev, panError: "" }));
    }
  };
  const suspect_details = {
      name: formData.name,
      dms_daw_id: formData.dmsDawId,
      age: formData.age,
      profession: "",
      education: "",
      address: formData.address,
      phone: Phone,
      email: Email,
      aadhaar_no: formData.aadhaarNumber,
      passport_no: formData.passportNumber,
      bank_acc_no: formData.bank_acc_no,
      pan_no: formData.panNumber,
      photos: Photos,
      documents : Doc_type,
      fir_no: '',
      suspect_history: formData.Brief_History,
      institute_name: formData.radicalized_inst_name,
      current_status: formData.Radicalize_Current_Status,
      skin_color : formData.skinColor,
      gender : formData.gender,
    }

    const TodayDate = new Date();

// Extract the day, month, and year
const day = String(TodayDate.getDate()).padStart(2, '0'); // Get day and pad with leading zero if needed
const month = String(TodayDate.getMonth() + 1).padStart(2, '0'); // Get month (0-based) and pad with leading zero if needed
const year = TodayDate.getFullYear(); // Get the 4-digit year

// Format the date in DD/MM/YYYY
const formattedDate = `${day}/${month}/${year}`;
const yesterday = `${day - 1}/${month}/${year}`;
console.log(formattedDate);

    async function Rad_From() {
      if (To.length === 0){
        return alert('Please Select "To" Field');
      }
      try {
        const response = await fetch(basepath() + "/radical", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            enquiry               : form_type,
            user_name             : userDetails.officername,
            user_email            : userDetails.email,
            designation           : userDetails.designation,
            report_type           : form_type ,
            address_to            : To,
            cc                    : CC,
            created_date          : formattedDate,
            source_unit           : userDetails.unit,
            outward_no            : formData.outwardNo,
            reference             : formData.reference,
            enq_officer           : formData.enquiryOfficer,
            enq_person            : formData.enquiredPerson,
            enq_place             : formData.enquiredPlace,
            date                  : date,
            lat_long              : formData.latLong,
            suspect_details       : suspect_details,
            relative_details      : relativeDetails,
          }),
        });
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data); // Log the response data to the console
        navigate('/marvel/home');
        // if (editData !== "") {
        //   delete_draft(editData._id);
        //   requested_fun();
        // }
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    }
    async function SaveAsDraft() {
      const response = await fetch(basepath() + "/draft", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          enquiry               : form_type,
          user_name             : userDetails.officername,
          user_email            : userDetails.email,
          designation           : userDetails.designation,
          report_type           : form_type ,
          address_to            : To,
          cc                    : CC,
          created_date          : formattedDate,
          source_unit           : userDetails.unit,
          outward_no            : formData.outwardNo,
          reference             : formData.reference,
          enq_officer           : formData.enquiryOfficer,
          enq_person            : formData.enquiredPerson,
          enq_place             : formData.enquiredPlace,
          date                  : date,
          lat_long              : formData.latLong,
          suspect_details       : suspect_details,
          relative_details      : relativeDetails,
        }),
      });
      if (response.ok) {
        navigate('/marvel/home');
      }
    }

    const renderFileList1 = () => (
      <List>
          {uploadedFile1.map((file, index) => (
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
  const renderFileList3 = () => (
    <List>
        {uploadedFile3.map((file, index) => (
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
        <Navbar />
      <div className="form_discrete_enquiry_main_div">
        <div className="discrete_enquiry_form_div">
          <div className="form_top">
            <div id="form_top_heading">
              <ArrowBackIcon onClick={gotohome} />
              <div>
                <p className="form_heading">{form_type} Form</p>
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
              {currentSection}
            </div>
          </div>
              <div className="form_fields_div1">
                <div className="form_fields_left">
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

                  {/* <TextField
                    id="standard-basic"
                    label="To"
                    variant="standard"
                    value={formData.to || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, to: e.target.value })
                    }
                  /> */}
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
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
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
                    variant="standard"
                    value={formData.reference || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, reference: e.target.value })
                    }
                  />
                  <TextField
                    id="standard-basic"
                    label="Enquired Person"
                    variant="standard"
                    value={formData.enquiredPerson || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        enquiredPerson: e.target.value,
                      })
                    }
                  />
                  {/* <TextField
                    id="date"
                    label="Select Date"
                    type="date"
                    variant="standard"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  /> */}
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
                      <MenuItem value={formattedDate}>{formattedDate}</MenuItem>,
                      <MenuItem value={yesterday}>{yesterday}</MenuItem>,
                    </Select>
                    <TodayIcon className="calendar-icon" />
                  </FormControl>
                </div>
                <div className="form_fields_right">
                  <TextField
                    id="standard-basic"
                    value={formData.outwardNo || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, outwardNo: e.target.value })
                    }
                    label="Outward No"
                    variant="standard"
                  />
                  {/* <TextField
                    id="standard-basic"
                    value={formData.cc || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, cc: e.target.value })
                    }
                    label="Cc"
                    variant="standard"
                  /> */}
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
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
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
                    value={formData.enquiryOfficer || ""}
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
                    value={formData.enquiredPlace || ""}
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
                    value={formData.latLong || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, latLong: e.target.value })
                    }
                    label="Lat - Long"
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
                    value={formData.suspectName || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, suspectName: e.target.value })
                    }
                    label="Suspect Name"
                    variant="standard"
                  />
                  <TextField
                    id="standard-basic"
                    value={formData.age || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                    label="Age"
                    variant="standard"
                  />

                  <TextField
                    id="standard-basic"
                    value={formData.skinColor || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, skinColor: e.target.value })
                    }
                    label="Skin Color"
                    variant="standard"
                  />

                    {Phone.map((num, numI) => (
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
                            MultiPhone2(event, numI);
                          }}
                        />
                        
                        {Phone.length > 1 && (
                          <button
                            className="btn btn-danger"
                            onClick={(e) => removePhone2(numI, e)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-minus-fill" viewBox="0 0 16 16">
                              <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877zM10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5"/>
                            </svg>
                          </button>
                        )}
                        {numI === Phone.length - 1 && (
                          <button
                            className="btn btn-primary"
                            id="button-addon2"
                            onClick={(e) => MultiPhoneAdd2(e)}
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
                    className="form-control"
                    value={formData.aadhaarNumber}
                    inputProps={{ maxLength: 12 }} // Set maxLength to 12
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        aadhaarNumber: e.target.value,
                      })
                    }
                    onInput={(event) => {
                      const value = event.target.value;
                      if (/[^0-9]/.test(value)) {
                        event.target.value = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                      }
                    }}
                    label="Aadhaar Number"
                    variant="standard"
                  />
                  {(formData.aadhaarNumber !== '' && formData.aadhaarNumber.length < 12) && (
                    <Stack direction="horizontal" gap={2}>
                      <Badge bg="danger">Enter Only 12 Digits</Badge>
                    </Stack>
                  )}

                  <TextField
                    id="standard-basic"
                    value={formData.bank_acc_no || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, bank_acc_no: e.target.value })
                    }
                    label="Bank Account No"
                    variant="standard"
                  />
                  <TextField
                    id="standard-basic"
                    value={formData.address || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    label="Address"
                    variant="standard"
                  />

                  {renderDropField(
                    getRootProps1,
                    getInputProps1,
                    isDragActive1,
                    "Upload Documents"
                  )}
                  <p className="text-sm text-gray-500" style={{
                    marginTop:'-30px',
                    color: "gray"
                  }}>
                    Attach file. File size of your documents should not exceed 10MB
                  </p>
                  {(alert1 === 'Path Fetched') ?  
                    (
                        <Box>
                            <Typography variant="h6">Uploaded Files:</Typography>
                            {renderFileList1()}
                        </Box>
                    ) : (alert1 === 'Path Fetched Failed') && (
                        <Stack direction="horizontal">
                          <Badge bg="danger">File Upload Failed....!</Badge>
                        </Stack>
                    )}
                  <TextField
                    id="standard-basic"
                    value={formData.radicalized_inst_name || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        radicalized_inst_name: e.target.value,
                      })
                    }
                    
                    label={label + ' Institute Name'}
                    variant="standard"
                  />
                </div>
                <div className="form_fields_right">
                  <TextField
                    id="standard-basic"
                    label="If DMS/DAW ID"
                    variant="standard"
                    value={formData.dmsDawId || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, dmsDawId: e.target.value })
                    }
                  />
                  <Box
                    className="box"
                    sx={{ alignItems: "center", marginTop: "1rem" }}
                  >
                    <Typography className="build_field">Gender</Typography>
                    <div style={{ marginLeft: "3rem" }}>
                      <FormControlLabel
                        control={
                          <Radio
                            value="male"
                            checked={formData.gender === "male"}
                            onChange={handleRadioChange5}
                          />
                        }
                        label="Male"
                      />
                      <FormControlLabel
                        control={
                          <Radio
                            value="female"
                            checked={formData.gender === "female"}
                            onChange={handleRadioChange5}
                          />
                        }
                        label="Female"
                      />
                      <FormControlLabel
                        control={
                          <Radio
                            value="others"
                            checked={formData.gender === "others"}
                            onChange={handleRadioChange5}
                          />
                        }
                        label="Other"
                      />
                    </div>
                  </Box>
                  {Email.map((mail, mailI) => (
                    <>
                      <div className="d-flex"> {/* Updated unique key */}
                        <TextField
                          id="standard-basic"
                          className="form-control"
                          label="Email Id"
                          value={mail}
                          variant="standard"
                          onInput={(event) => MultiEmail2(event, mailI)}
                        />
                        {Email.length > 1 && (
                          <button
                            className="btn btn-danger"
                            onClick={(e) => removeEmail2(mailI, e)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-dash-fill" viewBox="0 0 16 16">
                              <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 4.697v4.974A4.5 4.5 0 0 0 12.5 8a4.5 4.5 0 0 0-1.965.45l-.338-.207z"/>
                              <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-5.5 0a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5"/>
                            </svg>
                          </button>
                        )}
                        {mailI === Email.length - 1 && (
                          <button
                            className="btn btn-primary"
                            id="button-addon2"
                            onClick={(e) => MultiEmailAdd2(e)}
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
                          <Badge bg="danger">Enter Valid Email Format (abc@xyz.com)</Badge>
                        </Stack>
                      )}
                    </>
                  ))
                }
                  <TextField
                    id="standard-basic"
                    label="Passport Number"
                    variant="standard"
                    value={formData.passportNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        passportNumber: e.target.value,
                      })
                    }
                  />
                  {/* <TextField
                    id="standard-basic"
                    label="PAN Number "
                    variant="standard"
                    value={formData.pan_number1}
                    // onChange={(e) =>
                    //   setFormData({
                    //     ...formData,
                    //     pan_number1: e.target.value,
                    //   })
                    // }
                    onChange={(e) => {
                      const value = e.target.value;
                      // setFormData(() => ({ ...formData, panNumber: value }));
                      setFormData((prev) => ({ ...prev, pan_number1: value }))
                      handlePANChange(value);
                    }}
                    errorMessage={!!errorMessage.panError}
                    helperText={errorMessage.panError}
                  /> */}
                  <TextField
                    id="standard-basic"
                    label="PAN Number"
                    variant="standard"
                    value={formData.pan_number1}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData({ ...formData, pan_number1: value });
                      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
                      const panError = !panRegex.test(value)
                        ? "Invalid PAN Number"
                        : "";
                      e.target.setCustomValidity(panError);
                      e.target.reportValidity();
                    }}
                    helperText={
                      document.getElementById("standard-basic")
                        ?.validationMessage || ""
                    }
                  />
                  <TextField
                    id="standard-basic"
                    label="Brief History"
                    variant="standard"
                    value={formData.Brief_History}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        Brief_History: e.target.value,
                      })
                    }
                  />

                  {renderDropField(
                    getRootProps2,
                    getInputProps2,
                    isDragActive2,
                    "Upload Photo"
                  )}
                  <p className="text-sm text-gray-500" style={{
                    marginTop:'-30px',
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
                    ) : (alert2 === 'Path Fetched Failed') && (
                        <Stack direction="horizontal">
                          <Badge bg="danger">File Upload Failed....!</Badge>
                        </Stack>
                    )}
                  <TextField
                    id="standard-basic"
                    label={label + ' Current Status'}
                    variant="standard"
                    value={formData.Radicalize_Current_Status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        Radicalize_Current_Status: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <h2 className="heading_suspect_det">Relative Details</h2>
              {relativeDetails.map((sus, i) => (
                <>
                  <div className="form_fields_div1">
                    <div className="form_fields_left">
                      <TextField
                        id="standard-basic"
                        label="Name"
                        variant="standard"
                        value={sus.name}
                        onInput={(event) =>
                          handleRelativeInputs(event, i, "name")
                        }
                      />
                      <TextField
                        id="standard-basic"
                        label="Relative Address"
                        variant="standard"
                        value={sus.address}
                        onInput={(event) =>
                          handleRelativeInputs(event, i, "address")
                        }
                      />

                      {sus.phone.map((num, numI) => (
                        <>
                          <div className="d-flex">
                            {" "}
                            {/* Unique key for each field */}
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
                                  event.target.value = value.replace(
                                    /[^0-9]/g,
                                    ""
                                  ); // Remove non-numeric characters
                                }
                                MultiPhone(event, numI, i);
                              }}
                            />
                            {sus.phone.length > 1 && (
                              <button
                                className="btn btn-danger"
                                onClick={(e) => removePhone(numI, e, i)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-telephone-minus-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877zM10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5"
                                  />
                                </svg>
                              </button>
                            )}
                            {numI === sus.phone.length - 1 && (
                              <button
                                className="btn btn-primary"
                                id="button-addon2"
                                onClick={(e) => MultiPhoneAdd(e, i)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-telephone-plus-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877zM12.5 1a.5.5 0 0 1 .5.5V3h1.5a.5.5 0 0 1 0 1H13v1.5a.5.5 0 0 1-1 0V4h-1.5a.5.5 0 0 1 0-1H12V1.5a.5.5 0 0 1 .5-.5"
                                  />
                                </svg>
                              </button>
                            )}
                          </div>
                          {num !== "" && num.length < 10 && (
                            <Stack direction="horizontal" gap={2}>
                              <Badge bg="danger">Enter Only 10 Digits</Badge>
                            </Stack>
                          )}
                        </>
                      ))}

                      <TextField
                        id="standard-basic"
                        label="Aadhaar Number"
                        variant="standard"
                        inputProps={{ maxLength: 12 }} // Set maxLength to 12
                        value={sus.aadhaar_no}
                        onInput={(event) => {
                          const value = event.target.value;
                          if (/[^0-9]/.test(value)) {
                            event.target.value = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                          }
                          handleRelativeInputs(event, i, "aadhaar_no");
                        }}
                      />
                      {sus.aadhaar_no !== "" && sus.aadhaar_no.length < 12 && (
                        <Stack direction="horizontal" gap={2}>
                          <Badge bg="danger">Enter Only 12 Digits</Badge>
                        </Stack>
                      )}

                      <TextField
                        id="standard-basic"
                        label="PAN Number"
                        variant="standard"
                        value={sus.pan_no}
                        onInput={(event) =>
                          handleRelativeInputs(event, i, "pan_no")
                        }
                      />
                      {!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(sus.pan_no) &&
                        sus.pan_no !== "" && (
                          <Stack direction="horizontal" gap={2}>
                            <Badge bg="danger">
                              Please enter a valid PAN number (e.g.,
                              ABCDE1234F).
                            </Badge>
                          </Stack>
                        )}
                    </div>
                    <div className="form_fields_right">
                      <TextField
                        id="standard-basic"
                        label="Relationship"
                        variant="standard"
                        value={sus.relationship}
                        onInput={(event) =>
                          handleRelativeInputs(event, i, "relationship")
                        }
                      />
                      <TextField
                        id="standard-basic"
                        label="Relative Age"
                        variant="standard"
                        value={sus.age}
                        onInput={(event) =>
                          handleRelativeInputs(event, i, "age")
                        }
                      />

                      {sus.email.map((mail, mailI) => (
                        <>
                          <div className="d-flex">
                            {" "}
                            {/* Updated unique key */}
                            <TextField
                              id="standard-basic"
                              className="form-control"
                              label="Email Id"
                              value={mail}
                              variant="standard"
                              onInput={(event) => MultiEmail(event, mailI, i)}
                            />
                            {sus.email.length > 1 && (
                              <button
                                className="btn btn-danger"
                                onClick={(e) => removeEmail(mailI, e, i)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-envelope-dash-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 4.697v4.974A4.5 4.5 0 0 0 12.5 8a4.5 4.5 0 0 0-1.965.45l-.338-.207z" />
                                  <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-5.5 0a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5" />
                                </svg>
                              </button>
                            )}
                            {mailI === sus.email.length - 1 && (
                              <button
                                className="btn btn-primary"
                                id="button-addon2"
                                onClick={(e) => MultiEmailAdd(e, i)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-envelope-plus-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 4.697v4.974A4.5 4.5 0 0 0 12.5 8a4.5 4.5 0 0 0-1.965.45l-.338-.207z" />
                                  <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5" />
                                </svg>
                              </button>
                            )}
                          </div>
                          {!emailPattern.test(mail) && mail !== "" && (
                            <Stack direction="horizontal" gap={2}>
                              <Badge id={mailI} bg="danger">
                                Enter Valid Email Format (abc@xyz.com)
                              </Badge>
                            </Stack>
                          )}
                        </>
                      ))}

                      <TextField
                        id="standard-basic"
                        label="Passport Number"
                        variant="standard"
                        value={sus.passport_no}
                        onInput={(event) =>
                          handleRelativeInputs(event, i, "passport_no")
                        }
                      />

                      {renderDropField(
                        getRootProps3,
                        getInputProps3,
                        isDragActive3,
                        "Upload Relatives Photos",
                        `${i}`
                      )}
                       <p className="text-sm text-gray-500" style={{
                    marginTop:'-30px',
                    color: "gray"
                  }}>
                    Attach file. File size of your documents should not exceed 10MB
                  </p>
                  {(alert3 === 'Path Fetched') ?  
                    (
                        <Box>
                            <Typography variant="h6">Uploaded Files:</Typography>
                            {renderFileList3()}
                        </Box>
                    ) : (alert3 === 'Path Fetched Failed') && (
                        <Stack direction="horizontal">
                          <Badge bg="danger">File Upload Failed....!</Badge>
                        </Stack>
                    )}
                      <div style={{ marginLeft: "30rem" }}>
                        {relativeDetails.length > 1 && (
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
                        {i === relativeDetails.length - 1 && (
                          <div>
                            {(sus.name.length === 0) ? 
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
                                  <PersonAddAlt1Icon /> Add Relative
                                </button>)
                            }
                            {(sus.name.length === 0) && 
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
              
              <hr />
              <br />
          <div className="buttons">
            <button className="btn1_form" onClick={SaveAsDraft}>SAVE AS DRAFT</button>
              <button
                type="button"
                className="btn2_form"
                onClick={()=> Rad_From()}
              >
                SUBMIT
              </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Radicalisation_Enquiry_Form;
