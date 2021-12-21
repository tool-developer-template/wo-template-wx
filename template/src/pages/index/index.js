// index.js
// 获取应用实例
const app = getApp()
//
const page = app.extend(app.App,{
  data: {},
  events:{
    'tap #openid':"getOpenId",
    'tap #clear':'clearOpenId'
  },
  // 获取openId
  getOpenId(){
    // wx.cloud.callFunction
    this.cc({
      name: 'db',
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
