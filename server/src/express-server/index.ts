import express from "express";

const app = express();
const router = express.Router();

const port = 8080;

const server = () => app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
export { app, router, server };