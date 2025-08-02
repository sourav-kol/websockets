import { createUser } from "../repository/userRepository";
import { User } from '@/types';

export const createUserAsync = async (user: User) => {
    await createUser(user);
}