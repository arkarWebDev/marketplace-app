import axios from "axios";

const getFreshLocalStorage = () => {
  const refreshToken = localStorage.getItem("token");
  return refreshToken;
};

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getFreshLocalStorage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
