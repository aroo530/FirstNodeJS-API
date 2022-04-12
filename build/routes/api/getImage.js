"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const images_1 = require("../../modules/images");
const getImage = (0, express_1.default)();
getImage.get("/", images_1.validate, images_1.checkImage, (req, res) => {
    const width = Number(req.query.width);
    const height = Number(req.query.height);
    const filename = String(req.query.filename);
    res.sendFile(`${filename}+${width}+${height}.png`, {
        root: "./images/thumbs",
    });
});
exports.default = getImage;
