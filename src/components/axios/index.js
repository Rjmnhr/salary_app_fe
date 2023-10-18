import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://equipaypartnersbe-myyduar5.b4a.run", // Replace with your API base URL
  // baseURL: "http://localhost:8003",
});

export default AxiosInstance;
