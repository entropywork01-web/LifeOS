import "../styles/Auth.css";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Welcome Back 👋</h1>

        <p className="auth-subtitle">
          Sign in to continue your LifeOS journey.
        </p>

        <input
          type="email"
          placeholder="Email Address"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <button className="auth-btn">
          Sign In
        </button>

        <p className="auth-switch">
          Don't have an account? <span onClick={() => navigate("/signup")}>
  Sign Up
</span>
        </p>
      </div>
    </div>
  );
}

export default Login;