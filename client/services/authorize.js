export function authenticate (res){
    if(window !== undefined){ 
        sessionStorage.setItem("token",JSON.stringify(res.data.token))
    }
}

export function getToken(){
    if(window !== undefined){
        if(sessionStorage.getItem('token')){
            return JSON.parse(sessionStorage.getItem('token'))
        }
    }
    else{
        return false
    }
}

export function logout(){
    if(window !== undefined){
        sessionStorage.removeItem('token')
    }
}