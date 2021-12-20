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
    globalData: {
      //
    },
    onLaunch() {
      // 使用云开发
      if (!wx.cloud) {
        //
        console.error('请使用 2.2.3 或以上的基础库以使用云能力');
      } else {
        //
        wx.cloud.init({
          // env 参数说明：
          //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
          //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
          //   如不填则使用默认环境（第一个创建的环境）
          // env: 'my-env-id',
          traceUser: true,
        });
      }
    }
  }
)
//
App(options)
