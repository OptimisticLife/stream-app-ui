import { useAuth } from "../hooks/auth";
import useNav from "../hooks/navigate";

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
  const { navigate } = useNav();
  const { refreshAuthStatus, setLoggedUser, loggedUser } = useAuth();
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
        refreshAuthStatus();
        setLoggedUser(""); // Refresh the authentication status
        navigate("/login"); // Redirect to the login page
      } else {
        if (response.status === 401) {
          refreshAuthStatus(); // Refresh the authentication status
          navigate("/login");
          setLoggedUser(""); // Refresh the authentication status
          // Redirect to the login page
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
      <pre className="app-title">Movie Times</pre>
      <div className="user-info">
        <pre className="logged-user">{loggedUser}</pre>
        <span
          className="material-symbols-outlined logout-btn"
          onClick={logoutHandler}
        >
          chip_extraction
        </span>
      </div>
    </div>
  );
}

export default DashboardNav;
