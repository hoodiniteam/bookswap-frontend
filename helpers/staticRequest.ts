import axios from "axios";
import { GetStaticEditions } from "../graphql/GetStaticEditions";
import { GetStaticBooks } from "../graphql/GetStaticBooks";

export const getStaticEditions = async () => {
    return axios.post < { data: { getEditionsStatic: string[] } }>(process.env.API_URL || '', {
        query: GetStaticEditions
    })
};

export const getStaticBooks = async () => {
    return axios.post < { data: { getBooksStatic: string[] } }>(process.env.API_URL || '', {
        query: GetStaticBooks
    })
};
