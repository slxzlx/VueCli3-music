import jsonp from 'common/js/jsonp'
import {commonParams,options} from './query.config'

export function getRanklist() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?'

  const data = Object.assign({}, commonParams, {
    _: 1562218589616,
    g_tk: 5381,
    uin: 0,
    platform: 'h5',
    needNewCode: 1
  })

  return jsonp(url, data, options)
}