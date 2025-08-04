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