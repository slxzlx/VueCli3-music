import * as  mutationType from './mutation-type' 
import playMode from './playMode.config'
import {shuffle} from '../common/js/util'

function findIndex(list,song){
   return list.findIndex(i=>{
      return i.id===song.id
   })
}
export function selectPlay({commit,state},{list,index}){
   //点击列表的时候如果当前模式是随机播放那么则需要打乱数组
   if(state.playMode===playMode.random){
      let randomList=shuffle(list)
      index=findIndex(randomList,list[index])
      commit(mutationType.Set_playList,randomList)
   }
   else{
      commit(mutationType.Set_playList,list)
   } 
   commit(mutationType.Set_playQueue,list)
   commit(mutationType.Set_curIndex,index)
   commit(mutationType.Set_fullScreen,true)
   commit(mutationType.Set_playing,true)
}

export function autoPlay({commit,state},{list,index}){
   let autoList=shuffle(list)
   commit(mutationType.Set_playList,autoList)
   commit(mutationType.Set_playMode,playMode.random)
   commit(mutationType.Set_playQueue,list)
   commit(mutationType.Set_curIndex,0)
   commit(mutationType.Set_fullScreen,true)
   commit(mutationType.Set_playing,true)
}

export function addSong({commit,state},song){
   let songlist=state.playList.slice()
   let index=songlist.findIndex(s=>{
      return s.id===song.id
   })
   if(index<0){
      songlist.push(song)
      index=songlist.length-1
   }
   commit(mutationType.Set_playList,songlist)
   commit(mutationType.Set_playQueue,songlist)
   commit(mutationType.Set_curIndex,index)
   commit(mutationType.Set_fullScreen,true)
   commit(mutationType.Set_playing,true)
}



import {saveItem,clearHis,delectItem} from 'common/js/cache'

export function setHistory({commit,state},keywords){
   commit(mutationType.Set_history,saveItem(keywords))
}
export function delectHistory({commit,state},keywords){
   commit(mutationType.Set_history,delectItem(keywords))
}
export function clearHistory({commit,state}){
   commit(mutationType.Set_history,clearHis())
}
