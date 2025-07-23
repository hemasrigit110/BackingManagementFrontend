import { useEffect, useState } from "react";
import { showAxiosError } from "../core/Toast";
import { bankApi, trxnApi } from "../core/url";
import { useNavigate } from "react-router-dom";

export const useDashboardHook = () => {
  const [transferHistory, setTransferHistory] = useState([]);
  const [accountDetails, setAccountDetails] = useState({
    accountHolderName: "",
    accountNumber: "",
    accountType: "",
    balance: 0,
    id: 0,
    ifscCode: "",
  });
  const navigate = useNavigate();
  const getAccountDetails = async () => {
    let accountNumber = localStorage.getItem("accountNumber");

    if (!accountNumber) {
      return navigate("/");
    }

    try {
      const resp = await bankApi.get(`/accountNumber/${accountNumber}`);
      console.log(resp.data);

      setAccountDetails(resp.data);
    } catch (error) {
      console.log(error, "---");

      showAxiosError(error);
    }
  };

  const getTransferHistory = async () => {
    let accountNumber = await localStorage.getItem("accountNumber");

    if (!accountNumber) {
      return navigate("/");
    }

    try {
      const res = await trxnApi.get(`/history/${accountNumber}`);
      console.log(res.data);
      setTransferHistory(res.data);
    } catch (error) {
      showAxiosError(error);
    }
  };

  useEffect(() => {
    getAccountDetails();
    getTransferHistory();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accountNumber");
    navigate("/");
  };

  return {
    accountDetails,
    getAccountDetails,

    transferHistory,
    logout,
    getTransferHistory,
  };
};
