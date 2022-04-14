import express from 'express';
import getImage from './api/getImage';

const routes = express.Router();

routes.get('/', (req: express.Request, res: express.Response): void => {
    res.send('main API!');
});

routes.use('/api', getImage);

export default routes;
