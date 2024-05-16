<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>操作审计</el-breadcrumb-item>
            <el-breadcrumb-item>操作记录</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-row :gutter="20">
                
                <el-col :span="6">
                    <el-input placeholder="请输入操作人ID" v-model="queryinfo.operatorId" class="input-with-select" clearable @clear="getOperatingRecord()">
                        <el-button slot="append" icon="el-icon-search" @click="getOperatingRecord()"></el-button>
                    </el-input>
                </el-col>

                <el-select v-model="queryinfo.ortype" clearable placeholder="请选择进行的操作">
                    <el-option
                    v-for="item in operationList"
                    :key="item.ortype"
                    :label="item.ortypeName"
                    :value="item.ortype">
                    </el-option>
                </el-select>
                
                
            </el-row>

            <el-table :data="recordList"  border style="width: 100%" >
                <el-table-column label="操作者ID" width="100">
                    <template slot-scope="scope">
                        <i class="el-icon-s-help"></i>
                        <span style="margin-left: 10px">{{ scope.row.sid }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作者账号名" width="100">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.sname }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作类型" width="150">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.ortypeName }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作时间" width="180">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.ortime }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作内容" width="650">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.orinfo }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
import axios from 'axios'
export default{
    data(){
        return{
            queryinfo:{
                operatorId:'',
                ortype:'',
                ortime:''
            },
            operationList:[
                {
                    "ortypeName": "审批注册",
                    "ortype": 1
                },
                {
                    "ortypeName": "更改用户信息",
                    "ortype": 2
                }
            ],
            recordList:[

            ],
        }
    },
    methods:{
        async getOperationList(){
            const {data:res} = await axios.get(`/audit/getOptions?Sid=${this.$store.state.Sid}`)
            console.log("getoperationlist中返回的res为：",res)
            if(res.status == 200)
            {
                this.$message({
                    message: '查询成功',
                    type:'success'
                });
                this.operationList = res.operatingType
                console.log("opeartionList赋值为：",this.operationList)
            }else{
                this.$message({
                    message: '查询失败',
                    type:'error'
                });
            }
        },
        //获取操作记录
        async getOperatingRecord(){
            console.log("queryinfo的值为：",this.queryinfo)
            //发送请求前处理 use_ 类数据
            let use_OperatorID = 0;
            let use_ORtype = 0;
            let use_ORtime = 0;
            if (this.queryinfo.ortype !='') use_ORtype = 1;
            if (this.queryinfo.operatorId !='') use_OperatorID = 1;
            if (this.queryinfo.ortime != '') use_ORtime = 1;
            console.log("处理后的use_类变量为:")
            console.log("use_OperatorID",use_OperatorID)
            console.log("use_ORtype",use_ORtype)
            console.log("use_ORtime",use_ORtime)

            //发送请求
            // console.log(`/audit/getOperatingRecord?Sid=${this.$store.state.Sid}&use_OperatorID=${use_OperatorID}&in_OperatorID=${this.queryinfo.operatorId}&use_ORtype=${use_ORtype}&in_ORtype=${this.queryinfo.ortype}&use_ORtime=${use_ORtime}&in_ORtime_start=&in_ORtime_end=`)
            ///audit/getOperatingRecord?Sid=1&use_OperatorID=1&in_OperatorID=1&use_ORtype=0&in_ORtype=1&use_ORtime=0&in_ORtime_start=&in_ORtime_end=
           const {data:res} = await axios.get(`/audit/getOperatingRecord?Sid=${this.$store.state.Sid}&use_OperatorID=${use_OperatorID}&in_OperatorID=${use_OperatorID?this.queryinfo.operatorId:0}&use_ORtype=${use_ORtype}&in_ORtype=${use_ORtype?this.queryinfo.ortype:0}&use_ORtime=${use_ORtime}&in_ORtime_start=&in_ORtime_end=`)
            console.log("获取操作记录的 res为:",res)
            if(res.status == 200){
                this.recordList = res.operatingRecord
                console.log("operatingRecord:",this.recordList)
            }else{
                this.$message({
                    message: '查询失败',
                    type:'error'
                });
            }
        }
    },
    created(){
        this.getOperationList()
        this.getOperatingRecord()
    }
}

</script>

<style lang="less" scoped>

</style>