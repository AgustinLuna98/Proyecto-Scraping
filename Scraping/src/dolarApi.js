import axios from "axios";

export const dolarApi = axios.create({
    baseURL: 'http://localhost:3666/api/'
})