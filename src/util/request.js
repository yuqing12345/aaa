import axios from "axios"
import qs from "qs"
import Vue from "vue"
import store from "../store"

// 开发环境
// let baseUrl = "/api"
// Vue.prototype.$imgUrl = "http://localhost:3000/"

// 上线环境
let baseUrl = ""
Vue.prototype.$imgUrl = ""

// 请求拦截
axios.interceptors.request.use(req=>{
  //判断是不是登录页面，如果不是登录页那么就要添加authorization
  if(req.url != baseUrl+"/api/login"){

    req.headers.authorization = store.state.userInfo.token
  }
  return req
})



// 响应拦截
axios.interceptors.response.use(res => {
  console.group("======本次请求的路径：" + res.config.url)
  console.log(res)
  console.groupEnd("请求结束")
  return res
})
/* ===================Menu菜单管理===================== */
// 添加
export const reqMenuAdd = (form) => {
  return axios({
    url: baseUrl + "/api/menuadd",
    method: "post",
    data: qs.stringify(form)
  })
}
// menu列表
export const reqMenuList = ()=>{
  return axios({
    url: baseUrl + "/api/menulist",
    method: "get",
    params:{
      istree:true
    }
  })
}
// 删除
export const reqMenuDel = (id)=>{
  return axios({
    url: baseUrl+"/api/menudelete",
    method:"post",
    data:qs.stringify({id:id})
  })
}
// 获取一条数据
export const reqMenuOne = (id)=>{
  return axios({
    url:baseUrl+"/api/menuinfo",
    method:"get",
    params:{
      id:id
    }
  })
}
// 修改数据
export const reqMenuUpdate = (form)=>{
  return axios({
    url:baseUrl+"/api/menuedit",
    method:"POST",
    data:qs.stringify(form)
  })
}

/* ===================role角色管理===================== */
// 添加
export const reqRoleAdd = (form) => {
  return axios({
    url: baseUrl + "/api/roleadd",
    method: "post",
    data: qs.stringify(form)
  })
}
// 列表
export const reqRoleList = ()=>{
  return axios({
    url: baseUrl + "/api/rolelist",
    method: "get"
  })
}
// 删除
export const reqRoleDel = (id)=>{
  return axios({
    url: baseUrl+"/api/roledelete",
    method:"post",
    data:qs.stringify({id:id})
  })
}
// 获取一条数据
export const reqRoleOne = (id)=>{
  return axios({
    url:baseUrl+"/api/roleinfo",
    method:"get",
    params:{
      id:id
    }
  })
}
// 修改
export const reqRoleUpdate = (form)=>{
  return axios({
    url:baseUrl+"/api/roleedit",
    method:"POST",
    data:qs.stringify(form)
  })
}

/* ===================manage管理员管理===================== */
// 添加
export const reqManageAdd = (form) => {
  return axios({
    url: baseUrl + "/api/useradd",
    method: "post",
    data: qs.stringify(form)
  })
}
// 管理员总数（用于分页）
export const reqManageCount = () => {
  return axios({
    url: baseUrl + "/api/usercount",
    method: "get",
  })
}
// 管理员列表(用于分页)
export const reqManageList = (params)=>{
  return axios({
    url: baseUrl + "/api/userlist",
    method: "get",
    params:params
  })
}
// 删除
export const reqManageDel = (uid)=>{
  return axios({
    url: baseUrl+"/api/userdelete",
    method:"post",
    data:qs.stringify({uid:uid})
  })
}
// 获取一条数据
export const reqManageOne = (uid)=>{
  return axios({
    url:baseUrl+"/api/userinfo",
    method:"get",
    params:{
      uid:uid
    }
  })
}
// 修改数据
export const reqManageUpdate = (form)=>{
  return axios({
    url:baseUrl+"/api/useredit",
    method:"POST",
    data:qs.stringify(form)
  })
}

// 登录
export const reqLogin = (form)=>{
  return axios({
    url:baseUrl+"/api/userlogin",
    method:"POST",
    data:qs.stringify(form)
  })
}

/* ===================cate商品分类===================== */
// 添加
export const reqCateAdd = (form) => {
  let data = new FormData()
  // data.append("pid",form.pid)
  // data.append("catename",'form.catename')
  // data.append("img",form.img)
  // data.append("status",form.status)
  
  for(let i in form){
    data.append(i,form[i])
  }

  return axios({
    url: baseUrl + "/api/cateadd",
    method: "post",
    data: data
  })
}
// cate列表
export const reqCateList = (params)=>{
  return axios({
    url: baseUrl + "/api/catelist",
    method: "get",
    params:params
  })
}
// 删除
export const reqCateDel = (id)=>{
  return axios({
    url: baseUrl+"/api/catedelete",
    method:"post",
    data:qs.stringify({id:id})
  })
}
// 获取一条数据
export const reqCateOne = (id)=>{
  return axios({
    url:baseUrl+"/api/cateinfo",
    method:"get",
    params:{
      id:id
    }
  })
}
// 修改数据
export const reqCateUpdate = (form)=>{
  let data = new FormData()

  for(let i in form){
    data.append(i,form[i])
  }

  return axios({
    url:baseUrl+"/api/cateedit",
    method:"POST",
    data:data
  })
}

/* ===================specs商品规格===================== */
// 添加
export const reqSpecsAdd = (form) => {
  return axios({
    url: baseUrl + "/api/specsadd",
    method: "post",
    data: qs.stringify(form)
  })
}
// 管理员总数（用于分页）
export const reqSpecsCount = () => {
  return axios({
    url: baseUrl + "/api/specscount",
    method: "get",
  })
}
// 管理员列表(用于分页)
export const reqSpecsList = (params)=>{
  return axios({
    url: baseUrl + "/api/specslist",
    method: "get",
    params:params
  })
}
// 删除
export const reqSpecsDel = (id)=>{
  return axios({
    url: baseUrl+"/api/specsdelete",
    method:"post",
    data:qs.stringify({id:id})
  })
}
// 获取一条数据
export const reqSpecsOne = (id)=>{
  return axios({
    url:baseUrl+"/api/specsinfo",
    method:"get",
    params:{
      id:id
    }
  })
}
// 修改数据
export const reqSpecsUpdate = (form)=>{
  return axios({
    url:baseUrl+"/api/specsedit",
    method:"POST",
    data:qs.stringify(form)
  })
}

/* ===================goods商品管理===================== */
// 添加
export const reqGoodsAdd = (form) => {
  let data = new FormData()
  // data.append("pid",form.pid)
  // data.append("catename",'form.catename')
  // data.append("img",form.img)
  // data.append("status",form.status)
  
  for(let i in form){
    data.append(i,form[i])
  }

  return axios({
    url: baseUrl + "/api/goodsadd",
    method: "post",
    data: data
  })
}
// 商品总数（用于分页）
export const reqGoodsCount = () => {
  return axios({
    url: baseUrl + "/api/goodscount",
    method: "get",
  })
}

// goods列表(用于分页)
export const reqGoodsList = (params)=>{
  return axios({
    url: baseUrl + "/api/goodslist",
    method: "get",
    params:params
  })
}
// 删除
export const reqGoodsDel = (id)=>{
  return axios({
    url: baseUrl+"/api/goodsdelete",
    method:"post",
    data:qs.stringify({id:id})
  })
}
// 获取一条数据
export const reqGoodsOne = (id)=>{
  return axios({
    url:baseUrl+"/api/goodsinfo",
    method:"get",
    params:{
      id:id
    }
  })
}
// 修改数据
export const reqGoodsUpdate = (form)=>{
  let data = new FormData()

  for(let i in form){
    data.append(i,form[i])
  }

  return axios({
    url:baseUrl+"/api/goodsedit",
    method:"POST",
    data:data
  })
}