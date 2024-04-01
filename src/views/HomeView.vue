<template>
  <div> 
    <el-container class="home-container">
      <!--头部区域-->
      <el-header>
        <span></span>
        <span>个人博客系统</span>
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
                <span>标签系统</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item index="/tab/control" @click="saveNavState('/tab/control')">
                  <!-- 图标 -->
                  <i class="el-icon-setting"></i>
                  <!-- 文本 -->
                  <span>标签管理</span>
              </el-menu-item>
            </el-submenu>

            
            <el-submenu index="2">
              <!-- 一级菜单模板区 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>博客系统</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item index="/blog/bloglist" @click="saveNavState('/blog/bloglist')">
                  <!-- 图标 -->
                  <i class="el-icon-tickets"></i>
                  <!-- 文本 -->
                  <span>文章列表</span>
              </el-menu-item>
              <el-menu-item index="/blog/blogadd" @click="saveNavState('/blog/blogadd')">
                  <!-- 图标 -->
                  <i class="el-icon-plus"></i>
                  <!-- 文本 -->
                  <span>博客添加</span>
              </el-menu-item>
              <el-menu-item index="/blog/blogcontrol" @click="saveNavState('/blog/blogcontrol')">
                  <!-- 图标 -->
                  <i class="el-icon-setting"></i>
                  <!-- 文本 -->
                  <span>博客管理</span>
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
