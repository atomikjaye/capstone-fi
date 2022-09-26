import React, { useState, useContext } from 'react';
import { UserContext } from '../../UserContext';

function Login() {
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
          r.json().then((user) => setUser(user));
        } else {
          r.json().then((err) => setErrors(err.errors))
        }
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        autoComplete="off"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button type="submit">{isLoading ? "Loading..." : "Login"}</button>

      <br />
      {errors.map((err) => (
        <div key={err}>{err}</div>
      ))}
    </form>
  );
}
export default Login;
