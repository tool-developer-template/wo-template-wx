const app = getApp()
//
const page = app.extend(app.App, {
  data: {
    //
  },
  i18n: {
    'webview.load.error': '页面加载失败，请检查网络后重试！'
  },
  events: {
    'error #load': 'toError',
    'load #load': 'toLoad',
    'message #load': 'toMessage'
  },
  // 加载成功
  toLoad() {
    //
  },
  // 加载失败提示
  toError(e) {
    //加载失败提示
    this.showToast({
      title: this.i18nHandle('webview.load.error'),
      icon: 'none',
      duration: 3000
    });
  },
  // 接收postMessage消息数据
  toMessage() {
    //
  },
  onLoad(options) {
    //
    const url  = decodeURIComponent(options.to);
    //
    this.setData({
      url
    })
  }
})

Page(page)
