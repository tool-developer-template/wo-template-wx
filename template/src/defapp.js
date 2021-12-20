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
  // 页面使用onPageShow
  onShow(options) {
    //
    //
    this.onPageShow && this.onPageShow(options);
  },
  // 页面使用onPageLoad
  onLoad(options){
    //
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