import express from 'express';
import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const thumbDir = path.join(__dirname, '../../images/thumbs');
const fullDir = path.join(__dirname, '../../images/full');
//this middleware is used to validate the query params
const validate = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): void => {
    if (
        String(req.query.filename).match(/.(jpg|jpeg|png)$/i) &&
        Number(req.query.width) > 50 &&
        Number(req.query.height) > 50
    ) {
        // console.log('valid');
        next();
    } else {
        res.status(400).send(
            'bad request - width and height must be greater than 50 - filename must be a jpg or png'
        );
    }
};

//this middleware is used to check if the image exists and if it does it will resize it and send it
const checkImage = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    const width = Number(req.query.width);
    const height = Number(req.query.height);
    const filename = String(req.query.filename);
    const thumb =path.join(`${thumbDir}`,`${filename}_${width}_${height}.png`);
    // console.log(thumb);
    //if file exists then next middleware
    // else resize the image and save it and then next middleware
    fs.readFile(thumb)
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
};
// this block takes an image and resizes it saves it
async function resize(
    filename: string,
    width: number,
    height: number
): Promise<void> {
    const imgPath = path.join(`${fullDir}`,`${filename}`);
    const thumbPath = path.join(`${thumbDir}`,`${filename}_${width}_${height}.png`);
    console.log(imgPath);
    await sharp(imgPath)
        .resize(width, height, { fit: 'contain' })
        .toFile(thumbPath);
}

export { resize, checkImage, validate };
