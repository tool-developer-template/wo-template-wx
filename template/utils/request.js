import request from '@tool-developer/wx-request';
//
import {BASE_URL} from '../config/base';
//
const xhr = request.create({
  baseURL:BASE_URL,
  prefix:"/api"
});
//
export default xhr;