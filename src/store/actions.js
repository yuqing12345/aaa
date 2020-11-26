import {reqLogin} from "../util/request"

export const actions = {
  reqUserInfoAction(context,info){
    context.commit("changeUserInfo",info)
  }
}