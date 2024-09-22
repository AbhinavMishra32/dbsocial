import { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<{ email: string; password: string, username: string }>({
    email: "",
    password: "",
    username: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;

    if (!email) {
      setError((prev) => ({ ...prev, email: "Email is required" }));
    } else if (!emailRegex.test(email)) {
      setError((prev) => ({ ...prev, email: "Enter a valid email address" }));
    } else {
      setError((prev) => ({ ...prev, email: "" }));
    }
  
    if (!password) {
      setError((prev) => ({ ...prev, password: "Password is required" }));
    } else if (password.length < 8) {
      setError((prev) => ({
        ...prev,
        password: "Password must be at least 8 characters",
      }));
    } else {
      setError((prev) => ({ ...prev, password: "" }));
    }
  
    if (!username) {
      setError((prev) => ({ ...prev, username: "Username is required" }));
    } else {
      setError((prev) => ({ ...prev, username: "" }));
    }
  }

  return (
    <>
      <div className="border border-black flex justify-center items-center w-4/6 h-auto mx-auto content-center min-h-screen">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <span>Username</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="ring ring-blue-500 rounded-full"
            />
            {error.username && <p className="text-red-500">{error.username}</p>}
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="ring ring-blue-500 rounded-full"
            />
            {error.email && <p className="text-red-500">{error.email}</p>}
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange = {(e) => setPassword(e.target.value)}
              className="ring ring-blue-500 rounded-full" />
              {error.password && <p className="text-red-500">{error.password}</p>}
            <button type="submit" className="border border-red-500 rounded-full">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
