const client = require('../connection/client');
const { summarizeCounts,createRequestParams } = require('../helpers/transformRequest');
const moment = require('moment');

const findAll = async ({ startDate, endDate, maxCount, minCount }) => {

    /*
    *   If the startDate and end date are provided
    *   check if the end date is after the startDate
    *   if not throws an error
    */
    if(!!startDate && moment(startDate).isAfter(moment(endDate))) {
        throw 'Start date can\'t be after end date'
    }

    /*
    *   Connect to database
    */
    await client.connect();
    const dbName = process.env.DB_NAME;
    const db = client.db(dbName);

    try {
        /*
        * fetch the results
        */
        const result = await db.collection('records').find(createRequestParams(startDate, endDate)
        ).toArray()

        /*
        *   I use filter because $where is not allowed in the mongoDB tier we use in our app
        */
        const filteredResult = result.filter(item => {
            const count = summarizeCounts(item.counts);

            minCount = minCount || 0; // If no minCount is provided we take 0 as min
            maxCount = maxCount || Infinity; // If no maxCount is provided we take Infinity as max

            /*
            *   Return all the results higher than minCount
            *   and lower than maxCount
            *   TODO: check if maxCount is higher number than minCount (not causing issue it returns 0 results but will improve UX)
            */
            return count >= minCount && count <= maxCount
        })

        return filteredResult;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    findAll
};
