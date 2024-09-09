import React from 'react';
import { Card, Container, Row, Col, Form } from 'react-bootstrap';
import '../css/ReportCard.css';
import Chart from '../../public/Chart.svg';
const TotalReports = () => {
  const reports = [
    { title: 'Discrete Report', count: 23, color: '#29AB91' },
    { title: 'Radicalisation Report', count: 88, color: '#377DFF' },
    { title: 'Open Report', count: 67, color: '#9590A8' },
    { title: 'De-Radicalisation Report', count: 67, color: '#FFA600' },
    { title: 'Vital Installation', count: 9, color: '#2D82B7CC' },
    { title: 'ICP', count: 67, color: '#4ADBC8' },
    { title: 'Hoax Call', count: 67, color: '#9590A8' },
    { title: 'Madarsa', count: 67, color: '#FFA600' },
    { title: 'Minutes of Meeting', count: 88, color: '#EB8A90' },
    { title: 'Lodged FIR/Missing', count: 88, color: '#D0AB4C' },
  ];

  return (
    <>
    <Container className="ReportCards bg-white shadow">
      <div>
        <Row className="ReportHead">
          <Col>
            <h4 className="m-0" >Total Reports</h4>
          </Col>
          <Form.Select size="sm" style={{ width: '120px',borderRadius: '8px', borderColor:'rgba(2, 39, 89, 1)' }}>
              <option value={'Today'}>Today</option>
              <option value={'Yesterday'}>Yesterday</option>
              <option value={'This Week'}>This Week</option>
              <option value={'This Month'}>This Month</option>
          </Form.Select>
        </Row>
      </div>
    <div>
      <Row style={{gap:'20px'}}>
        {reports.map((report, index) => (
            <Card 
              style={{ 
                backgroundColor: report.color, 
                borderRadius: '15px',
                overflow: 'hidden',
              }}
            >
              <Card.Body className="cardBody">
                <div className="text-white">
                  <div style={{ fontSize: '16px', fontWeight: 'bold', marginLeft:'-56px' }}>{report.title}</div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', marginLeft:'-56px'  }}>{report.count}</div>
                </div>
                <div className='chartSVG'>
                    <img src={Chart} />
                </div>
              </Card.Body>
            </Card>
        ))}
      </Row>
    </div>
  </Container>
  </>
  );
  
};

export default TotalReports;
