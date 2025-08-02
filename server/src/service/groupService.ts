import { createGroup } from "../repository/groupRepository";
import { Group } from '@/types';

export const createGroupAsync = async (group: Group) => {
    await createGroup(group);
}