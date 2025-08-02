import { express } from "../express-server/index";
import { createGroupAsync } from "../service/groupService";
import { Request, Response } from "express";
import { Group } from '@/types';

const router = express.Router();

const createGroup = async (req: Request, res: Response) => {
    console.log("Creating group with data:", req.body);
    try {
        await createGroupAsync(req.body as Group);
        res.status(200).send("Group created successfully.");
    } catch (ex) {
        res.status(500).send({ ex });
    }
}

router.get("", createGroup);

export { router as groupController };