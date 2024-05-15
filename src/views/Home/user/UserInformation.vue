<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>账号管理</el-breadcrumb-item>
            <el-breadcrumb-item>账号信息查看</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-table :data="staffList" style="width: 100%">
                <el-table-column label="账号id" width="100">
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
                        <span style="">{{ scope.row.ssex === 1?"男":"女" }}</span>
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
                <el-table-column label="职务" width="150">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.jobName }}</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="上级职务" width="150">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.bossJobName }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="职务警告" width="150">
                    <template slot-scope="scope">
                        <span style="" v-if="scope.row.jobWarning==1">Warning</span>
                        <span style="" v-else>无</span>
                    </template>
                </el-table-column>
                <el-table-column label="修改信息">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="primary"
                        @click="modifyStaffInformation(scope.row.sid)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

         <!-- 修改信息对话框 -->
        <el-dialog
        title="修改账号信息"
        :visible.sync="modifyVisible"
        width="50%">
            <!-- 表单主题 -->
            <el-form :model="modifyInformation[0]" ref="modifyInformationRef" label-width="70px">

                <el-form-item label="账号名称">
                    <el-input v-model="modifyInformation[0].sname" disabled></el-input>
                </el-form-item>

                <el-form-item label="性别">
                    <el-select v-model="modifyInformation[0].ssex">
                        <el-option label="女" value="2"></el-option>
                        <el-option label="男" value="1"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="出生日期" prop="Sbirth">
                        <el-date-picker
                        v-model="modifyInformation[0].sbirth"
                        type="date"
                        placeholder="选择出生日期"
                        value-format="yyyy-MM-dd">
                        </el-date-picker>
                </el-form-item>

                <el-form-item label="电话号码" prop="Sphone">
                    <el-input type="text" v-model="modifyInformation[0].sphone" autocomplete="off" placeholder="请输入电话号码" prefix-icon="el-icon-user"></el-input>
                </el-form-item>

                <el-form-item label="boss名" prop="bossSid">
                    <!-- <el-input type="text" v-model="ruleForm.bossSid" autocomplete="off" placeholder="请输入上级ID" prefix-icon="el-icon-user"></el-input> -->
                    <el-select v-model="modifyInformation[0].sbossId" placeholder="请选择上级ID">
                        <el-option
                        v-for="item in bossIdList"
                        :key="item.sid"
                        :label="item.sname"
                        :value="item.sid">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="职务" prop="bossSid">
                    <!-- <el-input type="text" v-model="ruleForm.bossSid" autocomplete="off" placeholder="请输入上级ID" prefix-icon="el-icon-user"></el-input> -->
                    <el-select v-model="modifyInformation[0].jid" placeholder="请选择职务">
                        <el-option
                        v-for="item in jobList"
                        :key="item.jid"
                        :label="item.jobName"
                        :value="item.jid">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="modifyVisible = false">取 消</el-button>
                <el-button type="primary" @click="modify()">修 改</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
export default{
    data(){
        return{
            staffList:[
            {
                "sname": "主管1",
                "sbossId": 1,
                "ssex": 1,
                "sbossName": "admin",
                "sbirth": "2000-01-02",
                "jobName": "管理员",
                "sid": 2,
                "sstate": 2,
                "sphone": "10010001000",
                "jobWarning": 0,
                "jid": 2,
                "bossJobName": "超级管理员"
            },
            ],
            modifyInformation:[
            {
                "sname": "主管1",
                "sbossId": 1,
                "ssex": 1,
                "sbossName": "admin",
                "sbirth": "2000-01-02",
                "jobName": "管理员",
                "sid": 2,
                "sstate": 2,
                "sphone": "10010001000",
                "jobWarning": 0,
                "jid": 2,
                "bossJobName": "超级管理员"
            },
            ],
            bossIdList:[
                {
                    Sid: 1,
                    Sname: ""
                }
            ],
            jobList:[
                {
                    jid:2,
                    jobName:"管理员"
                },
                {
                    jid:3,
                    jobName:"用户"
                }
            ],
            modifyVisible:false
        }
    },
    methods:{
        async getAllStaff(){
            const {data:res} = await axios.get(`/superadmin/getAllStaff?sqlOptions=order by sid`)
            console.log("getAllStaff的返回结果为：",res)
            this.staffList = res.staffSuperadmin
        },
        async modifyStaffInformation(sid){
            const {data:res} = await axios.get(`/superadmin/getAllStaff?sqlOptions=where sid=${sid}`)
            console.log("modify中获取的用户信息为",res)
            this.modifyInformation = res.staffSuperadmin
            //判断权限是否满足  逻辑是 管理员能修改所有用户的信息  超级管理员能修改所有的信息
            if ( this.$store.state.jobName == "超级管理员" || (this.modifyInformation[0].jobName == "用户" && this.$store.state.jobName == "管理员")){
                console.log("允许修改")
                this.modifyVisible = true
            }else{
                this.$message({
                    message: '权限不足，无法修改',
                    type: 'error'
                });
            }
        },
        async getBossIdList(){
            const {data:res} = await axios.get('/login/getAdminStaff')
            console.log("getbossidlist的请求为：",res)
            if (res.status == 200){
                this.bossIdList = res.adminStaff
            }
            console.log("获取的idlist为：",this.bossIdList)
        },
        async modify(){
            let a={};
            a.Sname = this.modifyInformation[0].sname
            a.Ssex = this.modifyInformation[0].ssex
            a.Sbirth = this.modifyInformation[0].sbirth
            a.Sstate = 2
            a.Sphone = this.modifyInformation[0].sphone
            a.bossSid = this.modifyInformation[0].sbossId
            a.Jid = this.modifyInformation[0].jid
            a.Sid = this.modifyInformation[0].sid
            a.operatorID = this.$store.state.Sid
            console.log("提交的表单为：",a)
            const {data:res} = await axios.post(`/superadmin/updateStaff?Sname=${a.Sname}&Ssex=${a.Ssex}&Sbirth=${a.Sbirth}&Sstate=${a.Sstate}&Sphone=${a.Sphone}&bossSid=${a.bossSid}&Jid=${a.Jid}&Sid=${a.Sid}&operatorID=${a.operatorID}`)
            console.log("注册修改的结果为:",res)

            if(res.status == 200)
            {
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
                this.modifyVisible = false;
                this.getAllStaff();
                this.getBossIdList()
            }
        },
    },
    created(){
        this.getAllStaff();
        this.getBossIdList()
    }
}

</script>

<style lang="less" scoped>

</style>