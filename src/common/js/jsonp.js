import oriJsonp from 'jsonp'

export default function(url,data,option){
    url+=(url.indexOf('?')<0?'?':'&')+param(data)
  return new Promise((resolve,reject)=>{
    console.log('立即执行异步jsonp请求')
    oriJsonp(url,option,(err,data)=>{
        if(err){
          console.log(err)
            console.log('lose')
            reject(err)

        }else{
            console.log('dedaodata')
            resolve(data)
        }
    })
  })
}
function param(data){
  var url=''
  for(var k in data){
   let value=data[k]!==undefined?data[k]:''
   url+=`&${k}=${encodeURIComponent(value)}`
  }
  return url?url.substring(1):''//去除第一个&
}