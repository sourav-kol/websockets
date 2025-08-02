import { GroupMember } from '@/types';
import { addGroupMember } from '../repository/groupMemberRepository';

export const addGroupMemberAsync = async (groupMember: GroupMember) => {
    await addGroupMember(groupMember);
}