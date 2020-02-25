import axios, {
    AxiosResponse,
    AxiosRequestConfig,
    AxiosInstance,
    AxiosError,
    CancelTokenSource
} from 'axios'

import Vue from 'vue'

// axios 基础配置
const Request: AxiosInstance = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})

// 请求列表
let reqQueue: Array<string> = []

// 拦截请求，做重复请求限制
Request.interceptors.request.use((config: AxiosRequestConfig) => {
    const url = config.url
    // 判断url是否为空
    const urlPatt = /\/?(\d|\w)+/i
    if (!url || !urlPatt.test(url)) {
        throw new Error('URL不能为空')
    }
    // 一个请求对应一个token
    // 因cancel会取消同一个token的所有请求
    const source: CancelTokenSource = axios.CancelToken.source()
    config.cancelToken = source.token
    // 如果请求队列中已经有当前url，则中断重复请求
    if (reqQueue.includes(url)) {
        source.cancel('重复请求，请耐心等待请求完成')
    } else {
        reqQueue.push(url)
    }
    return config
})

// 拦截响应
Request.interceptors.response.use((response: AxiosResponse) => {
    if (response.config.url) {
        const url = response.config.url
        const code: number = response.data.code
        reqQueue.splice(reqQueue.indexOf(url), 1)
        switch (code) {
        case -1:
            location.hash = '#/login'
            throw new Error('未登录')
        case 0:
            throw new Error(response.data.msg)
        }
    }
    return response
})

// const _this = new Vue()

// 重写get
export const Get = (url: string, params?: object) => {
    return new Promise((resolve, reject) => {
        Request.get(url, params).then((result: AxiosResponse<object>) => {
            resolve(result.data)
        }).catch((error: AxiosError) => {
            // handlerError(error)
            reject(error)
        })
    })
}

// 重写post
export const Post = (url: string, params: object = {}) => {
    return new Promise((resolve, reject) => {
        Request.post(url, params).then((result: AxiosResponse<object>) => {
            resolve(result.data)
        }).catch((error: any) => {
            reject(error)
        })
    })
}

Vue.prototype.$get = Get
Vue.prototype.$post = Post

export default Request
