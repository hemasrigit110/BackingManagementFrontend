import React from "react";
import CustomButton from "../utils/CustomButton";
import { useDashboardHook } from "../hooks/useDashboardHook";
import AccountDetails from "../components/AccountDetails";
import DepositOrWithdraw from "../components/DepositOrWithDraw";
import SendToOtherAccount from "../components/SendToOtherAccount";
import TransactionHistory from "../components/Transactions";

export default function Dashboard() {
  const {
    accountDetails,
    getAccountDetails,
    transferHistory,
    logout,
    getTransferHistory,
  } = useDashboardHook();

  return (
    <div className="p-12 min-h-screen bg-gray-100">
      <div className="flex w-full items-center justify-between mb-8">
        <h1 className="font-bold text-3xl text-gray-800">Account Dashboard</h1>
        <CustomButton
          customStyle={"bg-red-500 hover:bg-red-600"}
          type="button"
          onClick={logout}
        >
          Logout
        </CustomButton>
      </div>

      <AccountDetails
        accountDetails={accountDetails}
        getAccountDetails={getAccountDetails}
      />

      <div className="flex w-full gap-2">
        <DepositOrWithdraw
          accountDetails={accountDetails}
          getAccountDetails={getAccountDetails}
        />

        <SendToOtherAccount
          getTransferHistory={getTransferHistory}
          getAccountDetails={getAccountDetails}
        />
      </div>

      <TransactionHistory
        transactions={transferHistory}
        accountNumber={accountDetails.accountNumber}
      />
    </div>
  );
}
