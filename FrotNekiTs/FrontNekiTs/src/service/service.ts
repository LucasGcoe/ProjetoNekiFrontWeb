import axios from "axios";

const service = axios.create({
    baseURL: "http://localhost:8080/api"
});

service.interceptors.request.use(config => {
    let token = localStorage.getItem('token');
    if (sessionStorage.getItem('token') !== null) {
        token = sessionStorage.getItem('token');
    }

    if (token) {
        config.headers.Authorization = token
    }

    return config;
});


export default service;