const { transformRequest, summarizeCounts, transformRecords, createError, createRequestParams, checkIfDateIsValid } = require('../transformRequest');

describe('transformRequest functionality', () => {
    const success = {"code": "0", "message": "ok", "records": []}
    it('returns request result', () => {
        expect(transformRequest('0', 'ok', [])).toStrictEqual(success);
    })

    it('throws an error if third param is not an array', () => {
        expect(() => {
            transformRequest('0', 'ok')
        }).toThrow('Records must be an array');
    })
})

describe('transformRecords functionality', () => {
    const result = [{"createdAt": "createdAt", "key": "key", "totalCount": 3}];
    it('return the request result', () => {
        expect(transformRecords([{ createdAt: "createdAt", counts: [1,2], key: "key", unused: true }])).toStrictEqual(result);
    })

    it('throws an error if third param is not an array', () => {
        expect(() => {
            transformRecords('0')
        }).toThrow('Records must be an array');
    })
})

describe('summarizeCounts functionality', () => {
    it('summarize the array items', () => {
        expect(summarizeCounts([1 , 2 ,3])).toStrictEqual(6);
    })

    it('throws an error if param is not an array', () => {
        expect(() => {
            summarizeCounts()
        }).toThrow('Counts must be an array');
    })
})

describe('createError functionality', () => {
    it('returns error object', () => {
        const result = {"code": 1, "error": "ErrorMessage", "message": "Error"}
        expect(createError(1, 'Error', 'ErrorMessage')).toStrictEqual(result);
    })
})

describe('createRequestParams functionality', () => {
    it('returns empty object if no params are provided', () => {
        expect(createRequestParams()).toStrictEqual({});
    })

    it('throws an error if start or endDate are not YYYY-MM-DD', () => {
        expect(() => {createRequestParams('12-12-2021')}).toThrow('The date format must be YYYY-MM-DD');
    })

    it('creates start date params if one param is provided', () => {
        expect(createRequestParams('2021-01-01')).toStrictEqual({ createdAt: { "$gte": new Date('2021-01-01') }});
    })

    it('creates start date and end date params if two param is provided', () => {
        expect(createRequestParams('2021-01-01', '2021-01-02')).toStrictEqual({ createdAt: { "$gte": new Date('2021-01-01'), "$lte": new Date('2021-01-02') }});
    })
})

describe('checkIfDateIsValid functionality', () => {
    it('throws an error if start or endDate are not YYYY-MM-DD', () => {
        expect(() => {checkIfDateIsValid({startDate: '12-12-2021'})}).toThrow('The date format must be YYYY-MM-DD');
    })
})