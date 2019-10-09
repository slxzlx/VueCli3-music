<template>
  <div class="box-container" :style='{transform:"translateX(" + space/2 + "px)"}'>
     <slot name='title'></slot>
     <div class="item" v-for='(item,index) in dataArr' :key='index' :style='{paddingRight:space+"px",width:1/rowCount*100+"%"}'>
         <a :href="item.linkUrl">
             <div class="img-info">
               <img :src="item.imgUrl" >
               <slot name='listenCount'></slot>
             </div>          
            <h3 :class='textAlign'>{{item.desc}}</h3>   
            <p v-if='item.author' :class='textAlign'>{{item.author}}</p> 
         </a>      
     </div>
  </div>
</template>

<script>
export default {
  props: {
      rowCount:{
         Object:Number,
         default: 2
      },
      textAlign:{
         Object:String,
         default: 'left'
      },
      space:{
         Object:Number,
         default: 8
      },
     dataArr: {
      type: Array,
      default() {
        return [
            {
              linkUrl: "javascirpt::void(0)",
              imgUrl:
                "http://y.gtimg.cn/music/photo/radio/track_radio_199_13_1.jpg",
              desc: "解放路卡萨发就连卡萨帝发阿斯多夫阿斯多夫撒旦",
              author:'wuming'
            },
            {
              linkUrl: "javascirpt::void(0)",
              imgUrl:
                "http://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg",
              desc: "ahahah"
            },
            {
              linkUrl: "javascirpt::void(0)",
              imgUrl:
                "http://p.qpic.cn/music_cover/z8wAFqicQ1qhImeiajkrgiaR4hYM3pzsUULFnicXshFXdw9uGkm261Ex9g/300?n=1",
              desc: "ahahah"
            },
          ]
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~stylus/variable'
.box-container {
    .item{
        display inline-block
        box-sizing border-box
        margin-top 5px
        a{
          display block
          .img-info{
            position relative
            img {
            width 100%
            display block
            margin-bottom 5px
            }
          }
        p,h3{
            padding 0 5px
            line-height 24px
            color $color-text-l
            overflow: hidden
            white-space: nowrap
            text-overflow ellipsis
            font-size 14px
            &.left{
                text-align left
            }
            &.right{
                text-align right
            }
            &.center{
                text-align center
            }

            }
        }
    }
}
</style>