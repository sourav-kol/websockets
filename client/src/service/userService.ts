import axios from "axios";
import { ApiRoutes } from "@/constants/apiConstants";
import { User } from "@/types";

export const createUser = async (user: User): Promise<string> => {
    try {
        const response = await axios.post(ApiRoutes.User.CreateUser, user);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}