import React, { useState, useEffect } from 'react';
import { basepath } from "../../config";

import styled from 'styled-components';
import "../../css/HomageCSS/TotalReports.css"
// import ReportCounts from './ReportCount';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
`;

const ReportCard = styled.div`
  background-color: ${(props) => props.bgColor};
  color: white;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ReportTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const ReportCount = styled.div`
  font-size: 36px;
  font-weight: bold;
`;

const TotalReports = ({ userDetails }) => {
    const [counts, setCounts] = useState([]);

    const count_types = ['Approved', 'Reverted', 'Rejected', 'Raised']

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(basepath() + `/tab_count`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: userDetails.email,
                        design: userDetails.designation
                    }),
                });
                const data = await response.json();
                setCounts(data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const getCount = (countType) => {
        const key = countType.toLowerCase()
        return counts[key] || 0;
    };

    const reports = [
        { title: 'Approved', count: getCount('Approved'), bgColor: '#39B77F' },
        { title: 'Reverted', count: getCount('Reverted'), bgColor: '#5284FF' },
        { title: 'Rejected', count: getCount('Rejected'), bgColor: '#FF6860' },
        { title: 'Pending', count: getCount('raised'), bgColor: '#FFA700' },
    ];
    console.log(reports,"reports")

    return (
        <>
            {/* <div className='reports-header'>
                <div>Total Reports</div>
                <div>this week</div>
            </div>
            <div class="grid-container-report">
                {count_types.map((count_type,index) => (
                    <ReportCount key={index} report={count_type} count={getCount(count_type)} />
                ))}
            </div> */}
            {/* <DashboardContainer>
                {reports.map((report, index) => (
                    <ReportCard key={index} bgColor={report.bgColor}>
                        <ReportTitle>{report.title}</ReportTitle>
                        <ReportCount>{report.count}</ReportCount>
                    </ReportCard>
                ))}
            </DashboardContainer> */}
            <div className="dashboard-container">
                {reports.map((report, index) => (
                    <div
                        key={index}
                        className="report-card"
                        style={{ backgroundColor: report.bgColor }}
                    >
                        <div className="report-title">{report.title} Reports</div>
                        <div className="report-count">{report.count}</div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default TotalReports;
