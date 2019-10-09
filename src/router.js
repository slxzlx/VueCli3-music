import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import recommend from 'cps/recommend/recommend'
import singer from 'cps/singer/singer'
import singerDetail from 'cps/singer/singerDetail'
import rank from 'cps/rank/rank'
import rankDetail from 'cps/rank/rankDetail'
import search from 'cps/search/search'


export default new Router({
    routes:[
        {
            path:'/',
            redirect:'recommend'
        },
        {
            name:'recommend',
            path:'/recommend',
            component:recommend
        },
        {
            name:'singer',
            path:'/singer',
            component:singer,
            children:[
                {
                  name:'singerDetail',
                  path:'singerDetail/:id',
                  component:singerDetail
                }               
            ]
        },
        {
            name:'rank',
            path:'/rank',
            component:rank,
            children:[
                {
                    name:'rankDetail',
                    path:'rankDetail/:id',
                    component:rankDetail
                    
                }
            ]
        },
        {
            name:'search',
            path:'/search',
            component:search
        }
    ],
    linkActiveClass:'active',
    mode:'history'
})
