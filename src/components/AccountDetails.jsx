import React from "react";

export default function AccountDetails({ accountDetails }) {
  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Account Details
      </h2>
      <div className="grid gap-4 text-gray-600">
        <div className="flex justify-between">
          <span className="font-medium">Account Holder:</span>
          <span>{accountDetails.accountHolderName || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Account Number:</span>
          <span>{accountDetails.accountNumber || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Account Type:</span>
          <span>{accountDetails.accountType || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Balance:</span>
          <span>₹ {accountDetails.balance?.toFixed(2) || "0.00"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Account ID:</span>
          <span>{accountDetails.id || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">IFSC Code:</span>
          <span>{accountDetails.ifscCode || "N/A"}</span>
        </div>
      </div>
    </div>
  );
}
