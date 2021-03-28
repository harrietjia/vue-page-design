import axios from 'axios';

const service = axios.create({
    baseURL: 'http://rap2.taobao.org:38080/app/mock/254744',
    timeout: 300000 // 请求超时
});

/**
 * axios全局接口响应拦截
 * @param {number} code 接口状态码，成功=200，失败=500，没权限=403
 */
service.interceptors.response.use(
    (res) => {
        if (res.status == 200) {
            return res.data;
        } else {
            return Promise.reject(res);
        }
    },
    (err) => {
        return Promise.reject(err)
    },
);

/**
 * GET 请求
 * @param {string} url 
 * @param {Object} params GET传参
 * @param {Object} options 其他参数
 */
export const get = (url, params, options) => {
    return service({
        url,
        method: 'GET',
        params
    });
};

/**
 * POST 请求
 * @param {string} url 
 * @param {Object} data POST传参
 * @param {Object} options 其他参数
 */
export const post = (url, data, options) => {
    return service({
        url,
        method: 'POST',
        data
    });
};
