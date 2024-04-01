<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>博客系统</el-breadcrumb-item>
            <el-breadcrumb-item>文章列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索卡片 -->
        <el-card>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-input placeholder="请输入搜索标题" v-model="queryinfo.title" class="input-with-select" clearable @clear="getArticleList()">
                        <el-button slot="append" icon="el-icon-search" @click="getArticleList()"></el-button>
                    </el-input>
                </el-col>
            </el-row>
        </el-card>

         <div class="article-page">
                    <el-card
                    v-for="item in reversedArticles"
                    :key="item.id"
                    @click.native="$router.push(`/blog/detail/${item.id}`)"
                    class="article-item">
                    
                    <div class="head">
                        <img src="..\src\assets\logo.png" alt="" />
                        <div class="con">
                        <p class="title">{{ item.title }}</p>
                        <p class="other">分类{{item.categoryId}} | {{ item.createTime }}</p>
                        </div>
                    </div>
                    <div class="body">
                        <div v-html="item.content"></div>
                    </div>
                    <div class="foot">浏览 {{ item.viewCount }}</div>
                    </el-card>
          </div>

          <!-- 分页 -->
          <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryinfo.pageNum"
                :page-sizes="[1, 2, 5, 10]"
                :page-size="queryinfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
    </div>
</template>

<script>

import axios from 'axios'

export default{
    data() {
        return {
            inputSearch: '',
            queryinfo:{
                title:'',
                pageNum:sessionStorage.getItem('BlogListpageNum')?parseInt(sessionStorage.getItem('BlogListpageNum')):1,
                //当前每页显示多少数据
                pageSize:sessionStorage.getItem('BlogListpageSize')?parseInt(sessionStorage.getItem('BlogListpageSize')):5
            },
            token:sessionStorage.getItem('token'),
            total:10,
            articles: [
                      {
                  "categoryId":"1",
                  "content":`
                  <h1>Python</h1>由荷兰数学和计算机科学研究学会的吉多·范罗苏姆于1990年代初设计，作为一门叫做ABC语言的替代品。 [1]  Python提供了高效的高级数据结构，还能简单有效地面向对象编程。Python语法和动态类型，以及解释型语言的本质，使它成为多数平台上写脚本和快速开发应用的编程语言， [2]  随着版本的不断更新和语言新功能的添加，逐渐被用于独立的、大型项目的开发。 [3] 
							Python解释器易于扩展，可以使用C语言或C++（或者其他可以通过C调用的语言）扩展新的功能和数据类型。 [4]  Python也可用于可定制化软件中的扩展程序语言。Python丰富的标准库，提供了适用于各个主要系统平台的源码或机器码。
              `,
                  "createTime":"2023-08-10 07:20:11",
                  "id":"1",
                  "isComment":"0",
                  "isTop":"1",
                  "status":"0",
                  "summary":"文章摘要",
                  //"thumbnail":"文章缩略图.png|jpg",暂时去掉
                  "title":"文章标题",
                  "viewCount":"233"
                },
                {
                  "categoryId":"1",
                  "content":`
                  <h1>Python</h1>由荷兰数学和计算机科学研究学会的吉多·范罗苏姆于1990年代初设计，作为一门叫做ABC语言的替代品。 [1]  Python提供了高效的高级数据结构，还能简单有效地面向对象编程。Python语法和动态类型，以及解释型语言的本质，使它成为多数平台上写脚本和快速开发应用的编程语言， [2]  随着版本的不断更新和语言新功能的添加，逐渐被用于独立的、大型项目的开发。 [3] 
							Python解释器易于扩展，可以使用C语言或C++（或者其他可以通过C调用的语言）扩展新的功能和数据类型。 [4]  Python也可用于可定制化软件中的扩展程序语言。Python丰富的标准库，提供了适用于各个主要系统平台的源码或机器码。
                  `,
                  "createTime":"2023-08-10 07:20:11",
                  "id":"2",
                  "isComment":"0",
                  "isTop":"1",
                  "status":"0",
                  "summary":"文章摘要",
                  //"thumbnail":"文章缩略图.png|jpg",暂时去掉
                  "title":"文章标题",
                  "viewCount":"233"
                }
            ],
            //分类列表
            categoryList:[
                {
                "description": "wsd",
                "id": 1,
                "name": "java2"
                },
                {
                "description": "wsd",
                "id": 2,
                "name": "前端"
                },
                {
                "description": "wsd",
                "id": 3,
                "name": "后端"
                },
                {
                "description": "wsd",
                "id": 4,
                "name": "运维1"
                },
                {
                "description": "wsd",
                "id": 5,
                "name": "数据库2"
                },
                {
                "description": "wsd",
                "id": 6,
                "name": "其他1"
                }
            ],
            //分类键值对
            categoryMap:{1:'java2'},
        }
    },
    created () {
      this.getArticleList()
    // const {data:res} = await axios.get(`/content/article/list`)
  //   const {data:res2} = await axios.get('/content/category/listAllCategory')
  //   this.categoryList = res2.data
  //   if(res2.code == 200) //构造分类列表键值对
  //  {
  //     for(let i = 0; i < this.categoryList.length; i++)
      // {
      //   let key=this.categoryList[i].id
      //   let value=this.categoryList[i].name
      //   this.categoryMap[key]=value
      // }
  //  }
  },
  methods:{
    async getArticleList(){
      const {data:res} = await axios.get(`/content/article/list`,
      {
        params:this.queryinfo,
        headers:{
          token:this.token
        }
      })
      this.articles = res.data.rows
      this.total = res.data.total
      console.log("BlogList.vue中获取文章列表的数据",res)
    },
    //提交页数的变化
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryinfo.pageSize = newSize
      window.sessionStorage.setItem('BlogListpageSize',newSize)
      this.getArticleList()
    },
        //提交展示第几页的变化
    handleCurrentChange(newPage){
      // console.log(newPage)
      this.queryinfo.pageNum = newPage
      window.sessionStorage.setItem('BlogListpageNum',newPage)
      this.getArticleList()
    },
  },
  computed:{
    reversedArticles() {
      // 使用 reverse() 方法反转数组,使得添加文章后，所实现的文章列表展示更加符合人性化
      return this.articles.slice().reverse();
    }
  }
}

</script>

<style lang="less" scoped>

.article-page {
  background: #f5f5f5;
}
.article-item {
  margin-bottom: 10px;
  background: #fff;
  padding: 10px 15px;
  .head {
    display: flex;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
    .con {
      flex: 1;
      overflow: hidden;
      padding-left: 15px;
      p {
        margin: 0;
        line-height: 1.5;
        &.title {
          text-overflow: ellipsis;
          overflow: hidden;
          width: 100%;
          white-space: nowrap;
        }
        &.other {
          font-size: 10px;
          color: #999;
        }
      }
    }
  }
  .body {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    margin-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .foot {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }
}

</style>