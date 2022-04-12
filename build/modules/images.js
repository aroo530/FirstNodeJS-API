"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkImage = exports.validate = void 0;
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = require("fs");
//this middleware is used to validate the query params
const validate = (req, res, next) => {
    if (req.query.filename &&
        Number(req.query.width) > 50 &&
        Number(req.query.height) > 50) {
        next();
    }
    else {
        res
            .status(400)
            .send("bad request - width and height must be greater than 50");
    }
};
exports.validate = validate;
//this middleware is used to check if the image exists and if it does it will resize it and send it
const checkImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const width = Number(req.query.width);
    const height = Number(req.query.height);
    const filename = String(req.query.filename);
    const thumbPath = `./images/thumbs/${filename}+${width}+${height}.png`;
    //if file exists then next middleware
    // else resize the image and save it and then next middleware
    fs_1.promises.readFile(thumbPath)
        .then(() => {
        // console.log("thumb exists");
        next();
    })
        .catch(() => {
        // console.log("not found making thumb");
        resize(filename, width, height)
            .then(() => {
            next();
        })
            .catch((err) => {
            console.log(err);
            res.status(404).send("image not found");
        });
    });
});
exports.checkImage = checkImage;
// this block takes an image and resizes it saves it
function resize(filename, width, height) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, sharp_1.default)(`./images/full/${filename}`)
            .resize(width, height, { fit: "contain" })
            .toFile(`./images/thumbs/${filename}+${width}+${height}.png`);
    });
}
