import axios from 'axios'
import { Message } from 'view-design'
import store from '@/store'

const axiosInstance = axios.create({
    timeout: 1000 * 20
})

axiosInstance.interceptors.request.use(function (config) { // 请求成功
    return config
}, function (error) { // 请求失败
    return Promise.reject(error)
})

axiosInstance.interceptors.response.use(function (res) { // 响应成功
    return res
}, function (err) { // 响应失败
    return Promise.reject(err)
})

const whiteUrl = ['/api/user/logon', '/api/user/login']

const apiAction = async function (method, url, config = {}) {
    try {
        const conf = {
            method,
            url,
            ...config
        }
        const { userType, token } = store.state
        if (!!(userType * 1) && whiteUrl.indexOf(url) < 0) {
            conf.headers = {
                auth: token
            }
        }
        const ret = await axiosInstance(conf)
        // console.log('apiAction', ret)
        const { code, msg, data } = ret.data
        if (ret.status === 200) {
            if (code === 200 && msg === 'success') {
                return data
            } else if (code === 401 && msg === 'error') {
                Message.error(ret.data.data || ret.data.msg)
                throw new Error(ret.data.data || ret.data.msg)
            } else {
                Message.error(ret.data.data || ret.data.msg)
                throw new Error(ret.data.data || ret.data.msg)
            }
        } else {
            throw new Error('返回数据错误')
        }
    } catch (error) {
        console.log(`${url}-${method}[api Error]`, error)
        if (config && !!config.throwError) {
            throw error
        } else {
            return null
        }
    }
}

export default axiosInstance

export const apiGet = async (url, config) => {
    return apiAction('get', `/api${url}`, config)
}

export const apiPost = async (url, config) => {
    return apiAction('post', `/api${url}`, config)
}

export const apiPut = async (url, config) => {
    return apiAction('put', `/api${url}`, config)
}

export const apiDelete = async (url, config) => {
    return apiAction('delete', `/api${url}`, config)
}
