import { PrismaClient } from '../../src/prisma/src/db'
import { GroupMember } from '@/types';

const prisma = new PrismaClient();

export const addGroupMember = async (groupMember: GroupMember) => {
    try {
        const result = await prisma.groupMember.create({
            data: groupMember
        });
        return result;
    } catch (error) {
        console.error("Error adding member", error);
        throw error;
    }    
}