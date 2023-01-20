function getStorageKey(key:any, base:any){

    if(localStorage.getItem(key) != undefined){
        return localStorage.getItem(key)
    }
    
    else{
        localStorage.setItem(key, base)
        return localStorage.getItem(key)
    }
}

function setStorageKey(key:any, base:any){
    localStorage.setItem(key, base)
}

export { getStorageKey , setStorageKey}