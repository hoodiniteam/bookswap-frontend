import axios from "axios";
import { GetStaticEditions } from "../graphql/GetStaticEditions";
import { GetStaticBooks } from "../graphql/GetStaticBooks";

export const getStaticEditions = async () => {
    return axios.post < { data: { getEditionsStatic: string[] } }>('http://localhost:4000/graphql', {
        query: GetStaticEditions
    })
};

export const getStaticBooks = async () => {
    return axios.post < { data: { getBooksStatic: string[] } }>('http://localhost:4000/graphql', {
        query: GetStaticBooks
    })
};
