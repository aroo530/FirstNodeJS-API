import express from "express";
import getImage from "./api/getImage";

const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("main API!");
});

routes.use("/api", getImage);

export default routes;