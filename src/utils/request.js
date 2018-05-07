import axios from 'axios'
import store from '../store'
import * as types from '../store/mutations-types'
import router from '../router'

// axios 配置
axios.defaults.timeout = 5000;
// axios.defaults.baseURL = '/api'
axios.defaults.baseURL = ''
axios.defaults.withCredentials = true

// http request 拦截器
axios.interceptors.request.use(
    config => {
        return config;
    },
    err => {
        return Promise.reject(err);
    });
// http response 拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.code === '403') {
            // 403 清除token信息并跳转到登录页面
            store.commit(types.LOGOUT);
            router.replace({
                path: '/login',
                query: {redirect: router.currentRoute.fullPath}
            })
        }
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.code) {
                case '401':
                    // 403 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        console.log(JSON.stringify(error)); // console : Error: Request failed with status code 402
        return Promise.reject(error.response)
    });

export default axios;
