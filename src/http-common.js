import axios from "axios";

export const HTTP = axios.create({
    baseURL: "https://localhost:7165",
    headers: {
        "Content-Type": "application/json"
    }
});

//https://localhost:44358/
