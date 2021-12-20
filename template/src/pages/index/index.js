// index.js
// 获取应用实例
const app = getApp()
//
const page = app.extend(app.App,{
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  events:{
    'tap #openid':"getOpenId",
    'tap #clear':'clearOpenId'
  },
  // 获取openId
  getOpenId(){
    // wx.cloud.callFunction
    this.cc({
      name: 'quickstartFunctions',
      data: {
        type: 'getOpenId'
      }
    }).then((resp)=>{
      //
      this.setData({
        haveGetOpenId:true,
        openId:resp.openid
      });
    })
  },
  // 清除
  clearOpenId() {
    //
    this.setData({
      haveGetOpenId: false,
      openId: ''
    });
  },
  onPageLoad() {
    //
  }
})

Page(page)
