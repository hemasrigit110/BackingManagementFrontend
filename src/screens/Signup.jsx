import React, { useState } from "react";
import { authApi } from "../core/url";
import CustomInput from "../utils/CustomInput";
import CustomButton from "../utils/CustomButton";
import CustomSelect from "../utils/CustomSelect";
import { showAxiosError, successMessage } from "../core/Toast";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const [ifscCode, setIfscCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate fields
    if (!username) {
      setError("Please enter a username.");
      setLoading(false);
      return;
    }
    if (!password) {
      setError("Please enter a password.");
      setLoading(false);
      return;
    }
    if (!accountHolderName) {
      setError("Please enter the account holder name.");
      setLoading(false);
      return;
    }
    if (!accountNumber) {
      setError("Please enter an account number.");
      setLoading(false);
      return;
    }

    if (!ifscCode) {
      setError("Please enter an IFSC code.");
      setLoading(false);
      return;
    }

    try {
      const response = await authApi.post("/register", {
        username,
        password,
        accountHolderName,
        accountNumber,

        ifscCode,
      });
      successMessage("Sign-up Successful! Please log in.");
      navigate("/");
    } catch (err) {
      showAxiosError(err);
      setError("Sign-up failed. Please try again.");
      console.error("Sign-up error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-md mx-auto p-6 bg-gray-50 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
        <CustomInput
          label="Username"
          value={username}
          onChange={setUsername}
          placeholder="Enter your username"
          type="text"
        />
        <CustomInput
          label="Password"
          value={password}
          onChange={setPassword}
          placeholder="Enter your password"
          type="password"
        />
        <CustomInput
          label="Account Holder Name"
          value={accountHolderName}
          onChange={setAccountHolderName}
          placeholder="Enter account holder name"
          type="text"
        />
        <CustomInput
          label="Account Number"
          value={accountNumber}
          onChange={setAccountNumber}
          placeholder="Enter account number"
          type="text"
        />

        <CustomInput
          label="IFSC Code"
          value={ifscCode}
          onChange={setIfscCode}
          placeholder="Enter IFSC code"
          type="text"
        />
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <CustomButton type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </CustomButton>
      </form>

      <p className="my-2">
        Already have an Account :{" "}
        <Link className="text-blue-500 underline" to={"/"}>
          Login
        </Link>
      </p>
    </div>
  );
}
