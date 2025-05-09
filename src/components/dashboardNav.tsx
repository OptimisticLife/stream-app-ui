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

const apiUrl = import.meta.env.VITE_API_URL;

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
      const response = await fetch(`${apiUrl}/logout`, requestOptions);
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          fill="rgb(253, 81, 81)"
          onClick={logoutHandler}
        >
          <path d="M480-120q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-480q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840v80q-117 0-198.5 81.5T200-480q0 117 81.5 198.5T480-200v80Zm160-160-56-57 103-103H360v-80h327L584-624l56-56 200 200-200 200Z" />
        </svg>
      </div>
    </div>
  );
}

export default DashboardNav;
