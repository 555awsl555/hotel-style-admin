<template>
    <div id="poster">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  label-position="left" label-width="0px" class="register-cotainer">
            <h3 class="register-title">
                账号注册
                <el-button  @click="toLogin()">跳转登录</el-button>
            </h3>

          <el-form-item label="" prop="Sname">
            <el-input type="text" v-model="ruleForm.Sname" autocomplete="off" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
          </el-form-item>

          <el-form-item label="" prop="Sphone">
            <el-input type="text" v-model="ruleForm.Sphone" autocomplete="off" placeholder="请输入电话号码" prefix-icon="el-icon-user"></el-input>
          </el-form-item>

          <el-form-item label="" prop="Sbirth">
                <el-date-picker
                v-model="ruleForm.Sbirth"
                type="date"
                placeholder="选择出生日期"
                value-format="yyyy-MM-dd">
                </el-date-picker>
          </el-form-item>
          
          <el-form-item label="" prop="Ssex">
            <el-select v-model="ruleForm.Ssex" placeholder="请选择性别">
                <el-option label="女" value="2"></el-option>
                <el-option label="男" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="" prop="bossSid">
            <el-select v-model="ruleForm.bossSid" placeholder="请选择上级ID">
                <el-option
                v-for="item in bossIdList"
                :key="item.sid"
                :label="item.sname"
                :value="item.sid">
                </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="" prop="Spwd">
            <el-input type="password" v-model="ruleForm.Spwd" autocomplete="off" placeholder="请输入密码" prefix-icon="el-icon-lock"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" style="background:#505458;border: none;" @click="submitForm('ruleForm')">注册</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>

      </el-form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Register',
  components: {

  },
  data() {
      return {
        ruleForm:{
            Sname:'',
            Ssex:'',
            Sbirth:'',
            Spwd:'',
            Sphone:'',
            bossSid:'',
        },
        bossIdList:[
            {
                sid: 1,
                sname: ""
            },
            {
                sid: 2,
                sname: "123"
            }
        ],
        rules: {
        }
      };
    },
    created(){
        this.getBossIdList()
    },
    methods: {
        async submitForm(ruleForm) {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$message({
              message: '注册申请已提交，等待审核',
              type:'success'
            });
            this.registeraxios();
            this.$router.push('/');
          } else {
            this.$message({
              message: '注册失败',
              type: 'error'
            });
            return 
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      toLogin(){
        this.$router.push('/');
      },

      async registeraxios(){
        let a={};
        a.name = this.ruleForm.Sname
        a.sex = this.ruleForm.Ssex
        a.birth = this.ruleForm.Sbirth
        a.password = this.ruleForm.Spwd
        a.phone = this.ruleForm.Sphone
        a.bossId = this.ruleForm.bossSid
        console.log("提交的表单为：",a)
        const {data:res} = await axios.post('/register',a)
        console.log("注册返回的结果为:",res)
      },

      async getBossIdList(){
        const {data:res} = await axios.get('/login/getAdminStaff')
        console.log("getbossidlist的请求为：",res)
        if (res.status == 200){
            this.bossIdList = res.adminStaff
        }
        console.log("获取的idlist为：",this.bossIdList)
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
    margin:0px;
    padding:0px;
}
    .register-cotainer{
        border-radius: 15px;
        background-clip: padding-box;
        margin: 90px auto;
        width:350px;
        padding:35px 35px 15px 35px;
        background: #fff;
        border:1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .register-title{
        margin:0px auto 40px auto;
        text-align: center;
        color:#505458;
    }
</style>
