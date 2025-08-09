import { createGroup, getPagedGroupsByUserId } from "../repository/groupRepository";
import { Group, GroupResponse } from '@/types';

export const createGroupAsync = async (group: Group) => {
    await createGroup(group);
}

export const getPagedGroupsByUserIdAsync = async (userId: string): Promise<GroupResponse[]> => {
    const groups = await getPagedGroupsByUserId(userId);
    return groups;
}