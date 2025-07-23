import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export const successMessage = (message) => {
  toast(message, {
    type: "success",
    position: "bottom-right",
    autoClose: 1000,
  });
};
export const errorMessage = (message) => {
  toast(message, {
    type: "error",
    position: "bottom-right",
    autoClose: 1000,
  });
};

export const showAxiosError = (error) => {
  if (isAxiosError(error)) {
    errorMessage(error?.response?.data?.message || error?.response?.data);
  } else {
    errorMessage(error.message || "Something Went Wrong");
  }
};
