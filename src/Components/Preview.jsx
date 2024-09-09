import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const Preview = ({ show, handleClose, rowData }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Preview Ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="data-cell"><strong>Date:</strong> {rowData.created_date}</div>
        <div className="data-cell"><strong>Outward No:</strong> {rowData.outward_no}</div>
        <div className="data-cell"><strong>To:</strong> {Array.isArray(rowData.address_to) ? rowData.address_to.join(', ') : rowData.address_to}</div>
        <div className="data-cell"><strong>CC:</strong> {Array.isArray(rowData.cc) ? rowData.cc.join(', ') : rowData.cc}</div>
        <div className="data-cell"><strong>Enquiry Type:</strong> {rowData.enquiry_type}</div>
        <div className="data-cell"><strong>Request Type:</strong> {rowData.request_type || 'N/A'}</div>
        <div className="data-cell"><strong>Status:</strong> {rowData.status}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Preview;
