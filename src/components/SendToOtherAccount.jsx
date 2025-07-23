import React, { useState } from "react";
import CustomInput from "../utils/CustomInput";
import CustomButton from "../utils/CustomButton";
import { trxnApi } from "../core/url";
import { useNavigate } from "react-router-dom";
import { showAxiosError, successMessage } from "../core/Toast";

export default function SendToOtherAccount({
  getAccountDetails,
  getTransferHistory,
}) {
  const [fromAccount, setFromAccount] = useState(
    localStorage.getItem("accountNumber") || ""
  );
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate fields
    if (!fromAccount) {
      setError("Please enter the from account number.");
      setLoading(false);
      return;
    }
    if (!toAccount) {
      setError("Please enter the to account number.");
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
    if (!ifscCode) {
      setError("Please enter the IFSC code.");
      setLoading(false);
      return;
    }

    try {
      const response = await trxnApi.post("/transfer", {
        fromAccount,
        toAccount,
        amount: parseFloat(amount),
        ifscCode,
      });

      successMessage("Transfer Successful");
      getAccountDetails();
      getTransferHistory();
      setToAccount("");
      setAmount("");
      setIfscCode("");
    } catch (err) {
      showAxiosError(err);
      setError("Transfer failed. Please try again.");
      console.error("Transfer error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-[50%] mx-auto p-6 bg-gray-50 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Transfer Funds</h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
        <CustomInput
          label="From Account"
          value={fromAccount}
          onChange={setFromAccount}
          placeholder="Enter your account number"
          type="text"
          disabled={true}
        />
        <CustomInput
          label="To Account"
          value={toAccount}
          onChange={setToAccount}
          placeholder="Enter recipient account number"
          type="text"
        />
        <CustomInput
          label="Amount"
          value={amount}
          onChange={setAmount}
          placeholder="Enter amount"
          type="number"
        />
        <CustomInput
          label="IFSC Code"
          value={ifscCode}
          onChange={setIfscCode}
          placeholder="Enter IFSC code of Receiver"
          type="text"
        />
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <CustomButton type="submit" disabled={loading}>
          {loading ? "Processing..." : "Submit Transfer"}
        </CustomButton>
      </form>
    </div>
  );
}
