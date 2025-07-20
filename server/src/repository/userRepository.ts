import { dbContext } from '../db-connect/postgresql-db';

var userSchema = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`

export const createUserSchema = async () => {
    await dbContext().query(userSchema)
        .then(() => {
            console.log("User table created successfully");
        })
        .catch((err: any) => {
            console.error("Error creating user table:", err);
        });
}