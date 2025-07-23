import React, { useState } from "react";
import CustomInput from "../utils/CustomInput";
import CustomButton from "../utils/CustomButton";
import { bankApi } from "../core/url";
import CustomSelect from "../utils/CustomSelect";
import { useNavigate } from "react-router-dom";
import { showAxiosError, successMessage } from "../core/Toast";

export default function DepositOrWithdraw({ getAccountDetails }) {
  const [trxnType, setTrxnType] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate fields
    if (!trxnType) {
      setError("Please select a transaction type.");
      setLoading(false);
      return;
    }
    if (!amount) {
      setError("Please enter an amount.");
      setLoading(false);
      return;
    }
    if (parseFloat(amount) <= 0) {
      setError("Please enter a valid amount greater than 0.");
      setLoading(false);
      return;
    }

    const accountNumber = localStorage.getItem("accountNumber");

    if (!accountNumber) {
      setError("Account number not found. Please log in again.");
      setLoading(false);
      navigate("/");
      return;
    }

    try {
      const response = await bankApi.post("/update-balance", {
        transactionType: trxnType,
        amount: parseFloat(amount),
        accountNumber,
      });

      successMessage("Transaction Successful");
      getAccountDetails();
      setAmount("");
      setTrxnType("");
    } catch (err) {
      showAxiosError(err);
      setError("Transaction failed. Please try again.");
      console.error("Transaction error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  mx-auto p-6 bg-gray-50 rounded-lg shadow-md mt-10 w-[50%]">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Deposit or Withdraw
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
        <CustomSelect
          label="Transaction Type"
          value={trxnType}
          setValue={setTrxnType}
          options={[
            { label: "Deposit", value: "CREDIT" },
            { label: "Withdraw", value: "DEBIT" },
          ]}
          placeholder="Select an option"
        />
        <CustomInput
          label="Amount"
          value={amount}
          onChange={setAmount}
          placeholder="Enter amount"
          type="number"
        />
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <CustomButton type="submit" disabled={loading}>
          {loading ? "Processing..." : "Submit"}
        </CustomButton>
      </form>
    </div>
  );
}
