import "../styles/Auth.css";
import { useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create Account 🚀</h1>

        <p className="auth-subtitle">
          Join LifeOS and organize your entire life.
        </p>

        <input
          type="text"
          placeholder="Full Name"
        />

        <input
          type="email"
          placeholder="Email Address"
        />

        <input
          type="password"
          placeholder="Create Password"
        />

        <button className="auth-btn">
          Create Account
        </button>

        <p className="auth-switch">
          Already have an account? <span onClick={() => navigate("/login")}>
  Sign In
</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
