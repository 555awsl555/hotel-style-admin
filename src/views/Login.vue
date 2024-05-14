<template>
    <body id="poster">
        <el-form  class="login-cotainer" label-position="left" label-width="0px">
            <h3 class="login-title">
                酒店管理系统
                <el-button  @click="toRegister()">点击注册</el-button>
            </h3>
            <el-form-item label="">
                <el-input type="text" v-model="loginForm.loginName" autocomplete="off" placeholder="账号"></el-input>
            </el-form-item>
   
            <el-form-item label="">
                <el-input  type="password"  v-model="loginForm.password" autocomplete="off" placeholder="密码"></el-input>
            </el-form-item>

            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;background-color: #505458;border:none" @click="toLogin()">登录</el-button>
            </el-form-item>
</el-form>
    </body>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Login',
  components: {

  },
  data() {
      return {
        loginForm: {
            loginName: '',
            password:''
        }
      }
    },
    methods: {
      toLogin() {
        console.log('提交的用户账号：'+this.loginForm.loginName);
        console.log('提交的用户密码：'+this.loginForm.password);

        axios.get(`/login?loginName=${this.loginForm.loginName}&password=${this.loginForm.password}`).then((resp) =>{
            console.log("登录获得的请求为",resp);
            let data = resp.data;
            
            if(data.status == 200)
            {
                this.loginForm={};
                this.$message({
                    message: '恭喜你，登录成功',
                    type: 'success'
                });
                this.$router.push('/home')
                this.$store.commit("SET_SBOSSID",data.staff.sbossId)
                this.$store.commit("SET_JOBNAME",data.staff.jobName)
                this.$store.commit("SET_SID",data.staff.sid)
            }else
            {
                this.$message({
                    message: '登录失败,请检测账号密码',
                    type: 'error'
                });
                this.loginForm.password='';
            }
            }
        )
      },
      toRegister() {
        this.$router.push('/register')
      }
    }
}
</script>

<style scoped>
#poster{
    background-position: center;
    height:100%;
    width:100%;
    background-size:cover;
    position:fixed;
}
    body{
        margin:0px;
        padding:0px;
    }
    .login-cotainer{
        border-radius: 15px;
        background-clip: padding-box;
        margin: 90px auto;
        width:350px;
        padding:35px 35px 15px 35px;
        background: #fff;
        border:1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .login-title{
        margin:0px auto 40px auto;
        text-align: center;
        color:#505458;
    }
</style>