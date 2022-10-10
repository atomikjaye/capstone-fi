import React, { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import { Link, Navigate, useNavigate } from "react-router-dom";



function SignUp() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [errors, setErrors] = useState([]);
  const [isSigningUp, setIsSigningUp] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        first_name: firstName,
        email,
        avatar_url: avatarURL,
        is_admin: false,
        points: 0,
        password,
        password_confirmation: passwordConfirmation,
      }),
    })
      .then((r) => {
        setIsSigningUp(false);
        if (r.ok) {
          r.json().then((user) => {
            setUser(user);
            navigate('/profile');
          })
        } else {
          r.json().then((err) => {
            console.log(err)
            setErrors(err.errors)
          })
        }

      });
  }
  return (
    <div className="nes-container is-rounded with-title">
      <h2 class="title">SignUp Form</h2>

      <form onSubmit={handleSubmit}>
        <div className="nes-field">
          <label htmlFor="username">Username:</label>
          <input
            className="nes-input"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <br />
        <div className="nes-field">
          <label htmlFor="firstName">First Name:</label>
          <input
            className="nes-input"
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          /><br />
        </div>
        <div className="nes-field">
          <label htmlFor="email">Email:</label>
          <input
            className="nes-input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><br />
        </div>
        <div className="nes-field">
          <label htmlFor="avatarURL">Avatar URL:</label>
          <input
            className="nes-input"
            type="text"
            id="avatarURL"
            value={avatarURL}
            onChange={(e) => setAvatarURL(e.target.value)}
          /><br />
        </div>
        <div className="nes-field">
          <label htmlFor="password">Password:</label>
          <input
            className="nes-input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br />
        </div>
        <div className="nes-field">
          <label htmlFor="password_confirmation">Confirm Password:</label>
          <input
            className="nes-input"
            type="password"
            id="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          /><br />
        </div>
        <button className="nes-btn is-success" type=" submit">{isSigningUp ? "Signing up..." : "Submit"}</button>
        <br />
        {errors.map((err) => (
          <div key={err} className="nes-text is-error">{err}</div>
        ))}
      </form>
    </div >
  );


}

export default SignUp;