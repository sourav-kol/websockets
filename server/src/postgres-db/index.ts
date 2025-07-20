const { Client } = require('pg');


export const pgClientInit = () => {
    var pgClient = new Client({
        connectionString: process.env.POSTGRES_DB_URL
    });

    pgClient.connect()
        .then(() => console.log('Connected to PostgreSQL!'))
        .catch((err: any) => console.error('Connection error', err.stack));
}


// import postgres from 'postgres'
// const sql = postgres("DATABASE_URL=postgresql://postgres:cdjoeirjinfd1298678963@db.rzpfhqfaazzqgmggtlyi.supabase.co:5432/postgres")
// export { sql }