function getRandom(min,max) {
    return Math.floor((max-min+1)*Math.random()+min)
}

//要返回一个新的list对象 这个对象的被两处引用
export function shuffle(list) {
    let newList=list.slice(0)
    for (let i=0;i<newList.length;i++){
         let j=getRandom(0,i)
         let temp=newList[i]
         newList[i]=newList[j]
         newList[j]=temp
    }
    return newList
}


//节流函数
export function debounce(func,delay){
    let timer
    return function(...args){
        if(timer){
            clearTimeout(timer)
        }    
        timer=setTimeout(() => {
            func.apply(this,args)
        }, delay);
    }
}