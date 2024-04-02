<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>管理系统</el-breadcrumb-item>
            <el-breadcrumb-item>活动添加</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图 -->
        <el-card>
            <!-- 提示区域 -->
            <el-alert title="添加新的活动" type="info" center show-icon :closable="false"></el-alert>
            <!-- 步骤条 -->
            <el-steps :space="200" :active="activeIndex - 0" finish-status="success" align-center class="steps-css">
                <el-step title="活动内容"></el-step>
                <el-step title="活动设置"></el-step>
                <el-step title="上传确认"></el-step>
            </el-steps>
            <!-- 标签页 -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" :label-position="labelPosition">
                <el-tabs v-model="activeIndex" :tab-position="'left'" :before-leave="beforeTabLeave">
                    <el-tab-pane label="活动内容" name="0">
                        <el-form-item label="活动标题" prop="eventName">
                            <el-input v-model="addForm.eventName"></el-input>
                        </el-form-item>
                        <el-form-item label="活动内容">
                            <quill-editor v-model="addForm.eventContent"></quill-editor>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="活动设置" name="1">
                        <el-form-item label="举行类别" prop="eventLocation">
                            <el-select v-model="addForm.eventLocation" placeholder="请选择活动举行类别">
                                <div v-for="(item,i) in localtionList" :key="i">
                                    <el-option :label="item.name" :value="item.name"></el-option>
                                </div>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="开始时间">
                            <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="otherForm.createTime1" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                            <el-time-picker placeholder="选择时间" v-model="otherForm.createTime2" style="width: 100%;" value-format="HH:mm:ss"></el-time-picker>
                            </el-col>
                        </el-form-item>

                        <el-form-item label="截止时间">
                            <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="otherForm.endTime1" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                            <el-time-picker placeholder="选择时间" v-model="otherForm.endTime2" style="width: 100%;" value-format="HH:mm:ss"></el-time-picker>
                            </el-col>
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
            // addForm:{
            //     title:'',
            //     thumbnail:null,
            //     isTop:"1",
            //     content:'',
            //     tags:[],
            //     categoryId:1,
            //     createTime:'',
            //     summary:'',
            //     status:"0"
            // },
            addForm:{
                eventName:'',
                eventContent:'',
                eventLocation:'',
                eventTime:'',
                eventEndTime:'',
                pictureUrl:null,
                type:1,
            },
            otherForm:{
                // createTime1:null,
                // createTime2:null,
                createTime1:'2023-12-05',
                createTime2:'12:00:00',
                endTime1:'2023-12-05',
                endTime2:'13:00:00',
                switchValue:false
            },
            addFormRules:{
                eventName: [
                    { required: true, message: '请输入活动标题', trigger: 'blur' },
                    // { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                eventLocation: [
                    { required: true, message: '请选择活动类别', trigger: 'change' }
                ],
                eventLocation:[
                    { required: true, message: '请选择活动类别', trigger: 'change' }
                ],
            },
            //获取的类别列表
            localtionList:[
                {"name":"线上"},
                {"name":"线下"}
            ],
            //获取的标签列表
            tagList:[
                {
                "id": 1,
                "name": "Mybatis"
                },
            ],

        }
    },
    created(){
        // this.getNessaryMessage()
    },
    methods:{
        beforeTabLeave(activeName,oldActiveName){
            if (activeName == '2' &&  this.addForm.eventLocation != '')
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
            if (oldActiveName == '0' && this.addForm.eventName.length == 0)
            {
                this.$message({
                    type: 'warning',
                    message: '请先填写活动标题'
                });
                return false
            }
            if (oldActiveName == '0' && this.addForm.eventContent.length == 0)
            {
                this.$message({
                    type: 'warning',
                    message: '请先填写活动内容'
                });
                return false
            }
            if (oldActiveName == '1' && this.addForm.eventLocation.length == 0)
            {
                this.$message({
                    type: 'warning',
                    message: '请先选择活动类别'
                });
                return false
            }
            if (activeName>=oldActiveName && oldActiveName == '1' && (this.otherForm.createTime1 == null ||this.otherForm.createTime2 == null))
            {
                this.$message({
                    type: 'warning',
                    message: '请先选择活动编辑时间'
                });
                return false
            }
            if (activeName == '2')
            {
                this.addForm.eventTime = this.otherForm.createTime1 +'  ' + this.otherForm.createTime2
                this.addForm.eventEndTime = this.otherForm.endTime1 +'  ' + this.otherForm.endTime2
            }
        },
        showBlogInfo(){
            console.log(this.addForm)
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
        // async getNessaryMessage(){

        //         const {data:res} = await axios.get('/content/category/listAllCategory',{
        //             headers:{
        //                 token:this.token
        //             }
        //         })
        //         console.log("BlogAdd.vue获取的分类列表为：",res.data)
        //         this.categoryList = res.data
               
        //         const {data:res1} = await axios.get('/content/tag/listAllTag',{
        //             headers:{
        //                 token:this.token
        //             }
        //         })
        //         console.log("BlogAdd.vue获取的标签列表为：",res1.data)
        //         this.tagList = res1.data

        // }
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
//使步骤条居中
.steps-css{
    display:flex;
    justify-content: center;
}
</style>
