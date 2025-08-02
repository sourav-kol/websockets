import { createDocument } from '../repository/documentRepository';
import { Document } from '@/types';

export const createDocumentAsync = async (document: Document) => {
    await createDocument(document);
}