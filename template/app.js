// app.js
import wxapp from '@tool-developer/wx-app';
import defapp from './defapp';

// 兼容处理
//global.wx = tt;

// 底部导航列表
wxapp.TabBarList = [
  //
];
// 自定义扩展
Object.assign(wxapp,defapp)
//
const options = wxapp.extend(
  wxapp,{
    App:wxapp,// 提供给子页面，直接通过app.App获取
    onLaunch() {
      // 展示本地存储能力
      const logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
        }
      })
    },
    globalData: {
      userInfo: null
    }
  }
)
//
App(options)
