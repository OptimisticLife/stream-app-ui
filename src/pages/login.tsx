import { useEffect, useState } from "react";
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

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { navigate } = useNav();
  const [loginStatus, setLoginStatus] = useState("");
  const { isAuthenticated, refreshAuthStatus, setLoggedUser } = useAuth();

  useEffect(() => {
    console.log("isAuthenticated from Login:", isAuthenticated);
    if (isAuthenticated) {
      navigate("/"); // Redirect to the dashboard
    }
  }, [isAuthenticated, navigate]);

  const loginBtnHandler = async () => {
    const requestOptions: requestOptionsType = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        password,
      }),
    };

    try {
      const response = await fetch("/api/login", requestOptions);
      // const data = await response.json();
      const bodyRes = await response.json();

      console.log("Data from the server:", bodyRes);
      if (response.ok) {
        setLoginStatus("");
        refreshAuthStatus();
        if (bodyRes.userName) {
          console.log("UserName logged:", bodyRes.userName);
          setLoggedUser(bodyRes.userName);
          localStorage.setItem("loggedUser", bodyRes.userName);
        }
        console.log("Login successful");
        navigate("/");
        // Redirect to the dashboard
      } else {
        if (response.status === 401) {
          setLoginStatus("Invalid username or password.");
        } else {
          setLoginStatus("An error occurred. Please try again.");
        }
      }
    } catch (err) {
      console.log("Error in logging in..", err);
    }
  };

  return (
    <div className="login">
      <p className="login-title section-title ">Login for Movie Times</p>
      <div className="login-form">
        <input
          type="text"
          placeholder="Username or Email"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button
          className="submit-btn"
          onClick={loginBtnHandler}
          disabled={!userName || !password}
        >
          Login
        </button>
        {loginStatus && <pre className="status">{loginStatus}</pre>}
        {
          <pre className="info">
            New user ? Kindly{" "}
            <a href="/register" className="info-link">
              register
            </a>{" "}
            with us.
          </pre>
        }
      </div>
    </div>
  );
}
