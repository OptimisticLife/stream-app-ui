import { useState } from "react";
import useNav from "../hooks/navigate";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");
  const { navigate } = useNav();

  const registerBtnHandler = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        email,
        firstName,
        lastName,
        password,
        confirmPassword,
      }),
    };

    try {
      const apiResponse = await fetch("/api/register", requestOptions);
      const response = await apiResponse.json();
      console.log("Data from the server:", response);

      if (apiResponse.status === 200) {
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        if (apiResponse.status === 409) {
          setRegisterStatus("Username or Email already exist.");
        } else {
          setRegisterStatus("Registration failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <div className="register">
      <pre className="register-title section-title ">
        Register for Movie Times
      </pre>
      <div className="register-form">
        <div className="form-row">
          <input
            type="text"
            placeholder="UserName"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <input
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </div>
        <div className="form-row">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </div>
        <button
          className="submit-btn"
          onClick={registerBtnHandler}
          disabled={
            !userName ||
            !email ||
            !firstName ||
            !lastName ||
            !password ||
            !confirmPassword ||
            password !== confirmPassword
          }
        >
          Register
        </button>
        {registerStatus && <pre className="status">{registerStatus}</pre>}
        <pre className="info">
          Already Registered with us?. Kindly{" "}
          <a href="/login" className="info-link">
            login
          </a>{" "}
          .
        </pre>
      </div>
    </div>
  );
}
