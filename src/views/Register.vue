<template>
    <div id="poster">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  label-position="left" label-width="0px" class="register-cotainer">
            <h3 class="register-title">
                系统注册
                <el-button  @click="toLogin()">跳转登录</el-button>
            </h3>

          <el-form-item label="" prop="RegisterName">
            <el-input type="text" v-model="ruleForm.RegisterName" autocomplete="off" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
          </el-form-item>

          <el-form-item label="" prop="name">
            <el-input type="text" v-model="ruleForm.name" autocomplete="off" placeholder="请输入网名" prefix-icon="el-icon-user"></el-input>
          </el-form-item>

          <el-form-item label="" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码" prefix-icon="el-icon-lock"></el-input>
          </el-form-item>

          <el-form-item label="" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请确认密码" prefix-icon="el-icon-lock"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" style="background:#505458;border: none;" @click="submitForm('ruleForm')">注册</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>

      </el-form>
    </div>
</template>

<script>

export default {
  name: 'Register',
  components: {

  },
  data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          RegisterName: '',
          name: '',
          password: '',
          checkPass: '',
        },
        rules: {
          RegisterName: [
            { required: true, message: '请输入你的名称', trigger: 'blur' },
            { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(ruleForm) {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$message({
              message: '注册成功',
              type:'success'
            });
          } else {
            this.$message({
              message: '注册失败',
              type: 'error'
            });
          }
        });
        // this.ruleForm={};
        console.log(this.ruleForm.name)
        // this.$message({
        //   message: '恭喜你，注册成功',
        //   type: 'success'
        // });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      toLogin(){
        this.$router.push('/');
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
