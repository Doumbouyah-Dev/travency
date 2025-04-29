import React from "react";
import { useAuth } from "../contexts/AuthContext"; // Adjust according to your project
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { userInfo } = useAuth(); // Fetch logged-in user's info

  if (!userInfo) return <div>Loading...</div>;

  return (
    <div className="profile-page">
     {userInfo.avatar && (
  <img src={userInfo.avatar} alt="avatar" style={{ width: "100px" }} />
)}
      <h1>My Profile</h1>
      <p><strong>Name:</strong> {userInfo.name}</p>
      <p><strong>Email:</strong> {userInfo.email}</p>
      <p><strong>Role:</strong> {userInfo.role}</p>
     

        <Link to="/edit-profile">
        <button>Edit Profile</button>
      </Link>
    </div>
  );
};
export default ProfilePage;


