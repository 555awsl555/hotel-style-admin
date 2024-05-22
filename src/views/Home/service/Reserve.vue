<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>入住管理</el-breadcrumb-item>
            <el-breadcrumb-item>客房预定</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-form :model="reserveInformation" ref="reserveInformationRef" label-width="150px">
                <el-form-item label="选择用户(身份证)">
                    <el-select v-model="reserveInformation.cid" filterable clearable placeholder="请选择身份证信息(若无信息，则去客户管理中添加)" style="width:400px">
                        <el-option
                        v-for="item in clientList"
                        :key="item.cid"
                        :label="item.ccardId"
                        :value="item.cid">
                        <span style="float: left">{{ item.cname }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.ccardId }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="房间类型">
                    <el-select v-model="reserveInformation.rtid" placeholder="请选择房间类型">
                        <el-option
                        v-for="item in roomTypeList"
                        :key="item.rtid"
                        :label="item.rtname"
                        :value="item.rtid">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="开始时间">
                    <el-date-picker
                        v-model="reserveInformation.rstarTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="结束时间">
                    <el-date-picker
                        v-model="reserveInformation.rendTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="入住人数">
                    <el-input style="width:100px" v-model="reserveInformation.rpcnt"></el-input>
                </el-form-item>

                <el-form-item label="预支付金额">
                    <el-input style="width:100px" v-model="reserveInformation.rpay"></el-input>
                </el-form-item>
                    
            </el-form>
            <el-button type="primary" @click="reserve()">添 加</el-button>
        </el-card>
    </div>


</template>

<script>
import axios from 'axios'
export default{
    data(){
        return{
            reserveInformation:{
                rstarTime:"",//开始时间
                rendTime:"",//结束时间
                rpay:"",//预支付
                rpcnt:"",//不知道啥
                rtid:"",//房间类型
                cid:"",//顾客id
                sid:""//操作员id
            },
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
                {
                    rtid:'1',
                    rtname:'大床房',
                    rtprice:'180'
                },
                {
                    rtid:'2',
                    rtname:'双床房',
                    rtprice:'200'
                },
            ],
        }
    },
    methods:{
        //1.获取填表时候需要的数据
        //1.1 获取所有登记的顾客信息
        async getClient(){
            const {data:res} = await axios.get(`/discount/getClient`)
            this.clientList = res.clients
            console.log("clientList:",this.clientList)
        },
        //1.2 获取所有的房间类型信息
        async getAllRoomType(){
            const {data:res} = await axios.get(`/roomtype/getAllroomType`)
            console.log("getAllRoomType的返回结果为：",res)
            this.roomTypeList = res.roomTypes
        },
        //2.提交预定信息
        ///user/insertreserve?operatorid=${this.$store.state.Sid}&RstartTime=${this.reserveInformation.rstarTime}&RendTime=${this.reserveInformation.rendTime}&Rpay=${this.reserveInformation.rpay}&Rpcnt=${this.reserveInformation.rpcnt}&RTid=${this.reserveInformation.rtid}&Cid=${this.reserveInformation.cid}&Sid=${this.$store.state.Sid}
        async reserve(){
            console.log("reserveInformation为：",this.reserveInformation)
            console.log(`/user/insertreserve?operatorid=${this.$store.state.Sid}&rstartTime=${this.reserveInformation.rstarTime}&rendTime=${this.reserveInformation.rendTime}&rpay=${this.reserveInformation.rpay}&rpcnt=${this.reserveInformation.rpcnt}&rtid=${this.reserveInformation.rtid}&cid=${this.reserveInformation.cid}&sid=${this.$store.state.Sid}`)
            const {data:res} = await axios.post(`/user/insertreserve?operatorid=${this.$store.state.Sid}&rstartTime=${this.reserveInformation.rstarTime}&rendTime=${this.reserveInformation.rendTime}&rpay=${this.reserveInformation.rpay}&rpcnt=${this.reserveInformation.rpcnt}&rtid=${this.reserveInformation.rtid}&cid=${this.reserveInformation.cid}&sid=${this.$store.state.Sid}`)
            console.log("添加的预定信息结果为：",res)

            if(res.status == 200)
            {
                this.$message({
                    message: '预定成功',
                    type: 'success'
                });

                this.reserveInformation={
                    rstarTime:"",//开始时间
                    rendTime:"",//结束时间
                    rpay:"",//预支付
                    rpcnt:"",//不知道啥
                    rtid:"",//房间类型
                    cid:"",//顾客id
                    sid:""//操作员id
                }
            }else{
                this.$message({
                    message: res.message,
                    type: 'error'
                });
            }
        }
    },
    created(){
        this.getClient();
        this.getAllRoomType();
    }
}

</script>

<style lang="less" scoped>

</style>