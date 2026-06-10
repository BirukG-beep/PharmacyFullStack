import axios from "axios";
//these used for 
const API = axios.create({
    baseURL:"http://localhost:4000/api/",
    withCredentials:true,
})

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if(
            error.response?.status === 403 &&
            !originalRequest._retry
        ){
            originalRequest._retry = true;

            try{
                const res = await axios.post(
                    "http://localhost:4000/api/refreshToken",
                    {},
                    {withCredentials: true}
                );
                const newToken = res.data.access_token;

                localStorage.setItem("token" , newToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                return API(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem("token");
                window.location.href = "/"
            }
        }
    }
)


export default API;