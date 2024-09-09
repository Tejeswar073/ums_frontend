import React ,{useState, useEffect} from 'react';
import { basepath } from "../../config";
import profile_png from '../../assets/profile_default.jpeg'

import "../../css/HomageCSS/Profiles.css"

const Profiles = ({userDetails}) => {
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(basepath() + `/profiles`, {
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
                setProfiles(data['profiles']); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="table-container">
            <table>
                <thead className='profile-head'>
                    <tr>
                        <th>Profile</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Aadhaar Number</th>
                        <th>PAN Number</th>
                    </tr>
                </thead>
                <tbody>
                    {profiles.map((row,index) => (
                        <tr key={index}>
                            <td>
                                <img src={row.profile_image ? `data:image/png;base64,${row.profile_image}` : profile_png} alt="Profile" className="profile-image" />
                            </td>

                            <td>{row.name}</td>
                            <td>{row.age}</td>
                            <td>{row.gender}</td>
                            <td>{row.aadhaar_no}</td>
                            <td>{row.pan_no}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Profiles;
