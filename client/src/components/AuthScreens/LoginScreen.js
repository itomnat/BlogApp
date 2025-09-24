import { useState, useContext } from "react";
import api from "../../utils/api";
import "../../Css/Login.css"
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  const { login } = useContext(AuthContext);

  const loginHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data } = await api.post(
        "/auth/login",
        { email, password }
      );
      
      // Use the login method from AuthContext
      login(data.user, data.token);

      setTimeout(() => {
        navigate("/")
      }, 1800)

    } catch (error) {
      console.error("Login error:", error);
      console.error("Error response:", error.response);
      
      let errorMessage = "Login failed. Please try again.";
      
      if (error.response?.status === 404) {
        errorMessage = "Server not available. Please try again later.";
      } else if (error.response?.status === 401) {
        errorMessage = "Invalid email or password.";
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      setTimeout(() => {
        setError("");
      }, 4500);

    } finally {
      setIsLoading(false);
    }
  };

  return (

    <div className="Inclusive-login-page">

      <div className="login-big-wrapper">

        <div className="section-wrapper">

          <div className="top-suggest_register">

            <span>Don't have an account? </span>
            <a href="/register">Sign Up</a>

          </div>

          <div className="top-login-explain">
            <h2>Login to Your Account </h2>

            <p>
              Please Login Your Account, Thank You!
            </p>


          </div>


          <form onSubmit={loginHandler} >
            {error && <div className="error_message">{error}</div>}
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
            <Link to="/forgotpassword" className="login-screen__forgotpassword"> Forgot Password ?
            </Link>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>

          </form>


        </div>

        <div className="login-banner-section ">

          <img src="login.png" alt="banner" width="400px" />
        </div>

      </div>


    </div>


  );
};

export default LoginScreen;