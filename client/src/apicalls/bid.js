import { axiosInstance } from "./axiosInstance";

// add new bid
export const savedNewBid = async (payload) => {
  try {
    const response = await axiosInstance.post("/add-bid", payload);

    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get all bids
export const getAllBids = async (product_id) => {
  try {
    const response = await axiosInstance.get(`/bids/${product_id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
