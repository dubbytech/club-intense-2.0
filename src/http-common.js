import axios from "axios";

export const HTTP = axios.create({
    baseURL: "https://localhost:44358/",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*"
    }
})