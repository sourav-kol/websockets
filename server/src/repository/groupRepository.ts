import { PrismaClient } from '../../src/prisma/src/db'
import { Group } from '@/types';

const prisma = new PrismaClient();

export const createGroup = async (group: Group) => {
    try {
        const result = await prisma.group.create({
            data: group
        });
        // return result;
    } catch (error) {
        console.error("Error creating group:", error);
        throw error;
    }    
}