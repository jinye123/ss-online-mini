const axios = ({url, method = 'GET', data = {}, tipName = '加载中'}) => {
    const header = {}
    // if (wx.getStorageSync('token')) {
    //     header.token = wx.getStorageSync('token')  //登录后拿到token值
    // }
    header.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzc3p4LXNlcnZlciIsImF1ZCI6IjI5NDIiLCJ1bmlvbmlkIjoib3hScS13VGU2bGk1NFRYVk56YUhYbE5YR2Z3dyIsInJvbGUiOiIyNCIsIm9wZW5pZCI6Im84dURPNW01bjFzX19YZHNJcmRINXcxcmdJUkkiLCJpc3MiOiJzc2RqeiIsImV4cCI6MTYxNjQyNzg0NSwiaWF0IjoxNjE2NDE3MDQ1fQ.XvCkGAALlDGgrqpO38T3dlcyybv6zUON_i3CU-A2680"
    return new Promise((resolve, reject) => {
        wx.showLoading({
            title: tipName,
        })
        wx.request({
            url: 'https://zxapi.ssjygw.com/api' + url, // 兼容baseUrl不同的情况，可以通过填写完整路径
            method,
            data,
            header,
            success: response => {
                if (response.statusCode >= 200 && response.statusCode < 300) {
                    const {code, data, message} = response.data
                    if (code === 1) {
                        resolve(data)
                    } else if (code === -1) {
                        console.log('登录已经失效')
                        reject()
                    } else {
                        console.log('error')
                        reject(message || 'Error')
                    }
                }
            },
            fail: err => {
                reject(err)
            },
            complete: () => {
                wx.hideLoading()
            }
        })
    })
}

// 请求方式
export default {
    post(url, data) {
        return new Promise((resolve, reject) => {
            axios({
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
    get(url, params) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url,
                params,
            }).then((res) => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}
