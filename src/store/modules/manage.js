import {reqManageList,reqManageCount} from "../../util/request"
// 存放数据
const state = {
  // 列表数据
  list:[],
  // 每页显示的条数
  size:2,
  // 总数据条数
  total:0,
  // 当前页码数
  page:1
}
// 修改数据
const mutations = {
  changeList(state,arr){
    state.list = arr
  },
  // 修改总数据条数total
  changeTotal(state,num){
    state.total = num
  },
  // 修改当前页码page
  changePage(state,num){
    state.page = num
  }
}
// 请求
const actions = {
  // 请求列表数据
  reqChangeList(context){
    reqManageList({page:context.state.page,size:context.state.size}).then(res=>{
      // 如果取list的时候，取到null，那么有可能是最后一页没数据，需要减一页，再次请求list
      let list = res.data.list?res.data.list:[]
      // 如果取到的数据是null，并且不是第一页的时候，页码就减一，重新请求list
      if(context.state.page > 1 && list.length==0){
        context.commit("changePage",context.state.page-1)
        context.dispatch("reqChangeList")
        return;
      }
      context.commit("changeList",list)
    })
  },
  // 请求总数据条数
  reqChangeTotal(context){
    reqManageCount().then(res=>{
      context.commit("changeTotal",res.data.list[0].total)
    })
  },
  // 修改当前页码page
  reqChangePage(context,num){
    // 组件修改了页码
    context.commit("changePage",num)
    // 重新请求list数据
    context.dispatch("reqChangeList")
  }
}
// 导出数据
const getters = {
  // 导出列表数据
  list(state){
    return state.list
  },
  // 导出每页显示的条数size
  size(state){
    return state.size
  },
  // 导出总数据条数total
  total(state){
    return state.total
  },
  // 导出当前页码
  page(state){
    return state.page
  }
}

export default{
  state,
  mutations,
  actions,
  getters,
  // 命名空间
  namespaced: true
}