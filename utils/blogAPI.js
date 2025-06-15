import axios from "axios";

const blogAPI = axios.create({
  baseURL: "http://localhost:5003", // blog-service internal URL
  timeout: 5000,
});

export default blogAPI;
