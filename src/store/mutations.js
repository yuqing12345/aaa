export const state = {
  userInfo:sessionStorage.getItem("userInfo")?JSON.parse(sessionStorage.getItem("userInfo")):{}
}
export const getters = {
  userInfo(state){
    return state.userInfo
  }
}
export const mutations = {
  changeUserInfo(state,info){
    state.userInfo = info

    if(info.id){
    //在本地存储也存一份
    sessionStorage.setItem("userInfo",JSON.stringify(info))
    }else{
    //清空本地存储的userInfo
    sessionStorage.removeItem("userInfo")
    }
  }
}