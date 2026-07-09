function Login() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Welcome Back 👋</h1>

        <p>Sign in to continue to LifeOS.</p>

        <input
          type="email"
          placeholder="Email Address"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <button>Sign In</button>

        <p>
          Don't have an account? <span>Sign Up</span>
        </p>
      </div>
    </div>
  );
}

export default Login;