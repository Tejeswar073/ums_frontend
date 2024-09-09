import React ,{useState, useEffect} from 'react';
import { basepath } from "../../config";

import "../../css/HomageCSS/RecentReport.css"

const RecentReports
 = ({userDetails}) => {
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(basepath() + `/tab_data`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        tab     :   "raised",
                        email   :   userDetails.email,
                        design  :   userDetails.designation
                    }),
                });
                const data = await response.json();
                setProfiles(data['Data']); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="table-container">
            <div className='raised-header'>
                <div>Recent Reports</div>
                <div>Today</div>
            </div>
            <table>
                <thead className='raised-head'>
                    <tr>
                        <th>Outward No</th>
                        <th>Recipients(To/CC)</th>
                        <th></th>
                        <th>Report Type</th>
                        <th>Current Status</th>
                    </tr>
                </thead>
                <tbody className='raised-body'>
                    {profiles.map((row, index) => (
                        <tr key={index}>
                            <td>{row.outward_no}</td>
                            <td>{row.address_to}</td>
                            <td>:{row.cc}</td>
                            <td>{row.report_type}</td>
                            <td>{row.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecentReports
;
