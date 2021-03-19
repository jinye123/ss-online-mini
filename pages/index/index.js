Page({
    data: {
        msg: '点击获取用户信息',
        userInfo: {}
    },
    onLoad(query) {
        console.log('onLoad')
        wx.login({
            success (res) {
                if (res.code) {
                    console.log(res)
                    //发起网络请求
                    // wx.request({
                    //     url: 'https://test.com/onLogin',
                    //     data: {
                    //         code: res.code
                    //     }
                    // })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })
        console.log('wx.getUserProfile', wx.canIUse('wx.getUserProfile'))
        wx.getUserInfo({
            success: res => {
                this.setData({
                    userInfo: res.userInfo
                })
            },
            fail: err => {
                console.log(err)
            }
        })
    },
    onReady() {
        console.log('onReady')
    },
    getUserInfoHandle(res) {
        const {userInfo} = res.detail
        this.setData({
            userInfo: userInfo
        })
    }
})
