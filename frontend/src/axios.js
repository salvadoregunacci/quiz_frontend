import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:4444",
});

const token = window.localStorage.getItem("token");

if (token) {
    instance.interceptors.request.use(config => {
        config.headers.Authorization = token;
        return config;
    });
}

export default instance;