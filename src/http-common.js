import axios from "axios";

export const HTTP = axios.create({
    baseURL: "https://localhost:44358/",
    headers: {
        "Authorization": "Bearer " + localStorage.token,
        "Content-Type": "application/json"
    }
})