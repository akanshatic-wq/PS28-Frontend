import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter username and password.");
      return;
    }

    // Go to the existing dashboard
    navigate("/dashboard");
  };

  const handleGoogleLogin = () => {
    alert("Google sign-in will be connected later.");
  };

  const handleForgotPassword = () => {
    alert("Password reset will be connected later.");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="login-page">
      <div className="login-container">

        <div className="login-header">
          <h1>SOC COMMAND</h1>
          <p>Security Operations Center</p>
        </div>

        <div className="login-box">

          <h2>Sign In</h2>

          <p className="login-subtitle">
            Access your Security Operations Center
          </p>

          <form onSubmit={handleLogin}>

            {/* Username */}
            <div className="form-group">
              <label>Username</label>

              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Remember + Forgot */}
            <div className="login-options">

              <label className="remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>

              <a
                href="#forgot"
                onClick={(e) => {
                  e.preventDefault();
                  handleForgotPassword();
                }}
              >
                Forgot password?
              </a>

            </div>

            {/* Sign In */}
            <button
              type="submit"
              className="signin-button"
            >
              Sign In
            </button>

          </form>

          {/* Divider */}
          <div className="divider">
            <span>OR</span>
          </div>

          {/* Google */}
          <button
            className="google-button"
            onClick={handleGoogleLogin}
          >
            <span className="google-icon">G</span>
            Sign in with Google
          </button>

          {/* Sign Up */}
          <p className="signup-text">
            Don't have an account?{" "}
            <a
              href="/signup"
              onClick={(e) => {
                e.preventDefault();
                handleSignup();
              }}
            >
              Sign up
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}