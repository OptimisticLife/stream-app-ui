import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";

type credentialsType = "omit" | "same-origin" | "include";

type requestOptionsType = {
  method: string;
  credentials: credentialsType;
  headers: {
    "Content-Type": string;
  };
  body?: string;
};

function DashboardNav() {
  const navigate = useNavigate();
  const { refreshAuthStatus } = useAuth();
  const logoutHandler = async () => {
    const requestOptions: requestOptionsType = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(
        "http://localhost:4647/logout",
        requestOptions
      );
      if (response.ok) {
        console.log("Logout successful");
        refreshAuthStatus(); // Refresh the authentication status
        navigate("/login"); // Redirect to the login page
      } else {
        if (response.status === 401) {
          refreshAuthStatus(); // Refresh the authentication status
          navigate("/login"); // Redirect to the login page
        }
        console.error("Logout failed");
      }
    } catch (error) {
      refreshAuthStatus(); // Refresh the authentication status
      console.error("Error during logout:", error);
    }
  };
  return (
    <div className="dashboard-nav">
      <p className="app-title">Movie Times</p>
      <button className="logout-btn" onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
}

export default DashboardNav;
