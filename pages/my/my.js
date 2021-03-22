Page({
    data: {},
    onLoad: function (options) {
        wx.getSetting({
            success (res) {
                console.log(res.authSetting)
                // res.authSetting = {
                //   "scope.userInfo": true,
                //   "scope.userLocation": true
                // }
            }
        })
    }
});
