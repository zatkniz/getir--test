const { ExpectationFailed } = require('http-errors');
const request = require('supertest');
const app = require('../app');

describe('default request', () => {
    it('returns 404 on all requests expect post to /', async () => {
       const response = await request(app).get('/user')
       
       expect(response.statusCode).toBe(404)
    })

    it('returns 200 on / post request', async () => {
        const response = await request(app).post('/').send({
            startDate: '2016-12-16',
            endDate: '2016-12-17',
            minCount: 100,
            maxCount: 200,
        });

        expect(response.statusCode).toBe(200)
     })

     it('returns the correct formatted response', async () => {
        const response = await request(app).post('/').send({
            startDate: '2016-12-16',
            endDate: '2016-12-17',
            minCount: 100,
            maxCount: 200,
        });

        expect(response.body.code).toBeDefined();
        expect(response.body.code).toEqual(0);
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toEqual("Success");
        expect(response.body.records).toBeDefined();
        expect(Array.isArray(response.body.records)).toBeTruthy();
     })

     it('throws an error if start date is after end date', async () => {
        const response = await request(app).post('/').send({
            startDate: '2016-12-19',
            endDate: '2016-12-17',
            minCount: 100,
            maxCount: 200,
        });

        expect(response.statusCode).toBe(500);
        expect(response.body.code).toBe(1)
        expect(response.body.message).toBe('Error')
        expect(response.body.error).toBe("Start date can't be after end date")
     })

     it('send well formatted error message', async () => {
        const response = await request(app).post('/').send({
            startDate: '2016-12-19',
            endDate: '2016-12-17',
            minCount: 100,
            maxCount: 200,
        });

        expect(response.statusCode).toBe(500);
        expect(response.body.code).toBeDefined();
        expect(response.body.code).toBe(1)
        expect(response.body.message).toBeDefined();
        expect(response.body.message).toBe('Error')
        expect(response.body.error).toBeDefined();
     })
})