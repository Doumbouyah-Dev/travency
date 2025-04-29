import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import ConsultantDashboard from "./pages/ConsultantDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <Routes>
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/consultant/dashboard"
          element={
            <ProtectedRoute allowedRoles={["consultant"]}>
              <ConsultantDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={["admin", "student", "consultant"]}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-profile"
        element={
          <ProtectedRoute allowedRoles={["admin", "student", "consultant"]}>
            <EditProfilePage />
          </ProtectedRoute>
        }
      />


    </div>
  );
}

export default App;