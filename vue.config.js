const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const express = require('express')
var app = express()
var axios = require('axios')
var apiRoutes = express.Router()
app.use('/api', apiRoutes)
const singerlist=require('./singerList.json')
module.exports = {
  //配置别名
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('common', resolve('src/common'))
      .set('stylus', resolve('src/common/stylus'))
      .set('cps', resolve('src/components'))
      .set('api', resolve('src/api'))
      .set('js', resolve('src/common/js'))
  },

  devServer: {
    //mock请求的接口配置
    host:'0.0.0.0',
    port:8001,
    before(app) {
      app.get('/api/getAlbums', function (req, res) {
        const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
        axios.get(url, {
          headers: {
            referer: "https://m.y.qq.com/",
            host: 'c.y.qq.com'
          }
        }).then(response => {
          res.json(response.data)
        }).catch(e => {
          console.log(e)
        })
      })
      app.get('/api/singerList',function(req,res){
        res.json(singerlist)
      })
      app.get('/api/keywords', function (req, res) {
        const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
        axios.get(url, {
          params: req.query,
          headers: {
            referer: "https://m.y.qq.com/",
            host: 'c.y.qq.com'
          }
        }).then(response => {
          console.log(response)
          res.json(response.data)
        }).catch(e => {
          console.log(e)
        })
      })
    }
  }
}