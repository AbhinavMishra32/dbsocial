import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3000" // put this in env for hosting
});

