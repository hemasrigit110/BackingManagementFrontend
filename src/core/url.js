import axios from "axios";

export const authApi = axios.create({
  baseURL: "http://13.200.231.194:8082/auth",
});

export const bankApi = axios.create({
  baseURL: "http://13.200.231.194:8083/account",
});

export const trxnApi = axios.create({
  baseURL: "http://13.200.231.194:8084/transaction",
});

const getToken = () => {
  return localStorage.getItem("token") || null;
};

authApi.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Request interceptor for bankApi
bankApi.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Request interceptor for trxnApi
trxnApi.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
