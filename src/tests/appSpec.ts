import supertest from 'supertest';
import app from '../app';

type T = {
    url: string;
    status: number;
    type: string;
};

const request = supertest(app);
//we just test if the app is running and returning an image
describe('Test endpoint responses', (): void => {
    //this array consists of the expected response codes
    //the ndpoint will only return 200 if the image is stored and width and height are more than 50
    const tests: Array<T> = [
        //200 - image exists and is resized
        {
            url: '/api/?filename=functions.png&width=300&height=400',
            status: 200,
            type: 'image/png',
        },
        //404 - image does not exist
        {
            url: '/api/?filename=notHere.png&width=300&height=400',
            status: 404,
            type: 'text/html',
        },
        //400 - image exists but width and height are less than 50
        {
            url: '/api/?filename=functions.png&width=300&height=-400',
            status: 400,
            type: 'text/html',
        },
        //400 - image exists but width and height are less than 50
        {
            url: '/api/?filename=functions.png&width=-300&height=400',
            status: 400,
            type: 'text/html',
        },
        {
            url: '/api/?filename=functions.png&width=text&height=400',
            status: 400,
            type: 'text/html',
        },
    ];
    tests.forEach((test): void => {
        it(`returned ${test.status} with response type ${test.type}`, async () => {
            const response = await request.get(test.url);
            expect(response.status).toBe(test.status);
            expect(response.type).toBe(test.type);
        });
    });
});
