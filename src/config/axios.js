import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://backend.equipaypartners.com",
  // baseURL: "http://localhost:8003",
});

export default AxiosInstance;
