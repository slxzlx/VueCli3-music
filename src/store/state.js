 import playMode from './playMode.config'
 import {getList} from 'common/js/cache';
const state={
    singer:{},
    playing:false,
    fullScreen:false,
    playList:[],
    playQueue:[],
    curIndex:-1,
    playMode:playMode.queue,
    historyData:getList()
}
export default  state