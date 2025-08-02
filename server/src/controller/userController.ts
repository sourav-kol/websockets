import { express } from "../express-server/index";
import { createUserAsync } from "../service/userService";
import { Request, Response } from "express";
import { User } from '@/types';

const router = express.Router();

const createUser = async (req: Request, res: Response) => {
    console.log("Creating user with data:", req.body);
    try {
        await createUserAsync(req.body as User);
        res.status(200).send("User created successfully.");
    } catch (ex) {
        res.status(500).send({ ex });
    }
}

router.get("", createUser);

export { router as userController };