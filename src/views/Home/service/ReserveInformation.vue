<!-- 只读 -->

<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>入住管理</el-breadcrumb-item>
            <el-breadcrumb-item>客房预定信息（未入住）</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
<!-- 表格 -->
            <el-table :data="reserveList" style="width: 100%">

                <el-table-column label="预定订单ID" width="150">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.rid }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="客户姓名" width="150">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.cname }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="客户身份证" width="200">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.ccardId }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="预定房间类型" width="150">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.rtname }}</span>
                    </template>
                </el-table-column>
                
                <el-table-column label="预定时间" width="200">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.rtime}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="预定入住时间" width="200">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.rstartTime }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="预定离开时间" width="200">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.rendTime }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="预支付金额" width="150">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.rpay }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="入住人数" width="150">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.rpcnt }}</span>
                    </template>
                </el-table-column>

                <!-- <el-table-column label="房间类型ID" width="150">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.rtid }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="顾客ID" width="150">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.cid }}</span>
                    </template>
                </el-table-column> -->

                <el-table-column label="操作员ID" width="150">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.sid }}</span>
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
            reserveList:[
                {
                    "rid": 1,   //room ID
                    "rtime": "2024-05-16 17:13:36.0",
                    "rstartTime": "2024-05-17 14:00:00.0",
                    "rendTime": "2024-05-19 14:00:00.0",
                    "rpay": 100.0,
                    "rpcnt": 2,
                    "rtid": 1,
                    "cid": 2,   //顾客ID
                    "sid": 3    //操作员ID
                }
            ],
            clientList:[
                {
                    "cname": "王家晨",
                    "dgrade": 1,
                    "ccardId": "331003200410160000",
                    "cid": 2,
                    "cphone": "18868436522",
                    "caddr": "杭电618"
                }
            ],
            roomTypeList:[

            ],
        }
    },
    methods:{
        async improveReserveList(){
            this.reserveList.forEach(reserve => {
                var roomName = this.roomTypeList.find(rt => rt.rtid === reserve.rtid);
                var clientName = this.clientList.find(cn => cn.cid === reserve.cid);
                if (roomName) {
                    reserve.rtname = roomName.rtname;
                }
                if (clientName){
                    reserve.cname = clientName.cname;
                    reserve.ccardId = clientName.ccardId;
                }
            });
            console.log("映射的List为：",this.reserveList)
        },
        //1.获取所有预定信息/user/getreserve
        async getReserve(){
            const {data:res} = await axios.get(`/user/getreserve`)
            console.log("getreserve的返回结果为：",res)
            this.reserveList = res.reserves
            console.log("reservelist",this.reserveList)
            await this.improveReserveList()
        },
        //2.获取客户信息
        async getClient(){
            const {data:res} = await axios.get(`/discount/getClient`)
            this.clientList = res.clients
            console.log("clientList:",this.clientList)
        },
        //3.获取房间信息
        // async getAllRoomInformation(){
        //     const {data:res} = await axios.get(`/roominfo/getAllroominfo`)
        //     console.log("getAllroominfo的返回结果为：",res)
        //     this.roomInformationList = res.roomsinfo
        // },
        async getAllRoomType(){
            const {data:res} = await axios.get(`/roomtype/getAllroomType`)
            console.log("getAllRoomType的返回结果为：",res)
            this.roomTypeList = res.roomTypes
            console.log("roomlist",this.roomTypeList)
        },
    },
    async created(){
        await this.getClient()
        await this.getAllRoomType()
        await this.getReserve()
    }
}

</script>

<style lang="less" scoped>

</style>