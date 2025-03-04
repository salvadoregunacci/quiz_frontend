import axios from "axios";

const instance = axios.create({
    baseURL: "https://quiz-backend-gypq.onrender.com",
});

const token = window.localStorage.getItem("token");

if (token) {
    instance.interceptors.request.use(config => {
        config.headers.Authorization = token;
        return config;
    });
}

export default instance;