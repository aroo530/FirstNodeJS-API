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
exports.validate = exports.checkImage = exports.resize = void 0;
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const thumbDir = path_1.default.join(__dirname, '../../images/thumbs');
const fullDir = path_1.default.join(__dirname, '../../images/full');
//this middleware is used to validate the query params
const validate = (req, res, next) => {
    if (String(req.query.filename).match(/.(jpg|jpeg|png)$/i) &&
        Number(req.query.width) > 50 &&
        Number(req.query.height) > 50) {
        // console.log('valid');
        next();
    }
    else {
        res.status(400).send('bad request - width and height must be greater than 50 - filename must be a jpg or png');
    }
};
exports.validate = validate;
//this middleware is used to check if the image exists and if it does it will resize it and send it
const checkImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const width = Number(req.query.width);
    const height = Number(req.query.height);
    const filename = String(req.query.filename);
    const thumb = path_1.default.join(`${thumbDir}`, `${filename}_${width}_${height}.png`);
    // console.log(thumb);
    //if file exists then next middleware
    // else resize the image and save it and then next middleware
    fs_1.promises.readFile(thumb)
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
            res.status(404).send('image not found');
        });
    });
});
exports.checkImage = checkImage;
// this block takes an image and resizes it saves it
function resize(filename, width, height) {
    return __awaiter(this, void 0, void 0, function* () {
        const imgPath = path_1.default.join(`${fullDir}`, `${filename}`);
        const thumbPath = path_1.default.join(`${thumbDir}`, `${filename}_${width}_${height}.png`);
        console.log(imgPath);
        yield (0, sharp_1.default)(imgPath)
            .resize(width, height, { fit: 'contain' })
            .toFile(thumbPath);
    });
}
exports.resize = resize;
