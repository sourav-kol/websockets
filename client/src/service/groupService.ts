import axios from "axios";
import { ApiRoutes } from "@/constants/apiConstants";
import { Group } from "@/types";

export const createGroup = async (group: Group): Promise<string> => {
    try {
        const response = await axios.post(ApiRoutes.Group.CreateGroup, group);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getPagedGroupsByUserId = async (userId: string): Promise<any[]> => {
    try {
        const response = await axios.post(ApiRoutes.Group.PagedList, { userId });
        return response.data;
    } catch (error) {
        throw error;
    }
}