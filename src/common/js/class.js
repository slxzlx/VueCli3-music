export class singer {
    constructor(Fname,Fmid){
        this.id=Fmid
        this.Fname=Fname
        this.FimgUrl=`https://y.gtimg.cn/music/photo_new/T001R300x300M000${Fmid}.jpg`
    }
} 

class Song{
  constructor({id,mid,singer,name,albumn,duration,image,url}){
      this.id=id,
      this.mid=mid,
      this.singer=singer,
      this.name=name,
      this.albumn=albumn,
      this.duration=duration,
      this.image=image,
      this.url=url
  }
}

export function createSong(musicdata){
   return new Song({
       id:musicdata.songid,
       mid:musicdata.songmid,
       singer:getSinger(musicdata),
       name:musicdata.songname,
       albumn:musicdata.albumname,
       duration:musicdata.interval,
       image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicdata.albummid}.jpg?max_age=2592000`,
       url: `http://ws.stream.qqmusic.qq.com/${musicdata.songid}.m4a?fromtag=46`
   })
}
//歌的数据是list 可能不只一个演唱者
function getSinger(musicdata){
    if(!musicdata.singer)
     return '无名'
     let name=[]
     musicdata.singer.forEach(s=>{
           name.push(s.name)
     })
     return name.join('/')
}