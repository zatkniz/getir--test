const moment = require('moment');

const transformRequest = (code, message, records) => {
    /*
    *   Returns the response formatted with code and message, if no records provided the records wont return
    */
    return {
        code,
        message,
        records: transformRecords(records)
    }
}

const summarizeCounts = counts => {

    /*
    *   Check if counts is an array
    */
    if(!Array.isArray(counts)) {
        throw 'Counts must be an array';
    }

    /*
    *  Returns the sum of the counts 
    */
    return counts.reduce((sum, count) => sum + count);
} 

const transformRecords = records => {

    /*
    *   Check if records is an array
    */
    if(!Array.isArray(records)) {
        throw 'Records must be an array';
    }

    /*
    *   Loop through all records and transform the result with the desired keys
    */
    return records.map(({ key, createdAt, counts }) => {
        return {
            key, 
            createdAt, 
            totalCount: summarizeCounts(counts) // summarize the counts
        }
    });
} 

const createError = (code, message, error) => {
    /*
    *   Returns the error response formatted with code and message.
    */
    return {
        code,
        message,
        error
    }
}

/*
*   It creates the request params. 
*   If startDate or endDate provided will return all results
*   If startData only is provides filters only with startDate as param
*   If endData only is provides filters only with endDate as param
*   if both filters with both
*/
const createRequestParams = (startDate, endDate) => {

    let requestParams = {
        createdAt: {}
    };

    /*
    *   If no start or end date provided delete the key so it will return all the results
    */
    if(!!!startDate & !!!endDate) {
        delete requestParams.createdAt;
    }

    /*
    *   Set startDate if provided
    */
    if(!!startDate) {
        checkIfDateIsValid(startDate);
        requestParams.createdAt['$gte'] = new Date(startDate);
    }

    /*
    *   Set endDate if provided
    */
    if(!!endDate) {
        checkIfDateIsValid(endDate);
        requestParams.createdAt['$lte'] = new Date(endDate);
    }

    return requestParams;
}

/*
*   Checks if the request format is correct
*/
const checkIfDateIsValid = date => {
    if(!(moment(date,'YYYY-MM-DD').format('YYYY-MM-DD') === date)) {
        throw 'The date format must be YYYY-MM-DD'
    }
}

module.exports = {
    transformRequest,
    summarizeCounts,
    createError,
    createRequestParams,
    checkIfDateIsValid,
    transformRecords
}


