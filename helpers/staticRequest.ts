import axios from "axios";
import { GetStaticEditions } from "../graphql/GetStaticEditions";

export const getStaticEditions = async () => {
    return axios.post < { data: { getEditionsStatic: string[] } }>('http://localhost:4000/graphql', {
        query: GetStaticEditions
    })
};