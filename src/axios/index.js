import JsonP from 'jsonp'
import axios from 'axios';
import {Modal} from 'antd'
/**
 * 封装jsonp
 * @param {*} url 原始的jsonp第一个参数是url，第二个参数是option，这里为了比较好写参数做了下封装
 * @param {obj} data 参数
 * @param {*} option jsonp的option
 */

export default class Axios {
    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(options.url,{
                param: 'callback'
            },(err,res) => {
                if (!err) {
                    resolve(res)
                } else {
                    reject(err)
                }
            })
        })
    }

       static ajax(options) {
           let baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
           return new Promise((resolve, reject) => {
               axios({
                   url: options.url,
                   method: 'get',
                   baseURL: baseApi,
                   timeout: 5000,
                   params: (options.data && options.data.params) || ''
               }).then((response) => {
                   if (response.status === 200) {
                       let res = response.data;
                       if (res.code === 0) {
                           resolve(res);
                       } else {
                           Modal.info({
                               title: "提示",
                               content: res.msg
                           })
                       }
                   } else {
                       reject(response.data);
                   }
               })
           });
       }
}