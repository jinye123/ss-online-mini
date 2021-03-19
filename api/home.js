import http from '../utils/request'

// 首页数据
export function getHomeList() {
    return http.post('/wx/courses/index')
}

// 首页数据
export function getActivityList() {
    return http.get('/wx/courses/activity')
}
