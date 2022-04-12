import express from "express";
import routes from "./routes/index";

const app = express();
const port: number = 3000;
const host: number | string = process.env.HOST || "localhost";

app.use("/", routes);

try {
  app.listen(port, host, () => {
    console.log(`Server is listening on http://${host}:${port}`);
  });
} catch (err) {
  console.error(err);
  app.listen(1000, host, () => {
    console.log(`Server is listening on ${host}:${port}`);
  });
}

export default app;
