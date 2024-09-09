import React, { useState } from 'react';
import { Button, Modal, Form , Row, Col} from 'react-bootstrap';
import plus_icon from "../assets/plus.png";
import { useNavigate } from "react-router-dom";


const EnquiryFormModal = () => {
  const [show, setShow] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    setSelectedEnquiry(event.target.value);
  };
  
  const handleSubmit = () => {
    if (selectedEnquiry) {
      // onEnquirySelect(selectedEnquiry);
      navigate(`/marvel/form?type=${selectedEnquiry}`, { state: { selectedEnquiry } });
    } else {
      alert("Please select an enquiry type before proceeding.");
    }
  };

  return (
    <>
      <Button className="create_ticket_btn" onClick={handleShow}>
        <img src={plus_icon} alt="Plus icon" /> Create Reports
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
        <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "30px",
        
        }}
      >
        <div
          style={{
            borderBottom: "4px solid #AAB7C8",
            paddingBottom: "10px",
            width: "70%",
          }}
        >
          <h2>Enquiry Form</h2>
        </div>
        <Modal.Header closeButton style={{
          border:'none'
        }}>
        </Modal.Header>
      </div>

      <Form.Group controlId="formBasicSelect">
        <Row>
          <Col xs={6}>
            <Form.Control
              as="select"
              value={selectedEnquiry}
              onChange={handleSelectChange}
              style={{ borderRadius: "0.5rem" }}
            >
              <option value="">Select Enquiry type</option>
              <option>Discreet Enquiry</option>
              <option>Open Enquiry</option>
              <option>Radicalisation Enquiry</option>
              <option>De-Radicalisation Enquiry</option>
              <option>Lodged FIR Enquiry</option>
              <option>Missing Enquiry</option>
              <option>Minutes of Meeting</option>
              <option>Vital Installation</option>
              <option>ICP (Emergency Certificate)</option>
              <option>Hoax Call</option>
              <option>Madarsa</option>
            </Form.Control>
          </Col>
          <Col md={6}>
              <Button
                  variant="primary"
                  onClick={handleSubmit}
                  style={{
                    borderRadius: "0.5rem",
                    width: "100%",
                    background: "#0A3673B0",
                  }}
                >
                  NEXT
              </Button>
          </Col>
        </Row>
      </Form.Group>
        </Modal.Body>
        <Modal.Footer>
        
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EnquiryFormModal;