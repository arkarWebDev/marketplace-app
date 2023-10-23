import React, { useEffect } from "react";
import { checkCurrentUser } from "../apicalls/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getCurrentUser = async () => {
    try {
      const response = await checkCurrentUser();
      if (response.isSuccess) {
        dispatch(setUser(response.userDoc));
      } else {
        localStorage.removeItem("token");
        dispatch(setUser(null));
        navigate("/");
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect((_) => {
    getCurrentUser();
  }, []);
  return <section>{children}</section>;
};

export default AuthProvider;
