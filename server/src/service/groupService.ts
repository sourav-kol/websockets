import { createGroup, getPagedGroupsByUserId } from "../repository/groupRepository";
import { Group } from '@/types';

export const createGroupAsync = async (group: Group) => {
    await createGroup(group);
}

export const getPagedGroupsByUserIdAsync = async (userId: string): Promise<any[]> => {
    const groups = await getPagedGroupsByUserId(userId);
    return groups;
}