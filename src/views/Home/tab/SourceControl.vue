<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>成果管理</el-breadcrumb-item>
            <el-breadcrumb-item>下载链接管理</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <!-- <el-row :gutter="20">
                <el-col :span="12">
                    <el-input placeholder="请输入需要查找的标签名" v-model="queryinfo.name" class="input-with-select" clearable @clear="getSourceList()">
                        <el-button slot="append" icon="el-icon-search" @click="getSourceList()"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="showAddTag()"><i class="el-icon-plus"></i>添加标签</el-button>
                </el-col>
            </el-row> -->

            <el-table :data="sourceList" style="width: 100%">
                <el-table-column label="序号" width="180">
                    <template slot-scope="scope">
                        <i class="el-icon-s-help"></i>
                        <span style="margin-left: 10px">{{ scope.row.id }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="成果名" width="300">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.productName }}</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="下载链接">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="primary"
                        @click="uploadSource(scope.$index, scope.row)">上传</el-button>
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

        <el-dialog
        title="提示"
        :visible.sync="sourceDialog"
        width="30%">
            <el-upload
                class="upload-demo"
                ref="uploadFile"
                :action="`http://localhost:8989/Source/upload/${this.uploadSourceId}`"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
               
                accept=".zip, .rar"
                :file-list="fileList"
                :limit="1"
                :headers="headers"
                name="source"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传zip/rar文件，且不超过10M，一次只能上传一个</div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeDialog()">取 消</el-button>
                <el-button type="primary" @click="uploadTure()">确 定</el-button>
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
            headers:{
                token:sessionStorage.getItem('token')
            },
            token:sessionStorage.getItem('token'),
            addDialogVisible: false,
            sourceDialog:false,
            fileList:[],
            uploadSourceId:'',
            sourceList:[
            {
                "id": 1,
                "productName": "数字安全治理白皮书",
                "productDescription": " 数据安全已严重制约数字经济发展，数据安全需要全生命周期管理，同时应该有安全治理的体系与框架，本书基于CAPE能力框架，从安全规划、组织建设、制度管理、能力建设到安全运营，提供了全生命周期的安全治理体系。在数据安全核心技术做了详细介绍，运营商、金融、医疗等前沿应用领域做了详细分析与安全治理分享。 "
            },
            {
                "id": 2,
                "productName": "新一代数据要素市场建设白皮书",
                "productDescription": " 以数据要素市场发展历史为起点，从政策、发展到运营的介绍。基于浙江大数据交易中心、杭州国际数字交易中心实践经验总结，提出新一代数据要素市场建设构想，基于可信计算合约、隐私计算、区块链等核心技术，为达成数据要素资产所有权与使用权的分离，既保护数据隐私，又发挥数据计算价值，为数字经济产业链上各参与方都能获得相应的利益分配作出了可靠安全的建议路径。 "
            },
            ],
            total:4
        }
    },
    created(){
        this.queryinfo.token = sessionStorage.getItem('token')
        this.getSourceList()
    },
    methods:{
        async getSourceList(){
            // console.log("获取的请求头为：",this.headers)
            const {data:res} = await axios.get('/Achievement/list',{
                headers: {
                    token: this.token
                }
            })
            if(res.code === 200){
                this.sourceList = res.data
            }
            console.log("获取的成果数据为:",res);
        },
        async uploadSource(index, row) {
            this.uploadSourceId = row.id
            this.sourceDialog = true
            console.log(row.id)
            console.log(this.$refs)
        },
             //提交页数的变化
        // handleSizeChange(newSize) {
        //     this.queryinfo.pageSize = newSize
        //     this.getSourceList()
        // },
        // //提交展示第几页的变化
        // handleCurrentChange(newPage){
        //     this.queryinfo.pageNum = newPage
        //     this.getSourceList()
        // },
        closeDialog(){
            this.sourceDialog = false
        },
        uploadTure(){
            // this.$refs.uploadFile.submit();
            this.sourceDialog = false
            this.fileList = []
            this.$message({
                message: '上传成功',
                type: 'success'
            })
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        }
    }

</script>

<style>

</style>