import { express } from "../express-server/index";
import { createUserAsync } from "../service/userService";
import { Request, Response } from "express";
import { User } from '@/types';

const router = express.Router();

const createUser = async (req: Request, res: Response) => {
    try {
        var result = await createUserAsync(req.body as User);
        res.status(200).send(result);
    } catch (ex) {
        res.status(500).send({ ex });
    }
}

router.post("", createUser);

export { router as userController };