const db = require('./lib/index');

// 云函数入口函数
exports.main = async (event, context) => {
  //
  const handle = db[event.type];
  if(handle){
    //
    return await handle(event, context);
  }
  //
  return Promise.reject({
    error:'No the method'
  });
};
