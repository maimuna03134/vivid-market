// Axios instance pointed at the Express backend
import axios from "axios";
import { toast } from "./toast";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true // send httpOnly cookie to Express server
});

// Surface backend error messages (from errorMiddleware.js) as toasts automatically
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Something went wrong";
    toast.error(message);
    return Promise.reject(error);
  }
);

export default api;
