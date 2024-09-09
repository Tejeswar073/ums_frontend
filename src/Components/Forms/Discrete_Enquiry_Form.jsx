import React, { useCallback, useRef, useState, useEffect } from "react";
import Navbar from "../Navbar";
import "../../css/Discrete_Enquiry_Form.css";
import { basepath, getUsersList } from "../../config";
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import TodayIcon from '@mui/icons-material/Today';
import { useNavigate, useLocation } from 'react-router-dom';
import {Select,FormControl,MenuItem,Radio,RadioGroup,InputLabel,OutlinedInput,Chip, TextField,FormControlLabel,Checkbox,Box,Typography} from '@mui/material';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDropzone } from "react-dropzone";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css'; // You can choose any theme you like

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

const  Discrete_Enquiry_Form = () => {
  const theme = useTheme();

  const [Doc_type, setFilesField1] = useState([]);
  const [Photos, setFilesField2] = useState([]);
  const [Rel_photo, setFilesField3] = useState([]);
  const [counter, setCounter] = useState(1)
  const [To, setTO] = React.useState([]);
  const [CC, setCC] = React.useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [userList, setUserList] = useState([])
  const [uploadedFile1, setUploadedFile1] = useState([]);
  const [uploadedFile2, setUploadedFile2] = useState([]);
  const [uploadedFile3, setUploadedFile3] = useState([]);
  const [uploadedFile41, setUploadedFile41] = useState([]);
  const [uploadedFile42, setUploadedFile42] = useState([]);
  const [uploadedFile43, setUploadedFile43] = useState([]);
  const [uploadedFile44, setUploadedFile44] = useState([]);


  const [relativeDetails, setRelativeDetails] = useState([{
    name: "",
    address: "",
    phone: [''],
    aadhaar_no: "",
    pan_no: "",
    relationship: "",
    age: "",
    email: [''],
    passport_no: "",
    photos: Rel_photo,
  }]);
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
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const handleChangeCC = (event) => {
    const {
      target: { value },
    } = event;
    setCC(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation();
  const { selectedEnquiry } = location.state || {}; // Default to {} if state is undefined
  useEffect(() => {
    // Retrieve the data from localStorage when the component mounts
    setUserDetails(JSON.parse(localStorage.getItem('userData')));
    getUsers();
  }, [])

  const Formdata = new FormData();
  const {
    getRootProps: getRootProps1,
    getInputProps: getInputProps1,
    isDragActive: isDragActive1,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFilesField1(acceptedFiles);
      
    },
  });

  const {
    getRootProps: getRootProps41,
    getInputProps: getInputProps41,
    isDragActive: isDragActive41,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      // setFilesField4(acceptedFiles);
      
    },
  });

  const {
    getRootProps: getRootProps42,
    getInputProps: getInputProps42,
    isDragActive: isDragActive42,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      // setFilesField4(acceptedFiles);
      
    },
  });

  const {
    getRootProps: getRootProps43,
    getInputProps: getInputProps43,
    isDragActive: isDragActive43,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      // setFilesField4(acceptedFiles);
      
    },
  });

  const {
    getRootProps: getRootProps44,
    getInputProps: getInputProps44,
    isDragActive: isDragActive44,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      // setFilesField4(acceptedFiles);
      
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

  const [alert1, setAlert1] = useState('')
  const [alert2, setAlert2] = useState('')
  const [alert3, setAlert3] = useState('')
  const [alert41, setAlert41] = useState('')
  const [alert42, setAlert42] = useState('')
  const [alert43, setAlert43] = useState('')
  const [alert44, setAlert44] = useState('')




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


  /* FORENSIC DOC HANDLER */


  async function Forensic_doc_handler1(event, i) {
    const files = Array.from(event.target.files); // Convert FileList to an array
    setUploadedFile41(prevFiles => [...prevFiles, ...files]);
    const formData2 = new FormData();
    files.forEach((file, i) => {
      formData2.append('doc_type', file);
    });
    try {
      const response = await fetch(basepath() + "/file_upload_handle", {
        method: "POST",
        body: formData2,
      });
  
      if (response.ok) {
        const doc_path = await response.json();
        setFormData({
          ...formData,
          FingerPrints_docs: doc_path['document_type'],
        })
        setAlert41('Path Fetched')
      } else {
        setAlert41('Path Fetched Failed')
      }
    } catch (error) {
      setAlert41('Path Fetched Failed')
    }
  }
  async function Forensic_doc_handler2(event, i) {
    const files = Array.from(event.target.files); // Convert FileList to an array
    setUploadedFile42(prevFiles => [...prevFiles, ...files]);
    const formData2 = new FormData();
    files.forEach((file, i) => {
      formData2.append('doc_type', file);
    });
    try {
      const response = await fetch(basepath() + "/file_upload_handle", {
        method: "POST",
        body: formData2,
      });
  
      if (response.ok) {
        const doc_path = await response.json();
        setFormData({
          ...formData,
          DNA_docs: doc_path['document_type'],
        })
        setAlert42('Path Fetched')
      } else {
        setAlert42('Path Fetched Failed')
      }
    } catch (error) {
      setAlert42('Path Fetched Failed')
    }
  }
  async function Forensic_doc_handler3(event, i) {
    const files = Array.from(event.target.files); // Convert FileList to an array
    setUploadedFile43(prevFiles => [...prevFiles, ...files]);
    const formData2 = new FormData();
    files.forEach((file, i) => {
      formData2.append('doc_type', file);
    });
    try {
      const response = await fetch(basepath() + "/file_upload_handle", {
        method: "POST",
        body: formData2,
      });
  
      if (response.ok) {
        const doc_path = await response.json();
        setFormData({
          ...formData,
          ShoePrint_docs: doc_path['document_type'],
        })
        setAlert43('Path Fetched')
      } else {
        setAlert43('Path Fetched Failed')
      }
    } catch (error) {
      setAlert44('Path Fetched Failed')
    }
  }
  async function Forensic_doc_handler4(event, i) {
    const files = Array.from(event.target.files); // Convert FileList to an array
    setUploadedFile44(prevFiles => [...prevFiles, ...files]);
    const formData2 = new FormData();
    files.forEach((file, i) => {
      formData2.append('doc_type', file);
    });
    try {
      const response = await fetch(basepath() + "/file_upload_handle", {
        method: "POST",
        body: formData2,
      });
  
      if (response.ok) {
        const doc_path = await response.json();
        setFormData({
          ...formData,
          HandWritten_docs: doc_path['document_type'],
        })
        setAlert44('Path Fetched')
      } else {
        setAlert44('Path Fetched Failed')
      }
    } catch (error) {
      setAlert44('Path Fetched Failed')
    }
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
      {(label === "Upload Photocopy / Document of FIR") &&  
        <input {...getInputProps()} onChange={(e)=> Phototype_handler(e)} />
      }

      {(label === "Upload Relatives Photos" && index) &&  
        <input {...getInputProps()} onChange={(e)=> Relphotos_handler(e, index)} />
      }

    {(label === "Fingerprints Copy") &&  
      <input {...getInputProps()} onChange={(e)=> Forensic_doc_handler1(e)} />
    }
    {(label === "Shoe Prints Copy") &&  
      <input {...getInputProps()} onChange={(e)=> Forensic_doc_handler2(e)} />
    }
    {(label === "DNA Evidence Copy") &&  
      <input {...getInputProps()} onChange={(e)=> Forensic_doc_handler3(e)} />
    }
    {(label === "Handwriting Analysis Copy") &&  
      <input {...getInputProps()} onChange={(e)=> Forensic_doc_handler4(e)} />
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
const renderFileList41 = (docType) => (
  <List>
    {uploadedFile41
      .filter((file) => file.docType === docType) // Filter files by the document type
      .map((file, index) => (
        <ListItem key={index}>
          <ListItemIcon>
            <InsertDriveFileIcon />
          </ListItemIcon>
          <ListItemText primary={file.name} />
        </ListItem>
      ))}
  </List>
);

const renderFileList42 = (docType) => (
  <List>
    {uploadedFile42
      .filter((file) => file.docType === docType) // Filter files by the document type
      .map((file, index) => (
        <ListItem key={index}>
          <ListItemIcon>
            <InsertDriveFileIcon />
          </ListItemIcon>
          <ListItemText primary={file.name} />
        </ListItem>
      ))}
  </List>
);

const renderFileList43 = (docType) => (
  <List>
    {uploadedFile43
      .filter((file) => file.docType === docType) // Filter files by the document type
      .map((file, index) => (
        <ListItem key={index}>
          <ListItemIcon>
            <InsertDriveFileIcon />
          </ListItemIcon>
          <ListItemText primary={file.name} />
        </ListItem>
      ))}
  </List>
);

const renderFileList44 = (docType) => (
  <List>
    {uploadedFile44
      .filter((file) => file.docType === docType) // Filter files by the document type
      .map((file, index) => (
        <ListItem key={index}>
          <ListItemIcon>
            <InsertDriveFileIcon />
          </ListItemIcon>
          <ListItemText primary={file.name} />
        </ListItem>
      ))}
  </List>
);


  const [showNextFields, setShowNextFields] = useState(false);
  const [date, setValue] = React.useState('');
  const [issuedOn, setissuedOn] = React.useState('');
  const [validTill, setvalidTill] = React.useState('');
  const [Email, setEmail] = useState(['']);
  const [Phone, setPhone] = useState(['']);
  console.log(date)
  const [formData, setFormData] = useState({
    reportType: "",
    reference: "",
    enquiredPerson: "",
    date: '',
    outwardNo: "",
    enquiryOfficer: "",
    enquiredPlace: "",
    latLong: "",
    suspectName: "",
    age: "",
    weight: "",
    skinColor: "",
    eyeColor: "",
    outfit: "",
    occupation : '',
    institute_name : '',
    education : '',
    phoneNumber: "",
    aadhaarNumber: "",
    placeOfIssue: "",
    issuedOn: "",
    panNumber: "",
    suspectBriefHistory: "",
    policeStation: "",
    sections: "",
    dmsDawId: "",
    distinguishingMarks: "",
    height: "",
    hairColorStyle: "",
    address: "",
    email: "",
    place : '',
    passportNumber: "",
    countryOfIssue: "",
    validTill: "",
    socialMediaOccurrence: "",
    firLodged: "",
    firNo: "",

    fingerprints: "",
    DNA_Evidence: "",
    Shoe_Prints: "",
    Handwriting_Analysis: "",
    FingerPrints_docs : [],
    DNA_docs : [],
    ShoePrint_docs : [],
    HandWritten_docs : [],

    remarks: "",
    suspect_enquiry_report: "",

  });
console.log(formData.reportType)


/* For Relative Multi Phone */
const MultiPhone = (event, i, index) => {
  const updatedDetails = [...relativeDetails];
  updatedDetails[index].phone[i] = event.target.value;
  setRelativeDetails(updatedDetails);
  console.log(updatedDetails[index].phone, 'updated after input');
};

const removePhone = (i, event, index) => {
  event.preventDefault();
  const updatedDetails = [...relativeDetails];
  updatedDetails[index].phone = updatedDetails[index].phone.filter((_, idx) => idx !== i);
  setRelativeDetails(updatedDetails);
  console.log(updatedDetails[index].email, 'updated after removal');
};

const MultiPhoneAdd = (event, index) => {
  event.preventDefault();
  const updatedDetails = [...relativeDetails];
  updatedDetails[index].phone = [...updatedDetails[index].phone, ''];
  setRelativeDetails(updatedDetails);
  console.log(updatedDetails, 'updated after adding a new phone');
};



const MultiEmail = (event, i, index) => {
  const updatedDetails = [...relativeDetails];
  updatedDetails[index].email[i] = event.target.value;
  setRelativeDetails(updatedDetails);
  console.log(updatedDetails[index].email, 'updated after input');
};

const removeEmail = (i, event, index) => {
  event.preventDefault();
  const updatedDetails = [...relativeDetails];
  updatedDetails[index].email = updatedDetails[index].email.filter((_, idx) => idx !== i);
  setRelativeDetails(updatedDetails);
  console.log(updatedDetails[index].email, 'updated after removal');
};

const MultiEmailAdd = (event, index) => {
  event.preventDefault();
  const updatedDetails = [...relativeDetails];
  updatedDetails[index].email = [...updatedDetails[index].email, ''];
  setRelativeDetails(updatedDetails);
  console.log(updatedDetails, 'updated after adding a new phone');
};
/* End Here=================================================================> */

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




/* Multiple Suspect Relatives Details */

const handleRelativeInputs = (event,index, type) => {
  const updatedDetails = [...relativeDetails];
  if(type==='pan_no'){
    updatedDetails[index][type] = event.target.value.toLocaleUpperCase();
  }
  else{
    updatedDetails[index][type] = event.target.value;

  }
  setRelativeDetails(updatedDetails);
  console.log(updatedDetails, 'updated after input');
};

const removeRelative = (i, event) => {
  event.preventDefault();
  const updatedDetails = relativeDetails.filter((_, idx) => idx !== i);
  setRelativeDetails(updatedDetails);
  console.log(updatedDetails, 'updated after removal');
};


let error = '';
const handleRelativeAdd = (event, name) => {
  if(name.length === 0){
   return error = 'Please Select Name Field at Least!'
  }
  event.preventDefault();
  const  updatedDetails = [...relativeDetails, 
    {
      name: "",
      address: "",
      phone: [''],
      aadhaar_no: "",
      pan_no: "",
      relationship: "",
      age: "",
      email: [''],
      passport_no: "",
      photos: [],
    }
  ];
  setRelativeDetails(updatedDetails);
  console.log(updatedDetails, 'updated after adding a new phone');
};





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
  
  const handleNextClick = () => {
    console.log("formdata====", formData);
    if (To.length === 0){
      return alert('Please Select "To" Field');
    }
    setCounter((prevCounter) => prevCounter + 1); // Increment counter by 1
    handleSubmit();
    setShowNextFields(true);

  };
  const handlePrevClick = () => {
    setCounter((prevCounter) => Math.max(1, prevCounter - 1)); // Decrement counter by 1, but not below 1
    setShowNextFields(false);
    console.log("formdata=====================================================", formData);

  };
  const onDrop = useCallback((acceptedFiles) => {
    console.log("Uploaded files:", acceptedFiles);
  }, []);


  const [selectedBuilds, setSelectedBuilds] = useState(""); // Default to an empty string or a specific initial value
  const [selectedGender, setSelectedGender] = useState(""); // Default to an empty string or a specific initial value


  const handleCheckboxChange = (event) => {
    setSelectedBuilds(event.target.value); // Update the state with the selected radio button value
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value); // Update the state with the selected radio button value
  };

  const handleSubmit = (event) => {
    console.log("Selected Builds:", selectedBuilds);

    const selectedValues = Object.keys(selectedBuilds).filter(
      (key) => selectedBuilds[key]
    );
    console.log("Selected Values:", selectedValues);
  };

  const handleBack = ()=>{
    navigate('/marvel/home')
  }

  console.log(formData.date)
  const suspect_details ={
        suspect_name      : formData.suspectName,
        dms_daw_id        : formData.dmsDawId,
        age               : formData.age,
        gender            : selectedGender,
        build             : selectedBuilds,
        distinguish_marks : formData.distinguishingMarks,
        weight            : formData.weight,
        height            : formData.height,
        skin_color        : formData.skinColor,
        hair_color_style  : formData.hairColorStyle,
        eye_color         : formData.eyeColor,
        outfit            : formData.outfit,
        occupation        : formData.occupation,
        education         : formData.education,
        institute_name    : formData.institute_name,
        place             : formData.place,
        address           : formData.address,
        phone             : Phone,
        email             : Email,
        aadhaar_no        : formData.aadhaarNumber,
        passport_no       : formData.passportNumber,
        place_issue       : formData.placeOfIssue,
        country_issue     : formData.countryOfIssue,
        issued_on         : issuedOn,
        valid_till        : validTill,
        pan_no            : formData.panNumber,
        documents          : Doc_type,
        photos            : Photos,
        suspect_history   : formData.suspectBriefHistory,
        fir_lodged        : formData.firNo,
        police_station    : formData.policeStation,
        fir_no            : formData.firNo,
        sections          : formData.sections,
        social_media      : formData.socialMediaOccurrence,
  }

  const forensic_evidence = [{
    finger_prints         : { finger_prints :formData.fingerprints, 
                              Attachments : formData.FingerPrints_docs
                            },

    dna_evidence          : { dna_evidence :formData.DNA_Evidence, 
                              Attachments : formData.DNA_docs
                            },

    shoe_prints           : { shoe_prints :formData.Shoe_Prints, 
                              Attachments : formData.ShoePrint_docs
                            },
    hw_analysis           : { hw_analysis :formData.Handwriting_Analysis, 
                              Attachments : formData.HandWritten_docs
                            },
  }]
  async function discreet_form() {
    if (To.length === 0){
        return alert('Please Select "To" Field');
    }
    const responce = await fetch(basepath() + "/enquiry", {
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
        report_type: formData.reportType,
        created_date : formattedDate,
        outward_no: formData.outwardNo,
        reference: formData.reference,
        enq_officer: formData.enquiryOfficer,
        enq_person: formData.enquiredPerson,
        enq_place: formData.enquiredPlace,
        date: date,
        lat_long: formData.latLong,
        remarks: formData.remarks,
        enq_brief: formData.suspect_enquiry_report,
        relative_details: relativeDetails,
        suspect_details : suspect_details,
        forensic_evidence : forensic_evidence,
      }),
   });
   console.log(suspect_details)
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



  /* Draft Func. */

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
        report_type: formData.reportType,
        created_date : formattedDate,
        outward_no: formData.outwardNo,
        reference: formData.reference,
        enq_officer: formData.enquiryOfficer,
        enq_person: formData.enquiredPerson,
        enq_place: formData.enquiredPlace,
        date: formData.date,
        lat_long: formData.latLong,
        remarks: formData.remarks,
        enq_brief: formData.suspect_enquiry_report,
        relative_details: relativeDetails,
        suspect_details : suspect_details,
      }),
   });
   console.log(suspect_details)
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


  return (
    <>
      <Navbar />
      <div className="form_discrete_enquiry_main_div">
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
          {!showNextFields ? (
            <>
              <div className="form_fields_div1">
                <div className="form_fields_left">
                  {/* <TextField
                    id="standard-select"
                    select
                    label="Report Type"
                    variant="standard"
                    onChange={(e) =>
                      setFormData({ ...formData, reportType: e.target.value })
                    }
                    fullWidth
                  >
                    <MenuItem value="Option 1">Option 1</MenuItem>
                    <MenuItem value="Option 2">Option 2</MenuItem>
                    <MenuItem value="Option 3">Option 3</MenuItem>
                  </TextField> */}
                 <FormControl variant="standard" className="form-control">
                    <InputLabel id="demo-simple-select-standard-label">Report Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={formData.reportType || ''}  // Ensure `value` is never undefined
                      onChange={(e) =>
                        setFormData({ ...formData, reportType: e.target.value })
                      }
                    >
                      <MenuItem key="" value="">
                        <em>Select Report Type</em>
                      </MenuItem>
                      {selectedEnquiry === 'Open Enquiry' &&
                        [
                          <MenuItem key="Person Open Enquiry" value="Person Open Enquiry">Person Open Enquiry</MenuItem>,
                          <MenuItem key="Foreigner Open Enquiry" value="Foreigner Open Enquiry">Foreigner Open Enquiry</MenuItem>,
                          <MenuItem key="Resident Open Enquiry" value="Resident Open Enquiry">Resident Open Enquiry</MenuItem>,
                          <MenuItem key="Case Open Enquiry" value="Case Open Enquiry">Case Open Enquiry</MenuItem>,
                          <MenuItem key="Organization Open Enquiry" value="Organization Open Enquiry">Organization Open Enquiry</MenuItem>
                        ]
                      }
                      {selectedEnquiry === 'Discreet Enquiry' &&
                        [
                          <MenuItem key="Person Discreet Enquiry" value="Person Discreet Enquiry">Person Discreet Enquiry</MenuItem>,
                          <MenuItem key="Foreigner Discreet Enquiry" value="Foreigner Discreet Enquiry">Foreigner Discreet Enquiry</MenuItem>,
                          <MenuItem key="Resident Discreet Enquiry" value="Resident Discreet Enquiry">Resident Discreet Enquiry</MenuItem>,
                          <MenuItem key="Case Discreet Enquiry" value="Case Discreet Enquiry">Case Discreet Enquiry</MenuItem>,
                          <MenuItem key="Organization Discreet Enquiry" value="Organization Discreet Enquiry">Organization Discreet Enquiry</MenuItem>
                        ]
                      }
                    </Select>
                  </FormControl>



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
                  {/* <div className="form-control dateDiv">
                    <div className="date-picker-container">
                      <Flatpickr
                        id="date-picker"
                        value={date}
                        onChange={([newDate]) => setDate(newDate)}
                        dateFormat="d/m/Y"
                        className="form-control flatpickr-input border-0"
                        style={{
                          outline: 'none',
                          boxShadow: 'none',
                        }}
                        placeholder="Select Date"
                        options={{
                          dateFormat: "d/m/Y",
                          altInput: true,
                          maxDate: 'today',
                          altFormat: "d/m/Y",
                          allowInput: true,
                        }}
                      />
                      <TodayIcon className="calendar-icon" />
                    </div>
                  </div> */}
                  
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
                    value={formData.outwardNo}
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
                    value={formData.enquiryOfficer}
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
                    value={formData.enquiredPlace}
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
                    value={formData.latLong}
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
                    value={formData.suspectName}
                    onChange={(e) =>
                      setFormData({ ...formData, suspectName: e.target.value })
                    }
                    label="Suspect Name"
                    variant="standard"
                  />
                  <TextField
                    id="standard-basic"
                    value={formData.age}
                    type="number"
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                    label="Age"
                    variant="standard"
                  />
                  <Box className="box" sx={{ alignItems: "center" }}>
                    <Typography className="build_field">Build</Typography>
                    <div style={{ marginLeft: "3rem" }}>
                      <RadioGroup
                        row
                        name="build"
                        value={selectedBuilds}
                        onChange={handleCheckboxChange}
                      >
                        <FormControlLabel
                          value="slim"
                          control={<Radio />}
                          label="Slim"
                        />
                        <FormControlLabel
                          value="medium"
                          control={<Radio />}
                          label="Medium"
                        />
                        <FormControlLabel
                          value="athletic"
                          control={<Radio />}
                          label="Athletic"
                        />
                        <FormControlLabel
                          value="heavy"
                          control={<Radio />}
                          label="Heavy"
                        />
                        <FormControlLabel
                          value="others"
                          control={<Radio />}
                          label="Others"
                        />
                      </RadioGroup>
                    </div>
                  </Box>

                  <TextField
                    id="standard-basic"
                    value={formData.weight}
                    onChange={(e) =>
                      setFormData({ ...formData, weight: e.target.value })
                    }
                    label="Weight"
                    variant="standard"
                  />
                  <TextField
                    id="standard-basic"
                    value={formData.skinColor}
                    onChange={(e) =>
                      setFormData({ ...formData, skinColor: e.target.value })
                    }
                    label="Skin Colour"
                    variant="standard"
                  />
                  <TextField
                    value={formData.eyeColor}
                    id="standard-basic"
                    onChange={(e) =>
                      setFormData({ ...formData, eyeColor: e.target.value })
                    }
                    label="Eye Colour"
                    variant="standard"
                  />
                  <TextField
                    id="standard-basic"
                    value={formData.outfit}
                    onChange={(e) =>
                      setFormData({ ...formData, outfit: e.target.value })
                    }
                    label="Outfit (Last seen wearing)"
                    variant="standard"
                  />


                  {/* <TextField
                    id="standard-basic"
                    className="form-control"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    inputProps={{ maxLength: 10 }} // Set maxLength to 10
                    label="Phone Number"
                    variant="standard"
                    onInput={(event) => {
                      const value = event.target.value;
                      if (/[^0-9]/.test(value)) {
                        event.target.value = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                      }
                    }}
                    />
                    {(formData.phoneNumber !== '' && formData.phoneNumber.length < 10) && (
                      <Stack direction="horizontal" gap={2}>
                        <Badge bg="danger">Enter Only 10 Digits</Badge>
                      </Stack>
                    )} */}

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
                    value={formData.placeOfIssue}
                    onChange={(e) =>
                      setFormData({ ...formData, placeOfIssue: e.target.value })
                    }
                    label="Place of Issue"
                    variant="standard"
                  />
                  {/* <TextField
                    id="standard-basic"
                    onChange={(e) =>
                      setFormData({ ...formData, issuedOn: e.target.value })
                    }
                    label="Issued On"
                    variant="standard"
                  /> */}
                  <div className="form-control dateDiv">
                    <div className="date-picker-container">
                      <Flatpickr
                        id="date-picker"
                        value={issuedOn}
                        onChange={([newDate]) => setissuedOn(newDate)}
                        dateFormat="d/m/Y"
                        className="form-control flatpickr-input border-0"
                        style={{
                          outline: 'none',
                          boxShadow: 'none',
                        }}
                        placeholder="Issued On"
                        options={{
                          dateFormat: "d/m/Y",
                          altInput: true,
                          maxDate: 'today',
                          altFormat: "d/m/Y",
                          allowInput: true,
                        }}
                      />
                      <TodayIcon className="calendar-icon" />
                    </div>
                  </div>
                  <TextField
                    id="standard-basic"
                    value={formData.panNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, panNumber: e.target.value.toLocaleUpperCase() })
                    }
                    label="PAN Number"
                    variant="standard"
                  />
                   {(!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber) && formData.panNumber !== "") && (
                      <Stack direction="horizontal" gap={2}>
                        <Badge bg="danger">Please enter a valid PAN number (e.g., ABCDE1234F).</Badge>
                      </Stack>
                    )}
                  <TextField
                    id="standard-basic"
                    value={formData.suspectBriefHistory}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        suspectBriefHistory: e.target.value,
                      })
                    }
                    label="Suspect Brief History"
                    variant="standard"
                  />
                  <TextField
                    id="standard-basic"
                    value={formData.policeStation}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        policeStation: e.target.value,
                      })
                    }
                    label="Police Station"
                    variant="standard"
                  />
                  <TextField
                    id="standard-basic"
                    value={formData.sections}
                    onChange={(e) =>
                      setFormData({ ...formData, sections: e.target.value })
                    }
                    label="Sections"
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
                 
                </div>
                <div className="form_fields_right">
                  <TextField
                    id="standard-basic"
                    label="If DMS/DAW ID"
                    value={formData.dmsDawId}
                    variant="standard"
                    onChange={(e) =>
                      setFormData({ ...formData, dmsDawId: e.target.value })
                    }
                  />
                  <TextField
                    id="standard-basic"
                    label="Distinguishing Marks ( Tattoos, Scars, Pace, etc )"
                    variant="standard"
                    value={formData.distinguishingMarks}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        distinguishingMarks: e.target.value,
                      })
                    }
                  />
                  <Box className="box" sx={{ alignItems: "center" }}>
                    <Typography className="build_field">Gender</Typography>
                    <div style={{ marginLeft: "3rem" }}>
                      <RadioGroup
                        row
                        name="build"
                        value={selectedGender}
                        onChange={handleGenderChange}
                      >
                        <FormControlLabel
                          value="Male"
                          control={<Radio />}
                          label="Male"
                        />
                        <FormControlLabel
                          value="Female"
                          control={<Radio />}
                          label="Female"
                        />
                        <FormControlLabel
                          value="Others"
                          control={<Radio />}
                          label="Others"
                        />
                       
                      </RadioGroup>
                    </div>
                  </Box>

                  <TextField
                    id="standard-basic"
                    value={formData.height}
                    label="Height"
                    variant="standard"
                    onChange={(e) =>
                      setFormData({ ...formData, height: e.target.value })
                    }
                  />
                  <TextField
                    id="standard-basic"
                    value={formData.hairColorStyle}
                    label="Hair Colour & Style"
                    variant="standard"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hairColorStyle: e.target.value,
                      })
                    }
                  />
                  <TextField
                    id="standard-basic"
                    label="Address"
                    value={formData.address}
                    variant="standard"
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                  {/* <TextField
                    id="standard-basic"
                    label="Email"
                    value={formData.email}
                    variant="standard"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  {(!emailPattern.test(formData.email) && formData.email !== '') && (
                        <Stack direction="horizontal" gap={2}>
                          <Badge bg="danger">Enter Valid Email Format (abc@xyz.com)</Badge>
                        </Stack>
                      )} */}

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
                    value={formData.passportNumber}
                    variant="standard"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        passportNumber: e.target.value,
                      })
                    }
                  />
                  <TextField
                    id="standard-basic"
                    label="Country of Issue "
                    value={formData.countryOfIssue}
                    variant="standard"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        countryOfIssue: e.target.value,
                      })
                    }
                  />
                  {/* <TextField
                    id="standard-basic"
                    label="Valid Till"
                    variant="standard"
                    onChange={(e) =>
                      setFormData({ ...formData, validTill: e.target.value })
                    }
                  /> */}

                  <div className="form-control dateDiv">
                    <div className="date-picker-container">
                      <Flatpickr
                        id="date-picker"
                        value={validTill}
                        onChange={([newDate]) => setvalidTill(newDate)}
                        dateFormat="d/m/Y"
                        className="form-control flatpickr-input border-0"
                        style={{
                          outline: 'none',
                          boxShadow: 'none',
                        }}
                        placeholder="Valid Till"
                        options={{
                          dateFormat: "d/m/Y",
                          altInput: true,
                          altFormat: "d/m/Y",
                          allowInput: true,
                        }}
                      />
                      <TodayIcon className="calendar-icon" />
                    </div>
                  </div>

                  <TextField
                    id="standard-basic"
                    label="Social Media Occurrence "
                    value={formData.socialMediaOccurrence}
                    variant="standard"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialMediaOccurrence: e.target.value,
                      })
                    }
                  />
                  <TextField
                    id="standard-basic"
                    label="FIR Lodged"
                    variant="standard"
                    value={formData.firLodged}
                    onChange={(e) =>
                      setFormData({ ...formData, firLodged: e.target.value })
                    }
                  />
                  <TextField
                    id="standard-basic"
                    label="FIR NO"
                    variant="standard"
                    value={formData.firNo}
                    onChange={(e) =>
                      setFormData({ ...formData, firNo: e.target.value })
                    }
                  />

                  {renderDropField(
                    getRootProps2,
                    getInputProps2,
                    isDragActive2,
                    "Upload Photocopy / Document of FIR",
                    
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
                </div>
              </div>
            </>
          ) : (
            <>
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
                    onInput={(event) => handleRelativeInputs(event, i,"name")}
                  />
                  <TextField
                    id="standard-basic"
                    label="Relative Address"
                    variant="standard"
                    value={sus.address}
                    onInput={(event) => handleRelativeInputs(event, i,"address")}
                  />

                  {sus.phone.map((num, numI) => (
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
                        
                        {sus.phone.length > 1 && (
                          <button
                            className="btn btn-danger"
                            onClick={(e) => removePhone(numI, e, i)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-minus-fill" viewBox="0 0 16 16">
                              <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877zM10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5"/>
                            </svg>
                          </button>
                        )}
                        {numI === sus.phone.length - 1 && (
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
                    value={sus.aadhaar_no}
                   
                    onInput={(event) => {
                      const value = event.target.value;
                      if (/[^0-9]/.test(value)) {
                        event.target.value = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                      }
                      handleRelativeInputs(event, i,"aadhaar_no")
                    }}
                    
                  />
                  {(sus.aadhaar_no !== '' && sus.aadhaar_no.length < 12) && (
                    <Stack direction="horizontal" gap={2}>
                      <Badge bg="danger">Enter Only 12 Digits</Badge>
                    </Stack>
                  )}

                    <TextField
                      id="standard-basic"
                      label="PAN Number"
                      variant="standard"
                      value={sus.pan_no.toLocaleUpperCase()}
                      onInput={(event) => handleRelativeInputs(event, i,"pan_no")}
                    />
                    {(!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(sus.pan_no) && sus.pan_no !== "") && (
                      <Stack direction="horizontal" gap={2}>
                        <Badge bg="danger">Please enter a valid PAN number (e.g., ABCDE1234F).</Badge>
                      </Stack>
                    )}
                </div>
                <div className="form_fields_right">

                <TextField
                    id="standard-basic"
                    label="Relationship"
                    variant="standard"
                    value={sus.relationship}
                    onInput={(event) => handleRelativeInputs(event, i,"relationship")}
                  />
                  <TextField
                    id="standard-basic"
                    label="Relative Age"
                    variant="standard"
                    value={sus.age}
                    onInput={(event) => handleRelativeInputs(event, i,"age")}
                  />


                  {sus.email.map((mail, mailI) => (
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
                        {sus.email.length > 1 && (
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
                        {mailI === sus.email.length - 1 && (
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
                    label="Passport Number"
                    variant="standard"
                    value={sus.passport_no}
                    onInput={(event) => handleRelativeInputs(event, i,"passport_no")}
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

                    <div style={{
                      marginLeft: '30rem',
                    }}>
                      {(relativeDetails.length > 1) && (
                        <button style={
                          {
                            width: '150px',
                            height: 'Hug(39.13px) px',
                            marginTop: '3rem',
                            
                            borderRadius: '7.65px',
                            opacity: '0px',
                            backgroundColor: '#ff0000',
                            color: 'white',
                        }
                        } onClick={(e) => removeRelative(i, e)}><PersonRemoveAlt1Icon/> Remove</button>
                      )}
                      {(i === relativeDetails.length - 1) && (
                        <button style={
                          {
                            width: '150px',
                            height: 'Hug(39.13px) px',
                            marginTop: '3rem',
                            marginLeft: '10px',
                            borderRadius: '7.65px',
                            opacity: '0px',
                            backgroundColor: '#022759',
                            color: 'white',
                        }
                        } id="button-addon2" onClick={(e)=> handleRelativeAdd(e, sus.name)}><PersonAddAlt1Icon /> Add Relative</button>
                      )}
                     {(error) && (
                       <Stack direction="horizontal" gap={2}>
                       <Badge bg="danger">{error}</Badge>
                     </Stack>
                     )}
                    </div>


                </div>
              </div>
                </>

              ))}
              <hr />
              <br />
              <h2 className="heading_suspect_det">Forensic Evidence</h2>
              <div className="form_fields_div1">
                <div className="form_fields_left">
                  <Box
                    className="box"
                    sx={{ alignItems: "center", marginTop: "1rem" }}
                  >
                    <Typography className="build_field">
                      Fingerprints
                    </Typography>
                    <div style={{ marginLeft: "3rem" }}>
                      <FormControlLabel
                        control={
                          <Radio
                            value="yes"
                            checked={formData.fingerprints === "yes"}
                            onChange={handleRadioChange}
                          />
                        }
                        label="Yes"
                      />
                      <FormControlLabel
                        control={
                          <Radio
                            value="no"
                            checked={formData.fingerprints === "no"}
                            onChange={handleRadioChange}
                          />
                        }
                        label="No"
                      />
                    </div>
                  </Box>
                  {renderDropField(
                    getRootProps41,
                    getInputProps41,
                    isDragActive41,
                    "Fingerprints Copy"
                  )}
                  <p className="text-sm text-gray-500" style={{
                    marginTop:'-30px',
                    color: "gray"
                  }}>
                    Attach file. File size of your documents should not exceed 10MB
                  </p>
                  {(alert41 === 'Path Fetched') ?  
                    (
                        <Box>
                            <Typography variant="h6">Uploaded Files:</Typography>
                            {renderFileList41()}
                        </Box>
                    ) : (alert41 === 'Path Fetched Failed') && (
                        <Stack direction="horizontal">
                          <Badge bg="danger">File Upload Failed....!</Badge>
                        </Stack>
                    )}
                  <br />
                  <Box className="box" sx={{ alignItems: "center" }}>
                    <Typography className="build_field">Shoe Prints</Typography>
                    <div style={{ marginLeft: "3rem" }}>
                      <FormControlLabel
                        control={
                          <Radio
                            name="yes"
                            value="yes"
                            checked={formData.Shoe_Prints === "yes"}
                            onChange={handleRadioChange2}
                          />
                        }
                        label="Yes"
                      />
                      <FormControlLabel
                        control={
                          <Radio
                            value="no"
                            checked={formData.Shoe_Prints === "no"}
                            onChange={handleRadioChange2}
                          />
                        }
                        label="No"
                      />
                    </div>
                  </Box>
                  {renderDropField(
                    getRootProps42,
                    getInputProps42,
                    isDragActive42,
                    "Shoe Prints Copy"
                  )}
                  <p className="text-sm text-gray-500" style={{
                    marginTop:'-30px',
                    color: "gray"
                  }}>
                    Attach file. File size of your documents should not exceed 10MB
                  </p>
                  {(alert42 === 'Path Fetched') ?  
                    (
                        <Box>
                            <Typography variant="h6">Uploaded Files:</Typography>
                            {renderFileList42()}
                        </Box>
                    ) : (alert42 === 'Path Fetched Failed') && (
                        <Stack direction="horizontal">
                          <Badge bg="danger">File Upload Failed....!</Badge>
                        </Stack>
                    )}
                  
                  <br />
                </div>
                <div className="form_fields_right">
                  <Box className="box" sx={{ alignItems: "center" }}>
                    <Typography className="build_field">
                      DNA Evidence
                    </Typography>
                    <div style={{ marginLeft: "3rem" }}>
                      <FormControlLabel
                        control={
                          <Radio
                            name="yes"
                            value="yes"
                            checked={formData.DNA_Evidence === "yes"}
                            onChange={handleRadioChange3}
                          />
                        }
                        label="Yes"
                      />
                      <FormControlLabel
                        control={
                          <Radio
                            value="no"
                            checked={formData.DNA_Evidence === "no"}
                            onChange={handleRadioChange3}
                          />
                        }
                        label="No"
                      />
                    </div>
                  </Box>
                  {renderDropField(
                    getRootProps43,
                    getInputProps43,
                    isDragActive43,
                    "DNA Evidence Copy"
                  )}
                  <p className="text-sm text-gray-500" style={{
                    marginTop:'-30px',
                    color: "gray"
                  }}>
                    Attach file. File size of your documents should not exceed 10MB
                  </p>
                  {(alert43 === 'Path Fetched') ?  
                    (
                        <Box>
                            <Typography variant="h6">Uploaded Files:</Typography>
                            {renderFileList43()}
                        </Box>
                    ) : (alert43 === 'Path Fetched Failed') && (
                        <Stack direction="horizontal">
                          <Badge bg="danger">File Upload Failed....!</Badge>
                        </Stack>
                    )}
                  
                  <br />
                  <Box className="box" sx={{ alignItems: "center" }}>
                    <Typography className="build_field">
                      Handwriting Analysis
                    </Typography>
                    <div style={{ marginLeft: "3rem" }}>
                      <FormControlLabel
                        control={
                          <Radio
                            name="yes"
                            value="yes"
                            checked={formData.Handwriting_Analysis === "yes"}
                            onChange={handleRadioChange4}
                          />
                        }
                        label="Yes"
                      />
                      <FormControlLabel
                        control={
                          <Radio
                            value="no"
                            checked={formData.Handwriting_Analysis === "no"}
                            onChange={handleRadioChange4}
                          />
                        }
                        label="No"
                      />
                    </div>
                  </Box>
          
                  {renderDropField(
                    getRootProps44,
                    getInputProps44,
                    isDragActive44,
                    "Handwriting Analysis Copy"
                  )}
                  <p className="text-sm text-gray-500" style={{
                    marginTop:'-30px',
                    color: "gray"
                  }}>
                    Attach file. File size of your documents should not exceed 10MB
                  </p>
                  {(alert44 === 'Path Fetched') ?  
                    (
                        <Box>
                            <Typography variant="h6">Uploaded Files:</Typography>
                            {renderFileList44()}
                        </Box>
                    ) : (alert44 === 'Path Fetched Failed') && (
                        <Stack direction="horizontal">
                          <Badge bg="danger">File Upload Failed....!</Badge>
                        </Stack>
                    )}

                  {/* <button className="add_relative">
                    <PersonAddAlt1Icon /> Add Evidence
                  </button> */}
                </div>
              </div>
              <hr />
              <br />
              <h2 className="heading_suspect_det">
                Officer Notes & Additional Information
              </h2>
              <div style={{ margin: "0rem 2rem 3rem 2rem" }}>
                <TextField
                  fullWidth
                  id="standard-basic"
                  label="Remarks"
                  variant="standard"
                  onChange={(e) =>
                    setFormData({ ...formData, remarks: e.target.value })
                  }
                />
                <br />
                <br />
                <br />
                <TextField
                  fullWidth
                  id="standard-basic"
                  label="Suspect Enquiry Report"
                  variant="standard"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      suspect_enquiry_report: e.target.value,
                    })
                  }
                />
              </div>
            </>
          )}

          <div className="buttons">
            <button className="btn1_form" onClick={Draft_form}>SAVE AS DRAFT</button>
            {showNextFields && (
              <button className="btn2_form" onClick={handlePrevClick}>
                PREV
              </button>
            )}
            {showNextFields && (
              <button className="btn2_form" onClick={discreet_form}>
                Submit
              </button>
            )}
            {!showNextFields && (
              <button className="btn2_form" onClick={handleNextClick}>
              NEXT
            </button>
            )}
            

          </div>
        </div>
      </div>
    </>
  );
};

export default Discrete_Enquiry_Form;
