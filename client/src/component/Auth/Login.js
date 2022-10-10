import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';

function Login() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((r) => {
        setIsLoading(false);
        if (r.ok) {
          r.json().then((user) => {
            setUser(user);
            navigate('/profile');
          });
        } else {
          r.json().then((err) => setErrors(err.errors))
        }
      });
  }

  return (
    <div className="nes-container is-rounded with-title">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="nes-field">

          <label htmlFor="username">Username</label>
          <input
            className="nes-input"
            type="text"
            id="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /><br />
        </div>
        <div className="nes-field">

          <label htmlFor="password">Password</label>
          <input
            className="nes-input"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br />
        </div>
        <button className="nes-btn is-success" type="submit">{isLoading ? "Loading..." : "Login"}</button>

        <br />
        {errors.map((err) => (
          <div key={err} className="nes-text is-error">{err}</div>
        ))}
      </form>
    </div>
  );
}
export default Login;
