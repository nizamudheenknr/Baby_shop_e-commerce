import React from 'react';
import './UserProfile.css'; // Import custom CSS
import Navbar from '../Component/Navbar';


const UserProfile = () => {
    
    const username = localStorage.getItem("user.name") 
    const email = localStorage.getItem("user.email") 
   

    return (
        <>
            <Navbar />
            <div className="profile-container">
                <div className="profile-card">
                    <div className="profile-header">
                        {/* <img src=""alt="Profile" className="profile-pic" /> */}
                        <h2 className="card-title">User Profile:-</h2>
                    </div>
                    <div className="profile-info">
                        <div className="info-item">
                            <strong>User Name:</strong> {username}
                        </div>
                        <div className="info-item">
                            <strong>Email:</strong> {email}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserProfile;