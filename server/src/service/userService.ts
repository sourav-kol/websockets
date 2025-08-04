import { createUser } from "../repository/userRepository";
import { User } from '@/types';

export const createUserAsync = async (user: User): Promise<string> => {
    return await createUser(user);
}