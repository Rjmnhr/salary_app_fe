import axios from "axios";

const AxiosInstance = axios.create({
  // baseURL: "https://backend.equipaypartners.com", // Replace with your API base URL
  //  baseURL: "http://localhost:8003",
  baseURL: "https://equipaytest-58or5j7k.b4a.run",
});

export default AxiosInstance;
