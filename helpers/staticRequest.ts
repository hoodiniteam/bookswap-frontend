import axios from "axios";
import { GetStaticEditions } from "../graphql/GetStaticEditions";
import { GetStaticBooks } from "../graphql/GetStaticBooks";

const nextStaticUrl = process.env.NODE_ENV === "production" ? "http://server:4000/graphql" : 'http://localhost:4000/graphql'

export const getStaticEditions = async () => {
    return axios.post < { data: { getEditionsStatic: string[] } }>(nextStaticUrl || '', {
        query: GetStaticEditions
    })
};

export const getStaticBooks = async () => {
    return axios.post < { data: { getBooksStatic: string[] } }>(nextStaticUrl || '', {
        query: GetStaticBooks
    })
};
