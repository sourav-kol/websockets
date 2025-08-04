import { express } from "../express-server/index";
import { createDocumentAsync } from "../service/documentService";
import { Request, Response } from "express";
import { Document } from '@/types';

const router = express.Router();

const createDocument = async (req: Request, res: Response) => {
    try {
        await createDocumentAsync(req.body as Document);
        res.status(200).send("document created successfully.");
    } catch (ex) {
        res.status(500).send({ ex });
    }
}

router.post("", createDocument);

export { router as documentController };