import { express } from "../express-server/index";
import { createGroupAsync, getPagedGroupsByUserIdAsync } from "../service/groupService";
import { Request, Response } from "express";
import { Group } from '@/types';

const router = express.Router();

const createGroup = async (req: Request, res: Response) => {
    try {
        await createGroupAsync(req.body as Group);
        res.status(200).send("Group created successfully.");
    } catch (ex) {
        res.status(500).send({ ex });
    }
}

export const getPagedGroupsByUserId = async (req: Request, res: Response) => {
    const { userId } = req.body;
    try {
        const groups = await getPagedGroupsByUserIdAsync(userId);
        res.status(200).send(groups);
    } catch (ex) {
        res.status(500).send({ ex });
    }
}

router.post("", createGroup);
router.post("/paged", getPagedGroupsByUserId);

export { router as groupController };