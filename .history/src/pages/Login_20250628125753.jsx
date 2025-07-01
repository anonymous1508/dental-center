import React , {useState} from "react";
import {useAuth} from "../contexts/AuthContext";
const Login =()=>{
    const {login} =useAuth();
    const[email, setEmail]=useState("");
    const[password,setPassword]=useState("");
    const [error, setError] = useState("");

    const handleSubmit=(e)=>{
        e.preventDefault();

        const success= login(email,password);
        if(!success) {setError("INVALID CREDENTIALS");}

    };



return (
      <div className="container" style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Login</h2>
      <form onSubmit={handleSubmit} className="card">
        <div>
          <label>Email:</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          />
        </div>
        {error && (
          <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
        )}
        <button type="submit" className="btn" style={{ width: "100%" }}>
          Login
        </button>
      </form>
    </div>
  )
};

export default Login;
