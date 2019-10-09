<template>
  <div ref='wraper' class='wraper'>
    <slot></slot>
  </div>
</template>

<script>
import bscroll from "better-scroll";
// import bscroll from "../../../node_modules/iscroll/build/iscroll-probe.js";
export default {
  props: {
    probeType: {
      type: Number,
      default: 3
    },
    click: {
      type: Boolean,
      default: true
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: null
    },
    pullup: {
      type: Boolean,
      default: false
    },
    beforeScroll: {
      type: Boolean,
      default: false
    },
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 30);
    
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wraper) return;
      this.scroll = new bscroll(this.$refs.wraper, {
        probeType: this.probeType,
        click: this.click,
         mouseWheel: false,
      });
      if (this.listenScroll) {
        this.scroll.on("scroll", (pos) => {
          this.$emit("sliVal", pos);
        });
      }
      if(this.pullup){
        this.scroll.on('scrollEnd',()=>{
          if(this.scroll.y<this.scroll.maxScrollY+50){
            this.$emit('onScrollend')
          }
        })
      }
       
    },
    refresh() {
      if(this.scroll){
         this.scroll.refresh();
      }
    },
    scrollTo(el,time) {
      this.scroll.scrollToElement(el, time);
    }
  },
  watch: {
    data() {
      this.$nextTick(()=>{
        this.refresh()
      })
      
    }
  }
};
</script>

<style lang="scss" scoped>
.wraper{
  height: 100%;
  // overflow: hidden;
}
</style>