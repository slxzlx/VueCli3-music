import jsonp from 'common/js/jsonp'
import { commonParams, options } from './query.config'

export function getHotKey() {
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

    const data = Object.assign({}, commonParams, {
        _: 1562218589616,
        g_tk: 5381,
        uin: 0,
        platform: 'h5',
        needNewCode: 1,
    })

    return jsonp(url, data, options)
}
import axios from 'axios'
export function getResult(keywords,page,zhida) {
    const url='/api/keywords'
    const data = Object.assign({}, commonParams, {
        _: 1562393929284,
        g_tk: 5381,
        uin: 0,
        platform: 'h5',
        needNewCode: 1,
        w: keywords,
        zhidaqu: 1,
        catZhida: zhida?1:0,
        t: 0,
        flag: 1,
        ie: 'utf-8',
        sem: 1,
        aggr: 0,
        perpage: 20,
        n: 20,
        p: page,
        remoteplace: 'txt.mqq.all',
        format:'json'
    })
    return axios.get(url, {
        params: data
    }).then(res => {
        return Promise.resolve(res.data)
    })
}
// export function getResult(keywords,page,zhida){
//     const url='https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
//     const data = Object.assign({}, commonParams, {
//         _: 1562393929284,
//         g_tk: 5381,
//         uin: 0,
//         platform: 'h5',
//         needNewCode: 1,
//         w: '周杰伦',
//         zhidaqu: 1,
//         catZhida: 1,
//         t: 0,
//         flag: 1,
//         ie: 'utf-8',
//         sem: 1,
//         aggr: 0,
//         perpage: 20,
//         n: 20,
//         p: 1,
//         remoteplace: 'txt.mqq.all'
//       })

//       return jsonp(url, data, options)
// }