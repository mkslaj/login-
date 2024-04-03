import axios from "axios";
import {ElMessage} from "element-plus";
import router from "@/router";
import {useTokenStore} from "@/stores/token.js";

const instance = axios.create({baseURL: '/api'});
const baseURL ='/api'

instance.interceptors.request.use(
    config => {
        const tokenStore = useTokenStore();
        if (tokenStore.token) {
            config.headers.Authorization = tokenStore.token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    result => {
        if (result.data.code === 0) {
            return result.data
        }
        ElMessage.error(result.data.message ? result.data.message : '异常')
        return Promise.reject(result.data)

    },
    error => {
        if (error.response.status === 401) {
            ElMessage.error("登録おお願いします")
            // Have problems here
            router.push('/login')
        } else {
            ElMessage.error('异常')
        }
        return Promise.reject(error)
    }
)

export default instance