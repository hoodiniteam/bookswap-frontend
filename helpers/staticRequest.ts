import axios from "axios";
import { GetStaticEditions } from "@/graphql/GetStaticEditions";
import { GetStaticBooks } from "@/graphql/GetStaticBooks";

const nextStaticUrl = process.env.API_URL ? process.env.API_URL : 'http://localhost:4000/graphql'

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
