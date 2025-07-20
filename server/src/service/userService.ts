import { createUserSchema } from ".././repository/userRepository";

export const createUserSchemaAsync = async () => {
    await createUserSchema();
}