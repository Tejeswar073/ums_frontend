import React from 'react';
import { Table, Image, Container } from 'react-bootstrap';
import '../css/ProfileCard.css'
import profile_default from '../assets/profile_default.jpeg'
const ProfileTable = () => {
  const profiles = [
    { image: profile_default, name: 'दूसरे', age: 26, gender: 'M', aadhaar: '465678098123', pan: 'KSDE98760' },
    { image: profile_default, name: 'Ananya Pandey', age: 35, gender: 'F', aadhaar: '465678098123', pan: 'KSDE98760' },
    { image: profile_default, name: 'Mani', age: 43, gender: 'M', aadhaar: '465678098123', pan: 'KSDE98760' },
    { image: profile_default, name: 'गगांगा', age: 19, gender: 'M', aadhaar: '465678098123', pan: 'KSDE98760' },
    { image: profile_default, name: 'किसी', age: 28, gender: 'M', aadhaar: '465678098123', pan: 'KSDE98760' },
    { image: profile_default, name: 'कबीरदास', age: 29, gender: 'F', aadhaar: '465678098123', pan: 'KSDE98760' },
  ];

  return (
    <Container className="bg-white p-4 shadow ProfileContainer">
      <table className='table table-bordered'>
        <thead className='text-center'>
          <tr> 
            <th>Profile</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Aadhaar Number</th>
            <th>PAN Number</th>
          </tr>
        </thead>
        <tbody className='ProfileBody'>
          {profiles.map((profile, index) => (
            <tr key={index}>
              <td className='text-center'>
                <Image src={profile.image} roundedCircle width={40} height={40} />
              </td>
              <td>{profile.name}</td>
              <td className='text-center'>{profile.age}</td>
              <td className='text-center'>{profile.gender}</td>
              <td className='text-center'>{profile.aadhaar}</td>
              <td className='text-center'>{profile.pan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default ProfileTable;