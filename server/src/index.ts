import { app, server } from "./express-server";
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

// const router = express.Router();

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.get("/open-connection", (req, res) => {
  var id: string = uuidv4();
  console.log("id", id);

  res.send({ id: id });
});

app.get("/close-connection", (req, res) => {
  res.send("closed...");
});

//init express server
server();
