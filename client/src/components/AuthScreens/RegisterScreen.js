import { useState, useContext } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import "../../Css/Register.css"
import { AuthContext } from "../../Context/AuthContext";

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const registerHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 8000);
      return setError("Passwords do not match");
    }

    setIsLoading(true);
    setError("");

    try {
      const { data } = await api.post(
        "/auth/register",
        {
          username,
          email,
          password,
        }
      );

      // Show success message and redirect to login
      setSuccess("Registration successful! Please login with your credentials.");
      
      setTimeout(() => {
        navigate('/login');
      }, 2000)

    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          error.message || 
                          "Registration failed. Please try again.";
      setError(errorMessage);

      setTimeout(() => {
        setError("");
      }, 6000);
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <div className="Inclusive-register-page">

      <div className="register-big-wrapper">


        <div className="register-banner-section ">

          <img src="register.png" alt="banner" width="490px" />
        </div>

        <div className="section-wrapper">

          <div className="top-suggest_login">
            <span> Have an account? </span>
            <a href="/login">Sign In</a>
          </div>

          <div className="top-register-explain">
            <h2>Welcome to MyTwoCents </h2>

            <p>
              It's easy and free to post your thinking on any topic and connect with thounsands of readers.

            </p>


          </div>


          <form onSubmit={registerHandler} >
            {error && <div className="error_message">{error}</div>}
            {success && <div className="success_message">{success}</div>}
            <div className="input-wrapper">
              <input
                type="text"
                required
                id="name"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="name">Username</label>

            </div>
            <div className="input-wrapper">
              <input
                type="email"
                required
                id="email"
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                tabIndex={1}
              />
              <label htmlFor="email">E-mail</label>


            </div>
            <div className="input-wrapper">

              <input
                type="password"
                required
                id="password"
                autoComplete="true"
                placeholder="6+ strong character"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                tabIndex={2}
              />
              <label htmlFor="password">
                Password

              </label>
            </div>
            <div className="input-wrapper">

              <input
                type="password"
                required
                id="confirmpassword"
                autoComplete="true"
                placeholder="Confirm password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label htmlFor="confirmpassword">Confirm Password</label>
            </div>

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default RegisterScreen;