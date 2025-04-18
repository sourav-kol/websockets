import express from "express";
import http from 'http';
import cors from 'cors';

const port = 8080;
const corsOptions = {
    origin : 'http://localhost:3000',
}

const app = express();
app.use(cors(corsOptions));

const httpServer = http.createServer(app);
//not used
const router = express.Router();

const expressServer = () => httpServer.listen(port, () => {
    console.log(`Server is running at http://localhost:${port},\nclick to open it in browser`);
});

export { app, router, expressServer, httpServer };