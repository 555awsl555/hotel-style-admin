<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>审计管理</el-breadcrumb-item>
            <el-breadcrumb-item>账号注册审计</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-table :data="approveList" style="width: 100%">
                <el-table-column label="账号序号" width="100">
                    <template slot-scope="scope">
                        <i class="el-icon-s-help"></i>
                        <span style="margin-left: 10px">{{ scope.row.sid }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="账号名" width="100">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.sname }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="性别" width="100">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.ssex }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="出生日期" width="150">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.sbirth }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="电话号码" width="150">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.sphone }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="职务" width="100">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.jobName }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="审批操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="primary"
                        @click="accessApprove(scope.row.sid, $store.state.Sid)">通过</el-button>
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
            approveList:[
                {
                    sid: 1,
                    sname: "name1",
                    ssex: "男",
                    sbirth: 2024-10-2,
                    sstate: 1,
                    sphone: "18958251932",
                    jobName: "用户",
                    sbossId: 1,
                    sbossName: ""
                }
            ],
        }
    },
    methods:{
        //通过审批请求
        async accessApprove(requestid,operatorid){
            console.log("requestid:",requestid)
            console.log("operatorid:",operatorid)
            const {data:res} = await axios.post(`/register/acceptRequest?requestId=${requestid}&operatorId=${operatorid}`)
            if (res.status == 200){
                this.$message({
                    message: '申请通过',
                    type:'success'
                });
                this.getStaffApprove();
            }else{
                this.$message({
                    message: '申请失败',
                    type:'error'
                });
            }
            console.log("accessApprove的返回结果为",res)
        },
        //获取审批请求
        async getStaffApprove(){
            console.log(this.$store.state.Sid)
            const {data:res} = await axios.get(`/register/getStaffApprove?bossSid=${this.$store.state.Sid}`)
            console.log("getStaffApprove函数的返回结果为 ",res)
            this.approveList = res.approveStaff
        }
    },
    created(){
        this.getStaffApprove();
    }
}

</script>

<style lang="less" scoped>

</style>