import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { registerUser } from "../../api/auth";
import { loginUser } from "../../api/auth";

export function AuthForm() {
  const { pathname } = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setLoggedIn } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let result;
      if (pathname === "/login") {
        result = await loginUser(username, password);
      } else {
        result = await registerUser(username, password);
      }
      if (result.success) {
        setLoggedIn(true);
        navigate("/me");
      }
    } catch (error) {
      setError(error);
    }
  }

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        {" "}
        <label>
          {" "}
          {pathname === "/login" ? (
            <h2>
              Login or
              <Link to="/register"> Register</Link>
            </h2>
          ) : (
            <h2>
              Register Below or
              <Link to="/login">Login</Link>
            </h2>
          )}
        </label>
        <label className="label" htmlFor="username">
          {" "}
          username:{" "}
        </label>
        <input
          value={username}
          required
          minLength={5}
          type="text"
          id="username"
          name="username"
          className="input"
          placeholder="Enter your username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label className="label" htmlFor="password">
          password:
        </label>
        <input
          required
          minLength={8}
          value={password}
          type="password"
          id="password"
          name="password"
          className="input"
          placeholder="Enter your password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="button">Submit</button>
      </form>
    </div>
  );
}
