import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const { userInfo, setUserInfo } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(userInfo.name || "");
  const [email, setEmail] = useState(userInfo.email || "");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(userInfo.avatar || "");

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await axios.post("/api/upload", formData);
      setAvatar(data.url);
      toast.success("Image uploaded");
    } catch (err) {
      toast.error("Upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put("/api/users/profile", {
        name,
        email,
        password: password || undefined, // only send password if filled
        avatar, // include avatar URL
      });

      setUserInfo(data); // Update context
      toast.success("Profile updated!");
      navigate("/profile");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed.");
    }
  };

  return (
    <div className="edit-profile-page">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>New Password (optional):</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Leave blank to keep current"
          />
        </div>

        <div>
          <label>Profile Picture:</label>
          <input type="file" onChange={uploadImage} />
          {avatar && <img src={avatar} alt="avatar" style={{ width: "100px", marginTop: "10px" }} />}
        </div>

        <button type="submit" style={{ marginTop: "15px" }}>Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfilePage;
