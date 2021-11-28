/**
 * 自定义扩展，会覆盖基础扩展
 */
export default {
  bindEvents(e,next){
    //
    return next(e);
  },
}