import axios from "axios";

const blogAPI = axios.create({
  baseURL: "3.83.112.120:5003", // blog-service internal URL
  timeout: 5000,
});

export default blogAPI;
