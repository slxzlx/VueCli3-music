import jsonp from 'common/js/jsonp'
import {commonParams,options} from './query.config'

export  function getCommendData(){
    const url='https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
    const data=Object.assign({},commonParams,{
        platform:'h5',
        uin:0,
        needNewCode:1,
        // formate:'jsonp '
   })
   return jsonp(url,data,options)
}


import axios from 'axios'
export function getAlbums(){
    const url='/api/getAlbums'
    const data=Object.assign({},commonParams,{
        platform: 'yqq',
        hostUin: 0,
        sin: 0,
        ein: 29,
        sortId: 5,
        needNewCode: 0,
        categoryId: 10000000,
        rnd: Math.random(),
        format: 'jsonp'
   })
   return axios.get(url,{
       params:data
   }).then(res=>{
       return Promise.resolve(res.data)
   })
}
