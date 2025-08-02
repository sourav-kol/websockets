import { PrismaClient } from '../../src/prisma/src/db'
import { User } from '@/types';

const prisma = new PrismaClient();

export const createUser = async (user: User) => {
    try {
        const result = await prisma.user.create({
            data: user
        });
        return result;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }    
}