<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>博客系统</el-breadcrumb-item>
            <el-breadcrumb-item>博客添加</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图 -->
        <el-card>
            <!-- 提示区域 -->
            <el-alert title="添加新的博客" type="info" center show-icon :closable="false"></el-alert>
            <!-- 步骤条 -->
            <el-steps :space="200" :active="activeIndex - 0" finish-status="success" align-center>
                <el-step title="博客内容"></el-step>
                <el-step title="博客设置"></el-step>
                <el-step title="上传确认"></el-step>
            </el-steps>
            <!-- 标签页 -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" :label-position="labelPosition">
                <el-tabs v-model="activeIndex" :tab-position="'left'" :before-leave="beforeTabLeave" @tab-click="tabClicked">
                    <el-tab-pane label="博客内容" name="0">
                        <el-form-item label="文章标题" prop="title">
                            <el-input v-model="addForm.title"></el-input>
                        </el-form-item>
                        <el-form-item label="文章内容">
                            <quill-editor v-model="addForm.content"></quill-editor>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="博客设置" name="1">
                        <el-form-item label="文章分类" prop="categoryId">
                            <el-select v-model="addForm.categoryId" placeholder="请选择文章类别">
                                <div v-for="(item,i) in categoryList" :key="i">
                                    <el-option :label="item.name" :value="item.id"></el-option>
                                </div>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="文章标签">
                            <el-checkbox-group v-model="addForm.tags" class="tag-group">
                                <div v-for="(item,i) in tagList" :key="i" class="tag-item">
                                    <el-checkbox :label="item.id">{{item.name}}</el-checkbox>
                                </div>
                            </el-checkbox-group>
                        </el-form-item>

                        <el-form-item label="编辑时间">
                            <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="otherForm.createTime1" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                            <el-time-picker placeholder="选择时间" v-model="otherForm.createTime2" style="width: 100%;" value-format="HH:mm:ss"></el-time-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="文章摘要" prop="summary">
                            <el-input type="textarea" v-model="addForm.summary"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="上传确认" name="2">
                        <el-button type="info" round @click="showBlogInfo()">文章缩略图</el-button>
                        <el-button type="primary" round :disabled="!otherForm.switchValue" @click="add()">确认上传<i class="el-icon-upload el-icon--right"></i></el-button>
                        <el-form-item label="确认信息无误" style="margin-top: 30px;">
                            <el-switch v-model="otherForm.switchValue"></el-switch>
                        </el-form-item>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
        </el-card>

        <el-dialog title="文章信息确认" :visible.sync="infoDialogVisible" width="50%">
            <!-- 表单主题 -->
            <el-descriptions class="margin-top" title="带边框列表" :column="3" border>
                <el-descriptions-item>
                    <template slot="label">
                        标题
                    </template>
                    {{addForm.title}}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        文章分类
                    </template>
                    {{categoryList[addForm.categoryId-1].name}}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        编辑时间
                    </template>
                    {{addForm.createTime}}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        文章内容
                    </template>
                    <div><p>文章摘要：</p>{{addForm.summary}}</div>
                    <br><br>
                    <div>文章正文：</div>
                    <div v-html="addForm.content"></div>
                </el-descriptions-item>
            </el-descriptions>
            <span slot="footer" class="dialog-footer">
                <el-button @click="infoDialogVisible = false">取 消</el-button>
                <el-button  type="primary" @click="infoDialogVisible = false;otherForm.switchValue = true;">我 已 确 认</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
export default{
    data() {
        return {
            token:sessionStorage.getItem('token'),
            activeIndex:'0',
            //新增博客的数据对象
            labelPosition:'top',
            //文章缩略图对话框
            infoDialogVisible:false,
            //新增表单需要填写的数据
            addForm:{
                title:'',
                thumbnail:null,
                isTop:"1",
                content:'',
                tags:[],
                categoryId:1,
                createTime:'',
                summary:'',
                status:"0"
            },
            otherForm:{
                // createTime1:null,
                // createTime2:null,
                createTime1:'2023-12-05',
                createTime2:'12:00:00',
                switchValue:false
            },
            addFormRules:{
                title: [
                    { required: true, message: '请输入文章标题', trigger: 'blur' },
                    // { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                categoryId: [
                    { required: true, message: '请选择文章类别', trigger: 'change' }
                ],
                categoryId:[
                    { required: true, message: '请选择文章类别', trigger: 'change' }
                ],
                summary: [
                    { required: true, message: '请输入文章摘要', trigger: 'blur' }
                ]
            },
            //获取的类别列表
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
            //获取的标签列表
            tagList:[
                {
                "id": 1,
                "name": "Mybatis"
                },
                {
                "id": 2,
                "name": "Java"
                },
                {
                "id": 3,
                "name": "vue"
                },
                {
                "id": 4,
                "name": "html"
                }
            ],

        }
    },
    created(){
        this.getNessaryMessage()
    },
    methods:{
        beforeTabLeave(activeName,oldActiveName){
            // console.log(this.otherForm.createTime1,this.otherForm.createTime2)
            // console.log(this.addForm.summary)
            if (activeName == '2' && this.addForm.summary.length != 0 && this.addForm.categoryId != '')
            {
                this.labelPosition = 'right'
            }else
            {
                this.labelPosition = 'top'
            }

            if (oldActiveName == '0' && activeName == '2')
            {
                this.$message({
                    type: 'warning',
                    message: '不能跳跃步骤，请闲填写博客设置'
                });
                return false
            }
            if (oldActiveName == '0' && this.addForm.title.length == 0)
            {
                this.$message({
                    type: 'warning',
                    message: '请先填写文章标题'
                });
                return false
            }
            if (oldActiveName == '0' && this.addForm.content.length == 0)
            {
                this.$message({
                    type: 'warning',
                    message: '请先填写文章内容'
                });
                return false
            }
            if (oldActiveName == '1' && this.addForm.categoryId.length == 0)
            {
                this.$message({
                    type: 'warning',
                    message: '请先选择文章类别'
                });
                return false
            }
            if (activeName>=oldActiveName && oldActiveName == '1' && (this.otherForm.createTime1 == null ||this.otherForm.createTime2 == null))
            {
                this.$message({
                    type: 'warning',
                    message: '请先选择文章编辑时间'
                });
                return false
            }
            if (activeName>=oldActiveName && oldActiveName == '1' && this.addForm.summary.length == 0)
            {
                this.$message({
                    type: 'warning',
                    message: '请先填写文章摘要'
                });
                return false
            }
            if (activeName == '2')
            {
                this.addForm.createTime = this.otherForm.createTime1 +'  ' + this.otherForm.createTime2
            }
        },
        showBlogInfo(){
            this.infoDialogVisible = true
        },
        async add(){
            console.log("BlogAdd.vue中上传的表单数据为：",this.addForm)
            const{data:res} = await axios.post('/content/article',this.addForm,{
                headers:{
                    token:this.token
                }
            })
            console.log("add方法提交返回的结果为：",res)
            if(res.code != 200)
            {
                return this.$message.error('添加博客失败')
            }
            this.$message.success('添加博客成功')
            this.$router.push('/blog/blogcontrol')
        },
        //当点击博客设置的时候，从服务器获取分类和标签列表
        async tabClicked(){
            if(this.activeIndex === '1'){
/** 
                const {data:res} = await axios.get('/content/category/listAllCategory')
                this.categoryList = res.data
               
                const {data:res1} = await axios.get('/content/tag/listAllTag')
                this.tagList = res1.data
*/
            }
        },
        async getNessaryMessage(){

                const {data:res} = await axios.get('/content/category/listAllCategory',{
                    headers:{
                        token:this.token
                    }
                })
                console.log("BlogAdd.vue获取的分类列表为：",res.data)
                this.categoryList = res.data
               
                const {data:res1} = await axios.get('/content/tag/listAllTag',{
                    headers:{
                        token:this.token
                    }
                })
                console.log("BlogAdd.vue获取的标签列表为：",res1.data)
                this.tagList = res1.data

        }
        }
    }


</script>

<style lang="less" scoped>
.tag-group {
  display: flex;
  flex-wrap: wrap;
}

.tag-item {
  margin-right: 10px; /* 可以根据需要调整标签之间的间距 */
}
</style>
