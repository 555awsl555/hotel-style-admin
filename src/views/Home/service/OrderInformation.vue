<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>入住管理</el-breadcrumb-item>
            <el-breadcrumb-item>入住订单信息查看</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
<!-- 表格 -->
            <el-table :data="orderList" style="width: 100%" border>
                <el-table-column label="订单编号" width="100">
                    <template slot-scope="scope">
                        <i class="el-icon-s-help"></i>
                        <span style="margin-left: 10px">{{ scope.row.oid }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="订单状态" width="100">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.ostate == 1" type="success"> 进行中 </el-tag>
                        <el-tag v-else-if="scope.row.ostate == 2" type="warning"> 未清洁 </el-tag>
                        <el-tag v-else type="info"> 已结束 </el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="客户姓名" width="100">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.cname }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="客户身份证号" width="150">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.ccardId }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="订单房间号" width="100">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.riname }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="入住人数" width="50">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.opcnt }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="订单已支付" width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.ostate == 1" style="">{{ scope.row.opay }}元</span>
                        <span v-else style="">{{ scope.row.ooriPrice }}元</span>
                    </template>
                </el-table-column>

                <el-table-column label="订单创建时间" width="150">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.otime }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="入住时间" width="150">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.ostartTime }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="预定离开时间" width="150">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.oendTime }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="换房操作" width="100">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="primary"
                        v-if="scope.row.ostate == 1"
                        @click="changeRoom(scope.row.oid)">换 房</el-button>
                    </template>
                </el-table-column>

                <el-table-column label="操作员ID" width="100">
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
            orderList:[
                {
                    "riid": 10, //房间ID
                    "cid": 2,   //顾客ID
                    "oid": 6,   //订单ID
                    "ostate": 0,    //订单状态
                    "opay": 100.0,  //订单预支付
                    "sid": 3,       //操作员
                    "ostartTime": "2024-05-17 14:00:00.0",  //开始时间
                    "otime": "2024-05-20 19:00:53.0",       //订单创建时间
                    "oendTime": "2024-05-19 14:00:00.0",    //结束时间
                    "opcnt": 2,    //入住人数
                    "cname":'',
                    "ccardId":'',
                    "riname":'',
                    "orriPrice":''
                }
            ],
            roomInformationList:[
                {
                    "isUsed": 0,
                    "riname": "101",
                    "riid": 2,
                    "rifloor": 1,
                    "riphone": "77777",
                    "rtid": 1
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
            //存放订单已经支付完成的列表
            alreadyPayList:[
                {
                    "oid": 30,
                    "oprice": 181.0,
                    "ooriPrice": 181.0,
                    "oneedPay": 131.0
                }
            ],
        }
    },
    methods:{
        // 对数据进行处理
        async improveOrderList(){
            this.orderList.forEach(order => {
                var roomName = this.roomInformationList.find(rt => rt.riid === order.riid);
                var clientName = this.clientList.find(cn => cn.cid === order.cid);
                var alreadypay = this.alreadyPayList.find(ap => ap.oid === order.oid)
                if (roomName) {
                    order.riname = roomName.riname;
                }
                if (clientName){
                    order.cname = clientName.cname;
                    order.ccardId = clientName.ccardId;
                }
                if (alreadypay){
                    order.ooriPrice = alreadypay.ooriPrice;
                }
            });
            console.log("映射的List为：",this.orderList)
        },
        //1.对获取的订单列表内的数据进行完善
        //1.1获取房间信息 ID --- 房间号
        async getAllRoomInformation(){
            const {data:res} = await axios.get(`/roominfo/getAllroominfo`)
            console.log("getAllroominfo的返回结果为：",res)
            this.roomInformationList = res.roomsinfo
        },
        //1.2获取顾客信息   ID ---姓名，身份证
        async getClient(){
            const {data:res} = await axios.get(`/discount/getClient`)
            this.clientList = res.clients
            console.log("clientList:",this.clientList)
        },
        //1.3获取订单信息/user/getAllorder
        async getAllorder(){
            const {data:res} = await axios.get(`/user/getAllorder`)
            this.orderList = res.orders
            console.log("orderList:",this.orderList)
            await this.improveOrderList()
        },
        async getAlreadyPay(){
            const {data:res} = await axios.get(`/order/orderprice`)
            this.alreadyPayList = res.orderprices
            console.log("已经支付的订单钱列表:",this.alreadyPayList)
        },
        changeRoom(oid){
            console.log(oid)
        }

    },
    async created(){
        await this.getClient();
        await this.getAllRoomInformation();
        await this.getAlreadyPay();
        await this.getAllorder();
    }
}

</script>

<style lang="less" scoped>

</style>