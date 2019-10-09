import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex)

import state from './state'
import mutations from './mutation'
import getters from './getter'
import * as actions from './action'
const store=new vuex.Store({
   state,
   mutations,
   getters,
   actions
})
export default  store