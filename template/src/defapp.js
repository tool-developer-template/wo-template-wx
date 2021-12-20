import storage from '@tool-developer/wx-storage';
import {CLOUD_STORAGE_SETTING} from './config/base'
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
  /**
   * 
   * @param {name}
   * @param {data}
   * @param {config}
   * @param {expired} 存储过期时间,0为不存储，-1为永久存储
   * @returns 
   */
  cc({name,data = {},config = {},expired}){
    //
    const key = [CLOUD_STORAGE_SETTING.key,name,data.type].join(':');
    const ct = storage.get(key);
    if(ct){
      //
      return Promise.resolve(ct);
    }
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
      // 缓存
      if(expired){
        //
        expired = typeof expired === 'number' ? expired : CLOUD_STORAGE_SETTING.expired;
        //
        storage.set(key,resp.result,expired)
      }
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