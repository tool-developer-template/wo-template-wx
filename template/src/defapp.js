/**
 * 自定义扩展，会覆盖基础扩展
 */
export default {
  // 事件捕获
  bindEvents(e,next){
    //
    //
    return next(e);
  },
  // 云函数调用
  cc({name,data = {},config = {}}){
    //
    this.showLoading();
    //
    return wx.cloud.callFunction({
      name,
      config: {
        ...(config || {}),
        env: this.envId,// 这里直接没有注入到data上
      },
      data
    }).then((resp)=>{
      //
      this.hideLoading();
      //
      return resp.result;
    }).catch(()=>{
      //
      this.hideLoading();
    })
  },
  // 页面使用onPageShow
  onShow(options) {
    //
    //
    this.onPageShow && this.onPageShow(options);
  },
  // 页面使用onPageLoad
  onLoad(options){
    //
    this.envId = options.envId;
    //
    this.onPageLoad && this.onPageLoad(options);
  },
  // 页面使用onPageUnload
  onUnload(){
    //
    //
    this.onPageUnload && this.onPageUnload();
  }
}