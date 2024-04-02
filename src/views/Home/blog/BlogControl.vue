<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动系统</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索区域 -->
        <el-card>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-input placeholder="请输入搜索的活动标题" v-model="queryinfo.title" class="input-with-select" clearable @clear="getUserList()">
                        <el-button slot="append" icon="el-icon-search" @click="getUserList()"></el-button>
                    </el-input>
                </el-col>
            </el-row>

            <!-- 文章信息列表区域 -->
            <el-table :data="userlist" border stripe>
                <el-table-column prop="id" label="编号"></el-table-column>
                <el-table-column prop="title" label="标题"></el-table-column>
                <el-table-column prop="summary" label="摘要"></el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column prop="viewCount" label="浏览量"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-tooltip effect="dark" content="博客详情" placement="top" :enterable="false">
                            <el-button type="info" icon="el-icon-search" circle @click="showBlogDetail(scope.row.id)"></el-button>
                        </el-tooltip>
                        <el-tooltip effect="dark" content="博客修改" placement="top" :enterable="false">
                            <el-button type="primary" icon="el-icon-edit" circle  @click="showEditDialog(scope.row.id)"></el-button>
                        </el-tooltip>
                        <el-tooltip effect="dark" content="博客删除" placement="top" :enterable="false">
                            <el-button type="danger" icon="el-icon-delete" circle @click="removeBlogById(scope.row.id)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>

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
        </el-card>

        <!-- 修改信息对话框 -->
        <el-dialog
        title="修改博客信息"
        :visible.sync="editDialogVisible"
        width="50%">
            <!-- 表单主题 -->
            <el-form :model="editForm" ref="editFormRef" label-width="70px">
                <el-form-item label="编号">
                    <el-input v-model="editForm.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="标题">
                    <el-input v-model="editForm.title"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <quill-editor v-model="editForm.content"></quill-editor>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editBlogInfo()">修 改</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            token:sessionStorage.getItem('token'),
            //获取列表的参数对象
            queryinfo:{
                title:'',
                pageNum:sessionStorage.getItem('BlogListpageNum')?parseInt(sessionStorage.getItem('BlogListpageNum')):1,
                //当前每页显示多少数据
                pageSize:sessionStorage.getItem('BlogListpageSize')?parseInt(sessionStorage.getItem('BlogListpageSize')):5
            },
            userlist:[
            {
                "categoryId":"1",
				"content":"文章内容",
				"createTime":"2023-08-10 07:20:11",
				"id":"1",
				"isComment":"0",
				"isTop":"1",
				"status":"0",
				"summary":"文章摘要",
				//"thumbnail":"文章缩略图.png|jpg",暂时去掉
				"title":"文章标题",
				"viewCount":"文章被浏览的次数"
            },
            {
                "categoryId":"1",
				"content":"文章内容",
				"createTime":"2023-08-10 07:20:11",
				"id":"2",
				"isComment":"0",
				"isTop":"1",
				"status":"0",
				"summary":"文章摘要",
				//"thumbnail":"文章缩略图.png|jpg",暂时去掉
				"title":"文章标题",
				"viewCount":"文章被浏览的次数"
            },
            {
                "categoryId":"1",
				"content":"文章内容",
				"createTime":"2023-08-10 07:20:11",
				"id":"3",
				"isComment":"0",
				"isTop":"1",
				"status":"0",
				"summary":"文章摘要",
				//"thumbnail":"文章缩略图.png|jpg",暂时去掉
				"title":"文章标题",
				"viewCount":"文章被浏览的次数"
            },
            {
                "categoryId":"1",
				"content":"文章内容",
				"createTime":"2023-08-10 07:20:11",
				"id":"4",
				"isComment":"0",
				"isTop":"1",
				"status":"0",
				"summary":"文章摘要",
				//"thumbnail":"文章缩略图.png|jpg",暂时去掉
				"title":"文章标题",
				"viewCount":"文章被浏览的次数"
            }
            ],
            total:4,
            editDialogVisible: false,
            //查询用户时候的空对象
            editForm: {
                // "categoryId": "1",
                // "categoryName": "web",
                // "content": "会议认为，近年来，在党中央坚强领导下，我们有效统筹国内国际两个大局、统筹疫情防控和经济社会发展、统筹发展和安全，深化了新时代做好经济工作的规律性认识。必须把坚持高质量发展作为新时代的硬道理，完整、准确、全面贯彻新发展理念，推动经济实现质的有效提升和量的合理增长。必须坚持深化供给侧结构性改革和着力扩大有效需求协同发力，发挥超大规模市场和强大生产能力的优势，使国内大循环建立在内需主动力的基础上，提升国际循环质量和水平。必须坚持依靠改革开放增强发展内生动力，统筹推进深层次改革和高水平开放，不断解放和发展社会生产力、激发和增强社会活力。必须坚持高质量发展和高水平安全良性互动，以高质量发展促进高水平安全，以高水平安全保障高质量发展，发展和安全要动态平衡、相得益彰。必须把推进中国式现代化作为最大的政治，在党的统一领导下，团结最广大人民，聚焦经济建设这一中心工作和高质量发展这一首要任务，把中国式现代化宏伟蓝图一步步变成美好现实。",
                // "createTime": "2022-01-23 23:20:11",
                // "id": "1",
                // "isComment": "0",
                // "title": "第一篇文章",
                // "viewCount": 114514
                "categoryId":"1",
                "content":"会议认为，近年来，在党中央坚强领导下，我们有效统筹国内国际两个大局、统筹疫情防控和经济社会发展、统筹发展和安全，深化了新时代做好经济工作的规律性认识。必须把坚持高质量发展作为新时代的硬道理，完整、准确、全面贯彻新发展理念，推动经济实现质的有效提升和量的合理增长。必须坚持深化供给侧结构性改革和着力扩大有效需求协同发力，发挥超大规模市场和强大生产能力的优势，使国内大循环建立在内需主动力的基础上，提升国际循环质量和水平。必须坚持依靠改革开放增强发展内生动力，统筹推进深层次改革和高水平开放，不断解放和发展社会生产力、激发和增强社会活力。必须坚持高质量发展和高水平安全良性互动，以高质量发展促进高水平安全，以高水平安全保障高质量发展，发展和安全要动态平衡、相得益彰。必须把推进中国式现代化作为最大的政治，在党的统一领导下，团结最广大人民，聚焦经济建设这一中心工作和高质量发展这一首要任务，把中国式现代化宏伟蓝图一步步变成美好现实。",
                "createBy":"1",
                "createTime":"2023-08-28 15:15:46",
                "delFlag":0,
                "id":"10",
                "isComment":"0",
                "isTop":"1",
                "status":"0",
                "summary":"文章摘要",
                "tags":[
                    "1",
                    "4",
                    "5"
                ],
                //"thumbnail":"文章缩略图.png|jpg",暂时不做这个功能
                "title":"文章标题",
                "updateBy":"1",
                "updateTime":"2022-08-28 15:15:46",
                "viewCount":"0"
            }
        }
    },
    created() {
        this.getUserList()
    },
    methods: {
        async getUserList(){
            const {data:res} = await axios.get('/content/article/list',{
                params: this.queryinfo,
                headers:{
                    token:this.token
                }
            })
            console.log("BlogControl.vue中获取的文章列表数据为：",res)
            if(res.code !==200)
            {
                return this.$message({
                    message: '获取用户列表失败',
                    type: 'error'
                })
            }
            if (res.code == 200){
            this.userlist = res.data.rows
            this.total = res.data.total
            }
        },
        //提交页数的变化
        handleSizeChange(newSize) {
            // console.log(newSize)
            this.queryinfo.pageSize = newSize
            window.sessionStorage.setItem('BlogListpageSize',newSize)
            this.getUserList()
        },
        //提交展示第几页的变化
        handleCurrentChange(newPage){
            // console.log(newPage)
            this.queryinfo.pageNum = newPage
            window.sessionStorage.setItem('BlogListpageNum',newPage)
            this.getUserList()
        },
        showBlogDetail(id){
            this.$router.push(`/blog/detail/${id}`)
        },
        //展示编辑博客信息的对话框
        async showEditDialog(id){
            const {data:res} = await axios.get(`content/article/${id}`,
            {
                headers:{
                    token:this.token
                }
            })
            console.log("BlogControl.vue中被修改文章的数据为：",res)
            if(res.code!==200)
            {
                return this.$message({
                    message: '获取用户列表失败',
                    type: 'error'
                })
            }
            this.editForm = res.data
            this.editDialogVisible = true
        },
        //提交文章修改
        async editBlogInfo(){
            const jsonData = JSON.stringify(this.editForm);
            const {data:res} = await axios.put(`/content/article`,jsonData,{
               headers:{
                   token:this.token,
                    'Content-Type':'application/json'
               }
            })
            console.log("BlogControl.vue中提交文章修改获得的数据为：",res)
            
            if(res.code!==200)
            {
                return this.$message({
                    message: '修改失败',
                    type: 'error'
                })
            }

            //关闭对话框
            this.editDialogVisible = false
            //刷新数据列表
            // this.getUserList()
            //提示修改成功
            this.$message.success('修改成功')
        },
        //删除按钮的功能
        async removeBlogById(id) {
            const confirmResult = await this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err);

            //如果用户确认删除，则返回值为字符串confirm
            //如果用户取消删除，则返回值为字符串cancel

            if(confirmResult !== 'confirm'){
                return this.$message.info('已取消删除')
            }

            console.log("BlogControl.vue中删除文章的id为：",id)
            const {data:res} = await axios.delete(`/content/article/${id}`,{
                headers:{
                    token:this.token
                }    
            })
            console.log("BlogControl.vue中删除文章的返回数据为：",res)
            if(res.code!==200)
            {
                return this.$message({
                    message: '删除失败',
                    type: 'error'
                })
            }
            this.$message.success('删除成功')
            this.getUserList()
      }
    },
    computed:{
        reversedArticles() {
      // 使用 reverse() 方法反转数组,使得添加文章后，所实现的文章列表展示更加符合人性化
      return this.userlist.slice().reverse();
    }
    }

}
</script>

<style lang="less" scoped>

</style>
