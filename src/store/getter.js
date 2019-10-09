export default {
    singer: state =>state.singer,
    playing:state => state.playing,
    fullScreen:state=>state.fullScreen,
    playList:state=>state.playList,
    playQueue:state=>state.playQueue,
    curIndex:state=>state.curIndex,
    playMode:state=>state.playMode,
    curSong:state=>{
        return state.playList[state.curIndex]||[]
    },
    history:state=>state.historyData

}
