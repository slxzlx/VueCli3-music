import * as mut_types from './mutation-type'

var mutations={
   [mut_types.Set_singer](state,singer){
       state.singer=singer
   },
   [mut_types.Set_playing](state,flag){
       state.playing=flag
   },
   [mut_types.Set_fullScreen](state,flag){
       state.fullScreen=flag
   },
   [mut_types.Set_playList](state,playList){
       state.playList=playList
   },
   [mut_types.Set_playQueue](state,playQueue){
       state.playQueue=playQueue
   },
   [mut_types.Set_curIndex](state,curIndex){
       state.curIndex=curIndex
   },
   [mut_types.Set_playMode](state,mode){
       state.playMode=mode
   },
   [mut_types.Set_history](state,history){
    state.historyData=history
}
}
export default mutations