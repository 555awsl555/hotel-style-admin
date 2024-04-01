<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>标签系统</el-breadcrumb-item>
            <el-breadcrumb-item>标签管理</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-input placeholder="请输入需要查找的标签名" v-model="queryinfo.name" class="input-with-select" clearable @clear="getTagsList()">
                        <el-button slot="append" icon="el-icon-search" @click="getTagsList()"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="showAddTag()"><i class="el-icon-plus"></i>添加标签</el-button>
                </el-col>
            </el-row>

            <el-table :data="tagsList" style="width: 100%">
                <el-table-column label="序号" width="180">
                    <template slot-scope="scope">
                        <i class="el-icon-s-help"></i>
                        <span style="margin-left: 10px">{{ scope.row.id }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="标签名" width="180">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.name }}</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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

        <!-- 添加标签弹窗 -->
        <el-dialog
        title="添加新的标签"
        :visible.sync="addDialogVisible"
        width="50%">
            <!-- 表单主题 -->
            <el-form :model="addTagForm" ref="addFormRef" label-width="70px">
                <el-form-item label="标签名">
                    <el-input v-model="addTagForm.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editTagInfo()">添 加</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            queryinfo: {
                name: '',
                pageNum:1,
                pageSize:5,
            },
            token:sessionStorage.getItem('token'),
            addDialogVisible: false,
            addTagForm:{
                name:''
            },
            tagsList:[
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
            total:4
        }
    },
    created(){
        this.queryinfo.token = sessionStorage.getItem('token')
        this.getTagsList()
    },
    methods:{
        async getTagsList(){
            // console.log("获取的请求头为：",this.headers)
            const {data:res} = await axios.get('/content/tag/list',{
                params: this.queryinfo,
                headers: {
                    token: this.token
                }
            })
            if(res.code === 200){
                this.tagsList = res.data.rows
                this.total = res.data.total
            }
            console.log("获取的标签数据为:",res);
        },
        async handleDelete(index, row) {
            console.log("选择删除的id："+row.id)
            const confirmResult = await this.$confirm('此操作将删除该标签, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err);
            if(confirmResult !== 'confirm'){
                return this.$message.info('已取消删除')
            }
/**测试中**/
            const {data:res} = await this.$http.delete(`/content/tag/${row.id}`,{
                headers:{
                    token: this.token
                }
            })
            console.log("删除的结果为：",res)
            if(res.code!==200)
            {
                return this.$message({
                    message: '删除失败',
                    type: 'error'
                })
            }
            this.$message.success('删除成功')
            this.getTagsList()

        },
             //提交页数的变化
        handleSizeChange(newSize) {
            this.queryinfo.pageSize = newSize
            this.getTagsList()
        },
        //提交展示第几页的变化
        handleCurrentChange(newPage){
            this.queryinfo.pageNum = newPage
            this.getTagsList()
        },
        showAddTag()
        {
            this.addDialogVisible = true
        },
        async editTagInfo(){
            if (this.addTagForm.name.length == 0){
                this.$message.error('标签名不能为空')
                return
            }
            const {data:res} = await axios.post('/content/tag',this.addTagForm,{
                headers:{
                    token: this.token
                }
            })
            console.log("添加的标签为："+this.addTagForm.name)
            console.log("添加变迁，返回的结果为",res)
            this.$message.success(`添加标签"${this.addTagForm.name}"成功`)
            this.addTagForm.name = ''
            this.addDialogVisible = false
            this.getTagsList()
        }
        
        }
    }

</script>

<style>

</style>