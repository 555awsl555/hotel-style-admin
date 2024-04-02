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
                    <el-input placeholder="请输入搜索的活动标题" v-model="queryinfo.title" class="input-with-select" clearable @clear="getEventList()">
                        <el-button slot="append" icon="el-icon-search" @click="getEventList()"></el-button>
                    </el-input>
                </el-col>
            </el-row>

            <!-- 文章信息列表区域 -->
            <el-table :data="eventlist" stripe :fit="true">
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="活动ID">
                            <span>{{ scope.row.eventId }}</span>
                        </el-form-item>
                        <el-form-item label="活动名称">
                            <span>{{ scope.row.eventName }}</span>
                        </el-form-item>
                        <el-form-item label="活动开始时间">
                            <span>{{ formatEventTime(scope.row.eventTime) }}</span>
                        </el-form-item>
                        <el-form-item label="活动结束时间">
                            <span>{{ formatEventTime(scope.row.eventEndTime) }}</span>
                        </el-form-item>
                        <el-form-item label="活动地点">
                            <span>{{ scope.row.eventLocation }}</span>
                        </el-form-item>
                        <el-form-item label="点击量">
                            <span>{{ scope.row.subscribersCount }}</span>
                        </el-form-item>
                        <el-form-item label="活动内容">
                            <span style="text-indent: 2em; display: block;padding-right:5em;">{{ scope.row.eventContent }}</span>
                        </el-form-item>
                        <el-form-item label="活动图片">
                            <img :src="scope.row.pictureUrl" style="width: 90%; height: auto;" alt="加载失败"/>
                        </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column prop="eventId" label="活动编号" :width="100" align="center"></el-table-column>
                <el-table-column prop="eventName" label="活动标题"></el-table-column>
                <el-table-column prop="eventTime" label="开始时间" :formatter="formatDateTime"></el-table-column>
                <el-table-column prop="pictureUrl" label="活动图片">
                    <template slot-scope="scope">
                        <img :src="scope.row.pictureUrl" style="width: 200px; height: auto;" alt="加载失败"/>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <div class="icon-container">
                        <el-tooltip effect="dark" content="图片更改" placement="top" :enterable="false">
                            <el-button type="info" icon="el-icon-top" circle @click="changeEventPicture(scope.row.id)"></el-button>
                        </el-tooltip>
                        <el-tooltip effect="dark" content="活动修改" placement="top" :enterable="false">
                            <el-button type="primary" icon="el-icon-edit" circle  @click="showEventDialog(scope.row.id)"></el-button>
                        </el-tooltip>
                        <el-tooltip effect="dark" content="活动删除" placement="top" :enterable="false">
                            <el-button type="danger" icon="el-icon-delete" circle @click="removeEventById(scope.row.id)"></el-button>
                        </el-tooltip>
                        </div>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <!-- <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryinfo.pageNum"
                :page-sizes="[1, 2, 5, 10]"
                :page-size="queryinfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination> -->
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
                    <el-input v-model="editForm.eventName"></el-input>
                </el-form-item>
                <el-form-item label="举行类别" prop="eventLocation">
                            <el-select v-model="editForm.eventLocation" placeholder="请选择活动举行类别">
                                <div v-for="(item,i) in localtionList" :key="i">
                                    <el-option :label="item.name" :value="item.name"></el-option>
                                </div>
                            </el-select>
                        </el-form-item>
                <el-form-item label="内容">
                    <quill-editor v-model="editForm.eventContent"></quill-editor>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editBlogInfo()">修 改</el-button>
            </span>
        </el-dialog>

        <el-dialog
        title="提示"
        :visible.sync="pictureDialog"
        width="30%">
            <el-upload
                class="upload-demo"
                :action="`http://localhost:8989/Event/upload/${this.uploadPictureId}`"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :headers="headers"
                name="img"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb，上传后将覆盖原图</div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showFileList()">取 消</el-button>
                <el-button type="primary" @click="pictureDialog = false">确 定</el-button>
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
            localtionList:[
                {"name":"线上"},
                {"name":"线下"}
            ],
            eventlist:[
                {
                "eventId": 1,
                "eventName": "格致论道@西湖论剑",
                "eventTime": "2023-05-05T10:30:00.000+00:00",
                "eventLocation": "线上",
                "eventContent": "“格致论道”是中国科学院计算机网络信息中心和中国科学院科学传播局联合主办的科学文化讲坛。致力于非凡思想的跨界交流，提倡以\"格物致知\"的精神探讨科技、教育、生活、未来的发展。",
                "isLive": "0",
                "videoreplayLink": "",
                "subscribersCount": 45,
                "eventPopularity": 111,
                "type": "格致论道",
                "eventEndTime": "2023-05-05T13:45:00.000+00:00",
                "pictureUrl": "http://sa80c6d6d.hd-bkt.clouddn.com/2024/03/18/ebcc7baca19942fba537d421c1375e7d.png"
                },
                {
                "eventId": 2,
                "eventName": "西湖论剑安全特训营·网络攻防蓝队实战技法进阶班",
                "eventTime": "2023-05-04T01:00:00.000+00:00",
                "eventLocation": "线上",
                "eventContent": "本次培训面向网络安全从业人员，特别是负责网络安全防护的蓝队人员，以及有意向从事蓝队工作的人员。 培训所需具备的基础能力：应具备网络安全的基本知识，了解常见的网络攻击手法和防御策略，",
                "isLive": "0",
                "videoreplayLink": null,
                "subscribersCount": 11,
                "eventPopularity": 33,
                "type": "西湖论剑安全特训营",
                "eventEndTime": "2023-05-04T10:00:00.000+00:00",
                "pictureUrl": null
                },
                {
                "eventId": 3,
                "eventName": "新·见未来 实·现梦想",
                "eventTime": "2023-04-19T05:30:00.000+00:00",
                "eventLocation": "线上",
                "eventContent": "今年是习近平总书记提出“八八战略”实施的20周年，是杭州亚运会举办之年，是数字浙江建设20周年,同时也是西湖论剑网络安全大会迈向第二个十年的起始之年。作为西湖论剑系列预热活动之一，此次新品",
                "isLive": "0",
                "videoreplayLink": null,
                "subscribersCount": 55,
                "eventPopularity": 11,
                "type": "产品发布",
                "eventEndTime": "2023-04-19T09:00:00.000+00:00",
                "pictureUrl": null
                }
            ],
            total:4,
            editDialogVisible: false,
            pictureDialog: false,
            uploadPictureId:'',
            headers:{
                token:sessionStorage.getItem('token')
            },
            fileList: [],
            //查询用户时候的空对象
            editForm: {
                "id": null,
                "eventName": "格致论道@西湖论剑",
                "eventTime": "2023-05-05T10:30:00.000+00:00",
                "eventLocation": "线上",
                "eventContent": "“格致论道”是中国科学院计算机网络信息中心和中国科学院科学传播局联合主办的科学文化讲坛。致力于非凡思想的跨界交流，提倡以\"格物致知\"的精神探讨科技、教育、生活、未来的发展。",
                "isLive": "0",
                "videoreplayLink": "",
                "subscribersCount": 45,
                "eventPopularity": 111,
                "pictureUrl": null,
                "type": 1,
                "eventEndTime": "2023-05-05T13:45:00.000+00:00"
            }
        }
    },
    created() {
        this.getEventList()
    },
    methods: {
        async getEventList(){
            const {data:res} = await axios.get('/Event/list',{
                // params: this.queryinfo,
                headers:{
                    token:this.token
                }
            })
            console.log("getEventList中获取的活动列表数据为：",res)
            if(res.code !==200)
            {
                return this.$message({
                    message: '获取活动列表失败',
                    type: 'error'
                })
            }
            if (res.code == 200){
            this.eventlist = res.data
            }
        },
        //提交页数的变化
        handleSizeChange(newSize) {
            // console.log(newSize)
            this.queryinfo.pageSize = newSize
            window.sessionStorage.setItem('BlogListpageSize',newSize)
            this.getEventList()
        },
        //提交展示第几页的变化
        handleCurrentChange(newPage){
            // console.log(newPage)
            this.queryinfo.pageNum = newPage
            window.sessionStorage.setItem('BlogListpageNum',newPage)
            this.getEventList()
        },
        changeEventPicture(id){
            this.uploadPictureId = id;
            console.log(this.uploadPictureId)
            this.pictureDialog = true;
        },
        //展示编辑博客信息的对话框
        async showEventDialog(id){
            const {data:res} = await axios.get(`Event/${id}`,
            {
                headers:{
                    token:this.token
                }
            })
            console.log("showEventDialog中被修改文章的数据为：",res)
            if(res.code!==200)
            {
                return this.$message({
                    message: '获取活动数据失败',
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
            // this.getEventList()
            //提示修改成功
            this.$message.success('修改成功')
        },
        //删除按钮的功能
        async removeEventById(id) {
            const confirmResult = await this.$confirm('此操作将永久删除该活动, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err);

            //如果用户确认删除，则返回值为字符串confirm
            //如果用户取消删除，则返回值为字符串cancel

            if(confirmResult !== 'confirm'){
                return this.$message.info('已取消删除')
            }

            console.log("removeEventById中删除文章的id为：",id)
            const {data:res} = await axios.delete(`/Event/${id}`,{
                headers:{
                    token:this.token
                }    
            })
            console.log("removeEventById中删除文章的返回数据为：",res)
            if(res.code!==200)
            {
                return this.$message({
                    message: '删除失败',
                    type: 'error'
                })
            }
            this.$message.success('删除成功')
            this.getEventList()
      },
      //表单中的
      formatDateTime(row, column, cellValue, index) {
            // 使用JavaScript的Date对象和Intl.DateTimeFormat来格式化日期时间
            const eventDate = new Date(cellValue);
            return new Intl.DateTimeFormat('default', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false // 使用24小时制
            }).format(eventDate);
        },
        //扩展行的时间转换
        formatEventTime(dateTime) {
            const eventDate = new Date(dateTime);
            return eventDate.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false // 使用24小时制
            }).split(' ')[0] + ' ' + eventDate.toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
            });
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        showFileList(){
            console.log(this.img)
        }
    },
    computed:{
        reversedArticles() {
      // 使用 reverse() 方法反转数组,使得添加文章后，所实现的文章列表展示更加符合人性化
    //   return this.eventlist.slice().reverse();
        },
    }

}
</script>

<style lang="less" scoped>
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .icon-container {
    display: flex; /* 设置为Flex容器 */
    justify-content: center; /* 使得子元素在容器中水平居中对齐，你也可以根据需求改为flex-start, flex-end, space-between等 */
    align-items: center; /* 使得子元素在容器内垂直居中 */
    flex-wrap: nowrap; /* 防止子元素换行 */
    }
</style>
