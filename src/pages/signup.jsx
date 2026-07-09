function Signup() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create Your Account 🚀</h1>

        <p>Start organizing your life with LifeOS.</p>

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

        <button>Create Account</button>

        <p>
          Already have an account? <span>Sign In</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;