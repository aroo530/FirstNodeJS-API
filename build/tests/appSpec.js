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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const request = (0, supertest_1.default)(app_1.default);
//we just test if the app is running and returning an image
describe("Test endpoint responses", () => {
    //this array consists of the expected response codes
    //the ndpoint will only return 200 if the image is stored and width and height are more than 50
    const tests = [
        //200 - image exists and is resized
        {
            url: "/api/?filename=functions.png&width=300&height=400",
            status: 200,
            type: "image/png",
        },
        //404 - image does not exist
        {
            url: "/api/?filename=notHere.png&width=300&height=400",
            status: 404,
            type: "text/html",
        },
        //400 - image exists but width and height are less than 50
        {
            url: "/api/?filename=functions.png&width=300&height=-400",
            status: 400,
            type: "text/html",
        },
        //400 - image exists but width and height are less than 50
        {
            url: "/api/?filename=functions.png&width=-300&height=400",
            status: 400,
            type: "text/html",
        },
        {
            url: "/api/?filename=functions.png&width=text&height=400",
            status: 400,
            type: "text/html",
        },
    ];
    tests.forEach((test) => {
        it(`returned ${test.status} with response type ${test.type}`, () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get(test.url);
            expect(response.status).toBe(test.status);
            expect(response.type).toBe(test.type);
        }));
    });
});
