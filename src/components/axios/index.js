import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://salaryappbackend1-9l1j9rp2.b4a.run", // Replace with your API base URL
  //baseURL: "http://localhost:8003",
  timeout: 10000, // Request timeout in milliseconds
});

export default AxiosInstance;
