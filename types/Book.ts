import { CloudinaryImage } from './CloudinaryImage'

export enum BooksStatus {
    HOLD,
    OPEN,
    SWAPPING,
    EXTRACTED
}

export enum BooksCondition {
    BRANDNEW,
    LIKENEW,
    GOOD,
    SATISFACTORY,
    BAD,
    TERRIBLE
}

export type Book = {
    title: string,
    description: string
    id: string
    status: BooksStatus,
    condition: BooksCondition,
    image?: CloudinaryImage
}
