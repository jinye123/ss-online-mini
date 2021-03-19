import {getHomeList, getActivityList} from '../../api/index'

Page({
    data: {
        searchValue: '',
        userInfo: {},
        bannerList: [],
    },
    searchHandle() {
        console.log(1)
    },
    onLoad(query) {
        getHomeList().then(res => {
            const {bannersList} = res
            this.setData({
                bannerList: bannersList
            })

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
