import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState("");

  const loginBtnHandler = async () => {
    const requestOptions = {
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
      const response = await fetch(
        "http://localhost:4647/login",
        requestOptions
      );
      // const data = await response.json();

      console.log("Data from the server:", response);
      if (response.status === 200) {
        setLoginStatus("");
        navigate("/"); // Redirect to the dashboard
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
      </div>
    </div>
  );
}
