import React from 'react';
import { Table, Form, Container, Row, Col, Badge } from 'react-bootstrap';
import '../css/RecentCard.css'
const RecentReports = () => {
  const reports = [
    { id: '123445', recipients: 'Sp@gmail.com : acp@gmail.com', reportType: 'Open Enquiry', status: 'Raised', time: '28 mins ago' },
    { id: '123445', recipients: 'Sp@gmail.com : acp@gmail.com', reportType: 'Lodged FIR', status: 'Raised', time: '28 mins ago' },
    { id: '123445', recipients: 'Sp@gmail.com : acp@gmail.com', reportType: 'Hoax Call', status: 'Raised', time: '28 mins ago' },
    { id: '123445', recipients: 'Sp@gmail.com : acp@gmail.com', reportType: 'Madarsa', status: 'Raised', time: '28 mins ago' },
    { id: '123445', recipients: 'Sp@gmail.com : acp@gmail.com', reportType: 'ICP', status: 'Raised', time: '28 mins ago' },
    { id: '123445', recipients: 'Sp@gmail.com : acp@gmail.com', reportType: 'Hoax Call', status: 'Raised', time: '28 mins ago' },
    { id: '123445', recipients: 'Sp@gmail.com : acp@gmail.com', reportType: 'Discrete Enquiry', status: 'Raised', time: '28 mins ago' },
    { id: '123445', recipients: 'Sp@gmail.com : acp@gmail.com', reportType: 'Vital Installation', status: 'Raised', time: '28 mins ago' },
    { id: '123445', recipients: 'Sp@gmail.com : acp@gmail.com', reportType: 'ICP', status: 'Raised', time: '28 mins ago' },
    { id: '123445', recipients: 'Sp@gmail.com : acp@gmail.com', reportType: 'Missing FIR', status: 'Raised', time: '28 mins ago' },
    { id: '123445', recipients: 'Sp@gmail.com : acp@gmail.com', reportType: 'Hoax Call', status: 'Raised', time: '28 mins ago' },
    { id: '123445', recipients: 'Sp@gmail.com : acp@gmail.com', reportType: 'Hoax Call', status: 'Raised', time: '28 mins ago' },
    { id: '123445', recipients: 'Sp@gmail.com : acp@gmail.com', reportType: 'Hoax Call', status: 'Raised', time: '28 mins ago' },
    { id: '123445', recipients: 'Sp@gmail.com : acp@gmail.com', reportType: 'Hoax Call', status: 'Raised', time: '28 mins ago' },
  ];

  return (
    <Container className="bg-white p-4 shadow RecentContainer">
      <Row className="align-items-center mb-3">
        <Col>
          <h4 className="m-0">Recent Reports</h4>
        </Col>
        <Col xs="auto">
          <Form.Select size="sm" style={{ width: '120px',borderRadius: '8px', borderColor:'rgba(2, 39, 89, 1)' }}>
              <option value={'Today'}>Today</option>
              <option value={'Yesterday'}>Yesterday</option>
              <option value={'This Week'}>This Week</option>
              <option value={'This Month'}>This Month</option>
          </Form.Select>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Table hover borderless>
          <thead>
            <tr>
              <th>Outward No</th>
              <th>Recipients (From/CC)</th>
              <th>Report Type</th>
              <th>Current Status</th>
            </tr>
          </thead>
          <tbody className='recentBody'>
            {reports.map((report, index) => (
              <tr key={index}>
                <td>
                  {report.id}
                  <br />
                  <small className="text-muted">{report.time}</small>
                </td>
                <td>{report.recipients}</td>
                <td>{report.reportType}</td>
                <td>
                  <div class="TdStatus bg-success p-2 text-success bg-opacity-10 text-center" style={{ backgroundColor: '#20c997' }}>
                    {report.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default RecentReports;