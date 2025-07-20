import { router } from "../express-server/index";
import { createUserSchemaAsync } from ".././service/userService";
import { Request, Response } from "express";


const createUserSchema = async (req: Request, res: Response) => {
    try {
        await createUserSchemaAsync();
        res.status(200).send("User schema created successfully.");
    } catch (ex) {
        res.status(500).send({ ex });
    }
}

router.get("/schema", createUserSchema);

export { router as userController };