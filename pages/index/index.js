import {getHomeList, getActivityList} from '../../api/index'

Page({
    data: {
        searchValue: '',
        bannerList: [],
        specialList:[],
        trainingCamp: null,
        categoryList: [
            {
                name: '精品课程',
                url: '/card/cardList',
                img: '/static/img/1.png'
            },
            {
                name: '直播课程',
                url: '/liveTv',
                img: '/static/img/2.png'
            },
            {
                name: '训练营',
                url: '/campList',
                img: '/static/img/3.png'
            },
            {
                name: '线下精华',
                url: '/offlineCourse',
                img: '/static/img/4.png'
            }
        ],
    },
    searchHandle() {
        console.log(1)
    },
    categoryClickHandle(event) {
        console.log(event)
    },
    goTrainCampHandle(event) {
        console.log(event)
    },
    onLoad(query) {
        console.log(this.route)
        getActivityList().then(res => {
            const [trainingCamp] = res;
            this.setData({
                trainingCamp: trainingCamp,
            })
        })
        getHomeList().then(res => {
            const {bannersList,stateVo} = res
            this.setData({
                bannerList: bannersList,
                specialList : [stateVo['day']]
            })
        })
    },

})
