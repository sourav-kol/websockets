import { PrismaClient } from '../prisma/src/db'
import { Document } from '@/types';

const prisma = new PrismaClient();

export const createDocument = async (document: Document) => {
    try {
        const result = await prisma.document.create({
            data: document
        });
        return result;
    } catch (error) {
        console.error("Error creating document:", error);
        throw error;
    }    
}