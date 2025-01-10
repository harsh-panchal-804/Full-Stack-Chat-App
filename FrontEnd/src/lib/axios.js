import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE==="development"? 'http://localhost:5001/api':"/api",
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default axiosInstance;