const app = require('../server');
const request = require('request');
describe('REST API v1', () => {
    it('returns a JSON payload', (done) => {
        request.get('http://localhost:3000/api/v1/products')
        expect(200)
        expect('Content-Type', 'application/json; charset=utf-8')
        done();
    });
    it('it fails on post', (done) => {
        request.post('http://localhost:3000/api/v1/products')
        expect(404);
        done();
    });
});