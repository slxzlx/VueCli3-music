<template>
  <div class="input-wraper">
    <div class="left">
      <span class="search-icon icon-search"></span>
      <input class="input" type="text" placeholder="搜索歌曲、歌单、专辑" @focus="focus" v-model="val" />
      <span class="cancel icon-dismiss" v-show="val" @click="clearVal"></span>
    </div>
    <div class="right" v-show="isCancelBtnShow" @click="cancel">取消</div>
  </div>
</template>

<script>
import { debounce } from "common/js/util";
export default {
  data() {
    return {
      val: "",
      isCancelBtnShow: false
    };
  },
  created(){
   this.$watch('val',debounce(key=>{
      this.$emit('search',key)
   },300))
  //  this.$watch('val',(key)=>{
  //    if(this.val.length>0) this.can=true
  //    debounce(key=>{
  //      this.$emit('search',key)
  //    },500)
  //  })
  },
  methods: {
    focus() {
      this.isCancelBtnShow = true;
    },
    clearVal() {
      this.val = "";
    },
    cancel() {
      this.isCancelBtnShow = false;
      this.val = "";
    },
    changeKey(key) {
      this.val = key;
      this.isCancelBtnShow=true
    }
  },
  watch: {
    // val(words) {
    //   if (words.length > 0) this.can = true;
    //   debounce(words => {     
    //     this.$emit("search", words);
    //     // console.log('fqi l')
    //   },500);
    // },
    isCancelBtnShow(c) {
      this.$emit("showkeys", c);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~stylus/variable';

.input-wraper {
  background-color: $color-highlight-background;
  padding: 10px;
  display: flex;

  // width 300px
  .left {
    position: relative;
    flex: 1;
    color: #ccc;

    .search-icon, .cancel {
      position: absolute;
      top: 0;
      width: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 20px;
    }

    .cancel {
      right: 0;
      font-size: 14px;
    }

    .search-icon {
      left: 0;
    }

    .input {
      height: 30px;
      font-size: 16px;
      line-height: 30px;
      padding: 10px 30px;
      border: none;
      width: 100%;
      box-sizing: border-box;
      background-color: $color-background-d;
      color: $color-text-ll;
      outline: none;
    }
  }

  .right {
    line-height: 30px;
    padding-left: 10px;
  }
}
</style>