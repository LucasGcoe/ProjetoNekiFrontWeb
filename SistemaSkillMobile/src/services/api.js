import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const service = axios.create({
    baseURL: "http://192.168.1.101:8080/api",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json;charset=UTF-8',
    },
});

service.interceptors.request.use(async (config) => {
    let token = JSON.parse(await AsyncStorage.getItem('infoUser'));
    if (token) {
        token = token.token.jwtToken
    }
    if (token) {
        config.headers.Authorization = token
    }

    return config;
});


export default service;