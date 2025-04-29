import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <h1>Welcome to Admin Dashboard!</h1>
      

      <Link to="/profile">My Profile</Link>

    </div>
  );
};

export default AdminDashboard;
