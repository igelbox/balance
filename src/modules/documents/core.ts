export interface IDocument {
    id: string;
    date: Date;
    hint?: string;
    author: string;
    signed?: boolean;
}
