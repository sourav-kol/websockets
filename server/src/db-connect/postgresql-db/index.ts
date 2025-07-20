const { Client } = require('pg');

var pgClient:any = null;

export const dbClientInit = () => {
    pgClient = new Client({
        connectionString: process.env.POSTGRES_DB_URL
    });

    pgClient.connect()
        .then(() => console.log('Connected to PostgreSQL!'))
        .catch((err: any) => console.error('Connection error', err.stack));
}

export const dbContext = () => {
    if (!pgClient) {
        throw new Error('PostgreSQL client not initialized. Call pgClientInit first.');
    }
    return pgClient;
}