<template>
  <div> 
    <el-container class="home-container">
      <!--头部区域-->
      <el-header>
        <span></span>
        <span>后台管理系统</span>
        <el-button type="info" @click="Logout()">退出</el-button>
      </el-header>
      <!--内容区域-->
      <el-container>
        <!--侧边栏-->
        <el-aside :width="isCollapse? '64px' : '200px'">
          <div class="toggle-button" @click="toggleCollapse()">|||</div>
          <!-- 侧边栏菜单区 -->
          <el-menu background-color="#333744" text-color="#fff" active-text-color="#ffd04b" 
          unique-opened :collapse="isCollapse" :collapse-transition="false" :router="true"
          :default-active="activePath">

             <el-submenu index="1">
              <!-- 一级菜单模板区 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>成果管理</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item index="/source/control" @click="saveNavState('/source/control')">
                  <!-- 图标 -->
                  <i class="el-icon-setting"></i>
                  <!-- 文本 -->
                  <span>下载链接上传</span>
              </el-menu-item>
            </el-submenu>
      
            <el-submenu index="2" v-if="$store.state.jobName === '超级管理员' || $store.state.jobName === '管理员'">
              <!-- 一级菜单模板区 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>客房管理</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item index="/roomType" @click="saveNavState('/roomType')">
                  <!-- 图标 -->
                  <i class="el-icon-setting"></i>
                  <!-- 文本 -->
                  <span>客房类型设置</span>
              </el-menu-item>
              <el-menu-item index="/roomInformation" @click="saveNavState('/roomInformation')">
                  <!-- 图标 -->
                  <i class="el-icon-setting"></i>
                  <!-- 文本 -->
                  <span>客房信息设置</span>
              </el-menu-item>

            </el-submenu>

            <el-submenu index="3" v-if="$store.state.jobName === '超级管理员' || $store.state.jobName === '管理员'">
              <!-- 一级菜单模板区 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>账号管理</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item index="/staffApprove" @click="saveNavState('/staffApprove')">
                  <!-- 图标 -->
                  <i class="el-icon-setting"></i>
                  <!-- 文本 -->
                  <span>账号注册审核</span>
              </el-menu-item>
              <!-- 二级菜单 -->
              <el-menu-item index="/user/information" @click="saveNavState('/user/information')">
                  <!-- 图标 -->
                  <i class="el-icon-setting"></i>
                  <!-- 文本 -->
                  <span>账号信息查看</span>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="4" v-if="$store.state.jobName === '超级管理员' || $store.state.jobName === '管理员'">
              <!-- 一级菜单模板区 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>操作审计</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item index="/operatingRecord" @click="saveNavState('/operatingRecord')">
                  <!-- 图标 -->
                  <i class="el-icon-setting"></i>
                  <!-- 文本 -->
                  <span>操作记录</span>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="5">
              <!-- 一级菜单模板区 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>客户管理</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item index="/clientInformation" @click="saveNavState('/clientInformation')">
                  <!-- 图标 -->
                  <i class="el-icon-setting"></i>
                  <!-- 文本 -->
                  <span>客户信息设置</span>
              </el-menu-item>
              <el-menu-item index="/addClient" @click="saveNavState('/addClient')">
                  <!-- 图标 -->
                  <i class="el-icon-setting"></i>
                  <!-- 文本 -->
                  <span>客户信息添加</span>
              </el-menu-item>
            </el-submenu>
        </el-menu>

        </el-aside>
        <!-- 右侧主体 -->
        <el-main>
          <!-- 路由占位符 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {

  },
  data()
  {
    return {
      //是否折叠
      isCollapse:false,
      //动态绑定地址
      activePath:''
    }
  },
  created()
  {
    this.activePath = window.sessionStorage.getItem('activePath');
  },
  methods: {
    Logout(){
      this.$router.push('/')
      window.sessionStorage.removeItem('token')
    },
    // 点击按钮实现左侧菜单的折叠
    toggleCollapse(){
        this.isCollapse =!this.isCollapse;
    },
    //保存链接的激活状态
    saveNavState(activePath){
      window.sessionStorage.setItem('activePath',activePath);
      this.activePath = activePath;
    }
  }
}
</script>

<style lang="less" scoped>

html{
  height: 100%;
}

*{
  margin: 0;
  padding: 0;

}

.home-container {
  position:absolute;
  width:100%;
  height: 100%;
}

.el-header{
  background-color:#373d41;
  color: #fff;
  display:flex;
  justify-content: space-between;
  padding-left:0;
  align-items:center;
  font-size:20px;
  > div{
    display:flex;
    align-items:center;
    span{
      margin-left:15px;
    }
  }
}

.el-aside{
  background-color: #333744;
  .el-menu{
    border-right:none;
  }
}

.el-main{
  background-color: #eaedf1;
}

.iconfont{
  margin-right:10px;
}

.toggle-button{
  background-color: #4a5064;
  font-size:10px;
  line-height:24px;
  color:#fff;
  text-align:center;
  letter-spacing:0.2em;
  cursor:pointer;
}

</style>
