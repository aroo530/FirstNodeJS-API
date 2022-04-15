import express from 'express'
import path from 'path'
import { validate, checkImage } from '../../modules/images'

const getImage = express()

getImage.get(
    '/',
    validate,
    checkImage,
    (req: express.Request, res: express.Response): void => {
        const width = Number(req.query.width)
        const height = Number(req.query.height)
        const filename = String(req.query.filename)
        const thumbRoot = path.join(__dirname, '../../../images/thumbs')
        res.sendFile(`${filename}_${width}_${height}.png`, {
            root: `${thumbRoot}`,
        })
    }
)

export default getImage
