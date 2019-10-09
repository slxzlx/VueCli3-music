const HISTORY_DATA='HISTORY_DATA'
const MAXLENGTH=16

export function saveItem(keywords){
    let dataList= getList()
    if(dataList.length===0){
        dataList.push(keywords)
        localStorage.setItem(HISTORY_DATA,JSON.stringify(dataList))
        return dataList
    }
    let index=dataList.findIndex(i=>{
        return keywords===i
    })
    if(index>-1){
        dataList.splice(index,1)            
    }
    else if(dataList.length>MAXLENGTH){
        dataList.pop()
    }
    dataList.unshift(keywords)   
    localStorage.setItem(HISTORY_DATA,JSON.stringify(dataList))
    return dataList
}
export function getList(){
      let list =  localStorage.getItem(HISTORY_DATA)
      return JSON.parse(list) || []
}
export function delectItem(keywords){
    let dataList= getList()
    let index=dataList.indexOf(keywords)
    if(index<0)
      return
    dataList.splice(index,1)
    localStorage.setItem(HISTORY_DATA,JSON.stringify(dataList))
    console.log(dataList)
    return dataList
}
export function clearHis(){
   localStorage.removeItem(HISTORY_DATA)
   return []
}
// localStorage.setItem(keywords)