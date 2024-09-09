import React, { useState } from 'react';
import { Button, Modal, Form , Row, Col,FloatingLabel} from 'react-bootstrap';
import {Select,FormControl,MenuItem,Radio,RadioGroup,InputLabel,OutlinedInput,Chip, TextField,FormControlLabel,Checkbox,Box,Typography} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import '../css/UserCreate.css';
import plus_icon from "../assets/plus.png";
import { basepath } from '../config';
import { useNavigate } from "react-router-dom";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
    },
  },
};
const UserCreationModal = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [Unit, setUnit] = React.useState([]);
    const [Designation, setDesignation] = useState('');
    const [UserName, setUsername] = useState('');
    const [Email, setEmail] = useState('');
    const [Phone, setPhone] = useState('');
    const [Password, setPassword] = useState('');

    

    const names = [
        'Nagpur Unit',
        'C.S. Nagar',
        'Akola Unit',
        'Thane Unit',
      ];
    const theme = useTheme();

    function getStyles(name, personName, theme) {
    return {
        fontWeight:
        personName.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
    };
    }
      
    const handleChangeTo = (event) => {
        const {
          target: { value },
        } = event;
        setUnit(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };

      async function register() {
        const response = await fetch(basepath() + "/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name        : UserName,
            email       : Email,
            unit        : Unit,
            password    : Password,
            mobilenumber: Phone,
            designation : Designation,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          alert(`${data.Message}`);
          clearall();
          handleClose();
        }
      }
      function clearall() {
        setDesignation('');
        setUsername('')
        setEmail('')
        setUnit([])
        setPassword('')
        setPhone('');
        setDesignation('');
      }
    return (
        <>
          <Button className="create_ticket_btn" onClick={handleShow}>
            <img src={plus_icon} alt="Plus icon" /> Create User
          </Button>
          <Modal 
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
        <Modal.Header closeButton>
          <Modal.Title>New User Creation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='form_div'>
                <div className='form_fields_div1'>
                    <div className='form_fields_left'>
                        <TextField
                            id="standard-basic"
                            className="form-control"
                            value={UserName}
                            onChange={(e) =>
                            setUsername(e.target.value )
                            }
                            label="Officer Name"
                            variant="standard"
                        />
                        
                        <FormControl variant="standard" className="form-control" style={{
                            marginTop:'10px'
                        }}>
                            <InputLabel id="demo-simple-select-standard-label">Designation</InputLabel>
                            <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={Designation || ''}  // Ensure `value` is never undefined
                            onChange={(e) =>
                                setDesignation(e.target.value)
                            }
                            >
                            <MenuItem key="" value="">
                            <em>Select Designation</em>
                            </MenuItem>
                            <MenuItem key="SP" value="SP">SP</MenuItem>,
                            <MenuItem key="ACP" value="ACP">ACP</MenuItem>,
                            <MenuItem key="PI" value="PI">PI</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                                id="standard-basic"
                                className="form-control"
                                type='number'
                                value={Phone}
                                onChange={(e) =>
                                setPhone(e.target.value )
                                }
                                label="Phone"
                                variant="standard"
                        />
                    </div>
                    <div className='form_fields_right'> 
                        <TextField
                            id="standard-basic"
                            className="form-control"
                            type='email'
                            value={Email}
                            onChange={(e) =>
                            setEmail(e.target.value )
                            }
                            label="Email"
                            variant="standard"
                        />
                        <FormControl className="form-control">
                            <InputLabel id="demo-multiple-chip-label">Unit</InputLabel>
                                {(Designation==='SP') ? 
                                    (
                                        <Select
                                        labelId="demo-multiple-chip-label"
                                        
                                        id="demo-multiple-chip"
                                        value={Unit}
                                        multiple
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
                                        >
                                        {names.map((name) => (
                                            <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(name, Unit, theme)}
                                            >
                                            {name}
                                            </MenuItem>
                                        ))}
                                        </Select>
                                    ) : 
                                    (
                                        <Select
                                        labelId="demo-multiple-chip-label"
                                        id="demo-multiple-chip"
                                        value={Unit}
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
                                        {names.map((name) => (
                                            <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(name, Unit, theme)}
                                            >
                                            {name}
                                            </MenuItem>
                                        ))}
                                        </Select>
                                    )
                                }
                        </FormControl>
                        <TextField
                            id="standard-basic"
                            className="form-control"
                            type='password'
                            value={Password}
                            onChange={(e) =>
                            setPassword(e.target.value )
                            }
                            label="Password"
                            variant="standard"
                        />
                    </div>
                </div>
                    
                    
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={register}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>

          </>
    )
    

}

export default UserCreationModal;