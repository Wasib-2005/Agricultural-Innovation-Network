import axios from "axios";

export const verifyUserInMongo = async (email) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/user_verification`, { email });
    return res.data.exists || false;
  } catch (error) {
    console.error("User verification failed:", error);
    return false;
  }
};
