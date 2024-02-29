import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://backend.equipaypartners.com", // Replace with your API base URL
  // baseURL: "http://localhost:8003",
});

export default AxiosInstance;
