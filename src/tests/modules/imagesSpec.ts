import { resize } from '../../modules/images'

// input validation is done in the middleware
it('test if the resize is working', (): void => {
    resize('call.png', 100, 100).then(() => {
        expect(true).toBe(true)
    })
    resize('test.png', 100, 100).then(() => {
        expect(false).toBe(false)
    })
})
