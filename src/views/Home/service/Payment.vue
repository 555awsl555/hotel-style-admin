<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>入住管理</el-breadcrumb-item>
            <el-breadcrumb-item>结账收银</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-form>
                <el-form-item label="选择用户(身份证)">
                        <el-select v-model="payment.cid" 
                        filterable 
                        clearable
                        placeholder="请选择身份证信息" 
                        style="width:400px">
                            <el-option
                            v-for="item in orderList"
                            :key="item.cid"
                            :label="item.ccardId"
                            :value="item.cid">
                            <span style="float: left">{{ item.cname }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.ccardId }}</span>
                            </el-option>
                        </el-select>
                        <el-button icon="" @click="pay(payment.cid)">结账</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <!-- <el-card v-if="showMoenyVisible" style="margin-top:20px">
            <span class="showmoney" style="display:block">原价： {{paymoney[0].ooriPrice}}</span>
            <span class="showmoney" style="display:block">折后价格：{{paymoney[0].oprice}}</span>
            <span class="showmoney" style="display:block">应付人民币：{{paymoney[0].oneedPay}}</span>
            <span></span>
        </el-card> -->

        <el-card v-if="showMoenyVisible" style="margin-top:20px">
            <el-descriptions class="margin-top" title="账单" :column="3" :size="size" border>
                <!-- -->
                <el-descriptions-item :span="1">
                <template slot="label">
                    <i class="el-icon-user"></i>
                    客户名
                </template>
                {{bill[0].cname}}
                </el-descriptions-item>
                <el-descriptions-item :span="1">
                <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    手机号
                </template>
                {{bill[0].cphone}}
                </el-descriptions-item>
                <el-descriptions-item :span="1">
                <template slot="label">
                    <i class="el-icon-postcard"></i>
                    身份证号
                </template>
                {{bill[0].ccardId}}
                </el-descriptions-item>
                <!--  -->
                <el-descriptions-item :span="0.5">
                <template slot="label">
                    <i class="el-icon-tickets"></i>
                    等级
                </template>
                <el-tag size="small">{{bill[0].dgrade}}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item :span="2.5">
                <template slot="label">
                    <i class="el-icon-office-building"></i>
                    联系地址
                </template>
                {{bill[0].caddr}}
                </el-descriptions-item>
                <!--  -->
                <el-descriptions-item :span="1">
                <template slot="label">
                    <i class="el-icon-house"></i>
                    房间号
                </template>
                {{bill[0].riname}}
                </el-descriptions-item>

                <el-descriptions-item :span="1"> 
                <template slot="label">
                    <i class="el-icon-collection-tag"></i>
                    房间类型
                </template>
                {{bill[0].rtname}}
                </el-descriptions-item>

                <el-descriptions-item :span="1">
                <template slot="label">
                    <i class="el-icon-collection-tag"></i>
                    房间楼层
                </template>
                {{bill[0].rifloor}}
                </el-descriptions-item>

                <el-descriptions-item :span="3">
                <template slot="label">
                    <i class="el-icon-phone-outline"></i>
                    房间电话
                </template>
                {{bill[0].riphone}}
                </el-descriptions-item>
                <!--  -->
                <el-descriptions-item :span="1.5">
                <template slot="label">
                    <i class="el-icon-time"></i>
                    入住时间
                </template>
                {{bill[0].ostartTime}}
                </el-descriptions-item>

                <el-descriptions-item :span="1.5">
                <template slot="label">
                    <i class="el-icon-time"></i>
                    结束时间
                </template>
                {{bill[0].oendTime}}
                </el-descriptions-item>

                <el-descriptions-item :span="1">
                <template slot="label">
                    <i class="el-icon-coin"></i>
                    原价
                </template>
                {{paymoney[0].ooriPrice}}
                </el-descriptions-item>

                <el-descriptions-item :span="1">
                <template slot="label">
                    <i class="el-icon-coin"></i>
                    折后价格
                </template>
                {{paymoney[0].oprice}}
                </el-descriptions-item>

                <el-descriptions-item :span="1">
                <template slot="label">
                    <i class="el-icon-coin"></i>
                    应付人民币
                </template>
                {{paymoney[0].oneedPay}}
                </el-descriptions-item>
            </el-descriptions>
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
                    "riname":''
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
            payment:{
                cid:''
            },
            paymoney:[
                {
                    "oprice": 289.6,
                    "ooriPrice": 362.0,
                    "oneedPay": 189.6
                }
            ],
            bill:[
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
                    "caddr":'',
                    "dgrade":'',
                    "riname":'',
                    "riphone":'',
                    "rifloor":'',
                    "rtname":'',
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
            //房间类型列表
            roomTypeList:[

            ],
            showMoenyVisible:false,
            size: '',
        }
    },
    methods:{
        //获取未结束的订单信息
        async getAllorder(){
            const {data:res} = await axios.get(`/user/getAllorder?sqlOption=where Ostate=1`)
            this.orderList = res.orders
            console.log("orderList:",this.orderList)

            this.orderList.forEach(order => {
                var clientName = this.clientList.find(cn => cn.cid === order.cid);
                if (clientName){
                    order.cname = clientName.cname;
                    order.ccardId = clientName.ccardId;
                }
            });
        },
        //获取所有人身份证号
        async getClient(){
            const {data:res} = await axios.get(`/discount/getClient`)
            this.clientList = res.clients
            console.log("clientList:",this.clientList)
        },

        //结账/user/Checkoutpayment?operatorid=${this.$store.state.Sid}?Cid=${this.payment.cid}
        async pay(){
            console.log("payment",this.payment)
            console.log(`/user/Checkoutpayment?operatorid=${this.$store.state.Sid}&Cid=${this.payment.cid}`)

            const {data:res2} = await axios.get(`/user/getAllorder?sqlOption=where Ostate=1 and Cid=${this.payment.cid}`)
            console.log("Bill返回结果为：",res2)
            this.bill = res2.orders

            this.bill.forEach(order => {
                var clientName = this.clientList.find(cn => cn.cid === order.cid);
                if (clientName){
                    order.cname = clientName.cname;
                    order.ccardId = clientName.ccardId;
                    order.cphone = clientName.cphone;
                    order.caddr = clientName.caddr;
                    order.dgrade = clientName.dgrade;
                }
            });

            this.bill.forEach(order => {
                var roomName = this.roomInformationList.find(cn => cn.riid === order.riid);
                if (roomName){
                    order.riname = roomName.riname
                    order.riphone = roomName.riphone
                    order.rifloor = roomName.rifloor
                    order.rtname = roomName.rtname
                }
            });
            console.log("bill赋值后为：",this.bill)

            const {data:res} = await axios.post(`/user/Checkoutpayment?operatorid=${this.$store.state.Sid}&Cid=${this.payment.cid}`)
            console.log("payment返回的结果为",res)
            if(res.status == 200){
                this.$message({
                    message: res.message,
                    type:'success'
                });
                this.paymoney = res.orderprices
                this.showMoenyVisible = true
            }else{
                this.$message({
                    message: res.message,
                    type:'error'
                });
            }
        },
         //1.获取客房类型的列表
         async getAllRoomType(){
            const {data:res} = await axios.get(`/roomtype/getAllroomType`)
            console.log("getAllRoomType的返回结果为：",res)
            this.roomTypeList = res.roomTypes
            console.log("roomlist",this.roomTypeList)
        },
        //2.获取所有客房信息,并且映射数据
        async getAllRoomInformation(){
            const {data:res} = await axios.get(`/roominfo/getAllroominfo`)
            console.log("getAllroominfo的返回结果为：",res)
            this.roomInformationList = res.roomsinfo

            this.roomInformationList.forEach(room => {
                var roomType = this.roomTypeList.find(rt => rt.rtid === room.rtid);
                if (roomType) {
                    room.rtname = roomType.rtname;
                    room.rtprice = roomType.rtprice;
                }
            });
            console.log("映射的rinfoList为：",this.roomInformationList)
        },
    },
    async created(){
        await this.getClient()
        await this.getAllorder()
        await this.getAllRoomType()
        await this.getAllRoomInformation()
    }
}

</script>

<style lang="less" scoped>
.showmoney{
    margin-bottom:20px;
}
</style>