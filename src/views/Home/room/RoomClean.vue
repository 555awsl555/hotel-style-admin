<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>客房管理</el-breadcrumb-item>
            <el-breadcrumb-item>客房清洁管理</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-table :data="cleanRoomList" style="width: 100%">
                <el-table-column label="房间ID" width="100">
                    <template slot-scope="scope">
                        <i class="el-icon-s-help"></i>
                        <span style="margin-left: 10px">{{ scope.row.riid }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="房间名" width="100">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.riname }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="房间楼层" width="100">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.rifloor }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="房间电话" width="200">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.riphone }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="清理状态" width="100">
                        <el-tag size="danger">未 清 理</el-tag>
                </el-table-column>

                <el-table-column label="清理操作" width="100">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="primary"
                        @click="cleanRoom(scope.row.riid, $store.state.Sid)">清 理</el-button>
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
            cleanRoomList:[
                {
                    "isUsed": 2,
                    "riid": 48,
                    "riname": "307",
                    "rtid": 3,
                    "riphone": "88116307",
                    "rifloor": 3
                }
            ]
        }
    },
    methods:{
        async getCleanRoomList(){
            const {data:res} = await axios.get(`/clean/getroom`)
            console.log("getcleanroomlist函数的返回结果为 ",res)
            this.cleanRoomList = res.roomsinfo
        },
        async cleanRoom(riid,operatorId){
            console.log("riid:",riid)
            console.log("operatorid:",operatorId)
            const {data:res} = await axios.post(`/clean/clean?RIid=${riid}&operatorid=${operatorId}`)
            console.log("clean返回的结果为：",res)
            if (res.status == 200){
                this.$message({
                    message: '清洁登记成功',
                    type:'success'
                });
                this.getCleanRoomList()
            }else{
                this.$message({
                    message: '操作失败,请联系管理员',
                    type:'error'
                });
            }
        }
    },
    async created(){
        await this.getCleanRoomList()
    }
}

</script>

<style lang="less" scoped>

</style>