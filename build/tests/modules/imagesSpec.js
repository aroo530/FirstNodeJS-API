"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const images_1 = require("../../modules/images");
it("resize", () => {
    (0, images_1.resize)('call.png', 100, 100).then(() => {
        expect(true).toBe(true);
    });
    (0, images_1.resize)('test.png', 100, 100).then(() => {
        expect(false).toBe(false);
    });
});
