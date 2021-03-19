import httpRequest  from 'miniprogram-http-request'

const service = httpRequest.create({
    baseURL: 'https://zxapi.ssjygw.com/api',
    timeout: 50000,
})
// 请求拦截
service.interceptors.request.use(config => {
        // 不传递默认开启loading
        wx.showLoading({
            title: '加载中',
        })
        config.header['token'] = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzc3p4LXNlcnZlciIsImF1ZCI6IjEiLCJ1bmlvbmlkIjoib3hScS13VGU2bGk1NFRYVk56YUhYbE5YR2Z3dyIsInJvbGUiOiIyNCIsIm9wZW5pZCI6Im9ueE5wd0hFVVVSdHlnNzlsTms2cjhEbkt1Z00iLCJpc3MiOiJzc2RqeiIsImV4cCI6MTYxNjE0ODMyOSwiaWF0IjoxNjE2MTM3NTI5fQ.6S7eEMX0rckIejhXSJGOkAwYtQ1Y1uek-UL0z-oBz50"
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

// 响应拦截
service.interceptors.response.use(response => {
        wx.hideLoading()
        if (response.statusCode >= 200 && response.statusCode < 300) {
            const {code, data, message} = response.data
            if (code === 1) {
                return data
            } else if(code === -1){
                console.log('登录已经失效')
            }else {
                console.log('error')
                return Promise.reject(message || 'Error')
            }
        }
    },
    error => {
        return Promise.reject(error)
    }
)
// 请求方式
export default {
    post(url, data) {
        return new Promise((resolve, reject) => {
            service({
                method: 'post',
                url,
                data: data,
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    patch(url, data) {
        return new Promise((resolve, reject) => {
            service({
                method: 'patch',
                url,
                data: data,
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    get(url, params) {
        return new Promise((resolve, reject) => {
            service({
                method: 'get',
                url,
                params,
            }).then((res) => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    delete(url, params) {
        return new Promise((resolve, reject) => {
            service({
                method: 'delete',
                url,
                params
            }).then((res) => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}
