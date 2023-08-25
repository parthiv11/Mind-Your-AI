import mysql from "mysql";


const url = 'https://cloud.mindsdb.com/api/sql/query';
const cookies = { 'session': process.env.MINDSDB_SESSION };
const cookieString = JSON.stringify(cookies);


export const getPrediction = async (question, context) => {
    const SQL_QUERY = `
        SELECT answer
        FROM mindsdb.crx_openai
        WHERE question=${mysql.escape(question)}
        and context=${mysql.escape(context)};`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookieString
            },
            body: JSON.stringify({
                query: SQL_QUERY
            })
        });

        const data = await response.json();
        return data.data[0][0]; // Return the data 
    } catch (error) {
        throw error; // Re-throw the error to be caught higher up
    }
};
