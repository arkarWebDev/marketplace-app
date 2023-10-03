import axios from "axios";

const getFreshLocalStorage = () => {
  const refreshToken = localStorage.getItem("token");
  console.log(refreshToken);
  return refreshToken;
};

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
  headers: {
    Authorization: `Bearer ${getFreshLocalStorage()}`,
  },
});
