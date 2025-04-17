import axios from "axios";

const API_URL = "http://localhost:3500/api/v1";

export const getPrice = async (data) => {
  try {
    const response = await axios.get(`${API_URL}/crypto/singlecrypto`, {
      params: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching price data:", error);
    throw error;
  }
};

export const getTopGainer = async (data) => {
  try {
    const response = await axios.get(`${API_URL}/crypto/topgainer`, {
      params: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching price data:", error);
    throw error;
  }
};

export const getTopLoser = async (data) => {
  try {
    const response = await axios.get(`${API_URL}/crypto/toploser`, {
      params: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching price data:", error);
    throw error;
  }
};
