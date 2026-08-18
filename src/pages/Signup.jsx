import "./Login.css";

export default function Signup() {
  const handleSignup = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="login-page">
      <div className="login-container">

        <div className="login-header">
          <h1>SOC COMMAND</h1>
          <p>Security Operations Center</p>
        </div>

        <div className="login-box">

          <h2>Create Account</h2>

          <p className="login-subtitle">
            Create your SOC Command account
          </p>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
            />
          </div>

          {/* Username */}
          <div className="form-group">
            <label>Username</label>

            <input
              type="text"
              placeholder="Choose a username"
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Create a password"
            />
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label>Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm your password"
            />
          </div>

          {/* Sign Up */}
          <button
            className="signin-button"
            onClick={handleSignup}
          >
            Create Account
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          {/* Google */}
          <button
            className="google-button"
            onClick={(e) => e.preventDefault()}
          >
            <span className="google-icon">G</span>
            Sign up with Google
          </button>

          {/* Back to Login */}
          <p className="signup-text">
            Already have an account?{" "}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/";
              }}
            >
              Sign in
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}