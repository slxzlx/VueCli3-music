<template>
  <div>
      <ul class="list-wraper">
          <li class="item" v-for="(h,i) in history" :key='i' @click='chooseHistory(h)'>
              <p class="text">{{h}}</p>
              <span class="icon icon-ok"></span>
              <span class="close icon-delete" @click.stop='delHistory(h)'></span>
          </li>
      </ul>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
methods:{
    delHistory(h){
      this.delectHistory(h)
      console.log(this.history) 
    },
    chooseHistory(h){
      this.$emit('choose',h)
    },
    ...mapActions(['delectHistory'])
},
computed:{
    ...mapGetters(['history'])
}
};
</script>

<style lang="stylus" scoped>
.list-wraper{
    .item{
        position relative
        line-height 40px
        border-bottom 1px solid rgba(230,230,230,.5)
        font-size 14px
        .text{
           margin 0 40px
           white-space nowrap
           overflow hidden
           text-overflow ellipsis
        }
        .icon,.close{
            position absolute
            top 0
            text-align center
            display inline-block
            width 40px
            height 40px
        }
        .icon{
            left 0
            line-height 40px
        }
        .close{
            right 0
            line-height 40px
        }
    }
}
</style>