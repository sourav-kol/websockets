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

export const getPagedGroupsByUserId = async (userId: string): Promise<any[]> => {
    try {
        const groupIds = await prisma.groupMember.findMany({
            where: {
                userId: {
                    equals: userId
                }
            },
            select: {
                groupId: true
            }
        });

        var groups = prisma.group.findMany({
            where: {
                id: {
                    in: groupIds.map((group) => group.groupId)}
            },
            include: {
                members: true,
            }
        });             
        
        return groups;
    } catch (error) {
        console.error("Error fetching groups:", error);
        throw error;
    }
}