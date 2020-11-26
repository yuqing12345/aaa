<template>
  <div class="login">
    <div class="box">
      <h3 class="center marginBottom">登录</h3>
      <div class="marginBottom">
        <el-input placeholder="请输入用户名" v-model="info.username" clearable></el-input>
      </div>
      <div class="marginBottom">
        <el-input placeholder="请输入密码" v-model="info.password" clearable show-password></el-input>
      </div>
      <div class="center">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {reqLogin} from "../../util/request"
  import {
    mapGetters,
    mapActions
  } from 'vuex';
  import { successAlert, warningAlert } from "../../util/alert";
  export default {
    props: [],
    components: {},
    data() {
      return {
        info:{
          username:'',
          password:''
        }
      };
    },
    computed: {
      ...mapGetters({
        userInfo:"userInfo"
      }),
    },
    methods: {
      ...mapActions({
        reqUserInfoAction: "reqUserInfoAction"
      }),
      //登录
      login(){
        reqLogin(this.info).then(res=>{
          console.log(res)
          if(res.data.code === 200){
            successAlert(res.data.msg)
            // 1、存res.data.list。不仅存了状态层还存了本地存储
            this.reqUserInfoAction(res.data.list)

            // 2、进入页面
            this.$router.push("/")
          }else{
            warningAlert(res.data.msg)
          }
        })
      }
    },
    mounted() {},
  };

</script>
<style scoped>
.login{
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right,rgb(74,41,55),rgb(37,51,85));
  position: relative;
}
.box{
  width: 400px;
  padding: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  background: white;
  border-radius: 10px;
}
.center{
  text-align: center;
}
.marginBottom{
  margin-bottom: 20px;
}
</style>
