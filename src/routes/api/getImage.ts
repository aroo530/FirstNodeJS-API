import express from "express";
import { validate , checkImage } from "../../modules/images";


const getImage = express();

getImage.get("/", validate,checkImage, (req:express.Request, res:express.Response):void => {
  const width = Number(req.query.width);
  const height = Number(req.query.height);
  const filename = String(req.query.filename);
  res.sendFile(`${filename}+${width}+${height}.png`, {
    root: "./images/thumbs",
  });
});

export default getImage;
