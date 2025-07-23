import React, { useState } from "react";
import { authApi } from "../core/url";
import CustomInput from "../utils/CustomInput";
import CustomButton from "../utils/CustomButton";
import { showAxiosError, successMessage } from "../core/Toast";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authApi.post("/login", { username, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("accountNumber", response.data.accountNumber);
      successMessage("Login Success");
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      showAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-md mx-auto p-6 bg-gray-50 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
        <CustomInput
          label="Username"
          value={username}
          onChange={setUsername}
          placeholder="Enter your username"
        />
        <CustomInput
          label="Password"
          value={password}
          onChange={setPassword}
          placeholder="Enter your password"
          type="password"
        />
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <CustomButton type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </CustomButton>
      </form>

      <p className="my-2">
        Dont have an Account :{" "}
        <Link className="text-blue-500 underline" to={"/register"}>
          Sign Up
        </Link>
      </p>
    </div>
  );
}
