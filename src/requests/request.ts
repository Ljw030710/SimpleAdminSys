import axios from "axios";

const request = (config) => {
    const instance = axios.create({
        timeout: 1000,
    });

    instance.interceptors.request.use(
        (config) => {
            // 从 localStorage 获取 accessToken
            const accessToken = localStorage.getItem("accessToken");
            if (accessToken) {
                config.headers.Authorization = `${accessToken}`;
            }
            config.withCredentials = true;
            return config;
        },
        (error) => {
            console.log("在request拦截器显示错误:", error.response);
            return Promise.reject(error);
        }
    );

    return instance(config);
};

export default request;
