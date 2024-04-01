<template>
    <div>
        <!-- 面包屑导航区 -->
         <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>博客系统</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path:'/blog/bloglist'}">文章列表</el-breadcrumb-item>
            <el-breadcrumb-item>文章详情</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
          <div class="article-detail-page" v-if="article.id">

              <header class="header">
              <h1>{{ article.title }}</h1>
              <p>{{ article.createTime }} | {{ article.viewCount }} 浏览量 | 分类：{{ article.categoryName }} </p>
              <p>
                  <img src="..\src\assets\logo.png" alt=""> 
                  <span>{{ article.creatorName }}</span> 
              </p>
              </header>
              <main class="body">  
                  <div v-html="article.content"></div>
              </main>
          </div>
          </el-card>
    </div>

</template>

<script>
import axios from 'axios'
export default{
    name: 'ArticleDetailPage',
  data () {
    return {
      article: {
        "categoryId": "1",
        "categoryName": "web",
        "content": "文章详情的具体文章内容",
        "createTime": "2022-01-23 23:20:11",
        "id": "1",
        "isComment": "0",
        "title": "第一篇文章",
        "viewCount": 114514
      },
    }
  },
  async created () {
    const id = this.$route.params.id
    const { data } = await axios.get(`http://localhost:7777/article/${id}`)
    console.log("Deatil.vue中得到的的文章详情输入：",data);
    this.article = data.data
  }
}

</script>

<style lang="less" scoped>
.article-detail-page {
  .nav {
    height: 44px;
    border-bottom: 1px solid #e4e4e4;
    line-height: 44px;
    text-align: center;
    .back {
      font-size: 18px;
      color: #666;
      position: absolute;
      left: 10px;
      top: 0;
      transform: scale(1, 1.5);
    }
  }
  .header {
     padding: 0 15px;
     p {
       color: #999;
       font-size: 12px;
       display: flex;
       align-items: center;
     }
     img {
       width: 40px;
       height: 40px;
       border-radius: 50%;
       overflow: hidden;
     }
  }
  .body {
     padding: 0 15px;
  }

  .comment {
  margin-bottom: 10px;
  border: 1px solid #ccc;
  padding: 5px;
}
}
</style>