import { express } from "../express-server/index";
import { addGroupMemberAsync } from "../service/groupMemberService";
import { Request, Response } from "express";
import { GroupMember } from '@/types';

const router = express.Router();

const addGroupMember = async (req: Request, res: Response) => {
    try {
        await addGroupMemberAsync(req.body as GroupMember);
        res.status(200).send("memeber added successfully.");
    } catch (ex) {
        res.status(500).send({ ex });
    }
}

router.get("", addGroupMember);

export { router as memberController };