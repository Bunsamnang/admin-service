import express from "express";
import blogAdminRoute from "./blogAdminRoute.js";
import { extractUserFromHeader } from "./middleware/extractUserFromHeader.js";
const app = express();

app.use(express.json());

const PORT = 5002;
app.use("/", extractUserFromHeader, blogAdminRoute);
app.listen(PORT, () => {
  console.log(`Admin service is running on port: ${PORT}`);
});
