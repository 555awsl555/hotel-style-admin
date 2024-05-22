<!-- 
    先从选择器选择身份证号----点击搜索按钮-----查询该身份号(通过 cid)有无预定订单
    若有 --- 从该预定订单获取房间类型 ---- 加载房间号选择器 ----选择房间号----入住


 -->

<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>入住管理</el-breadcrumb-item>
            <el-breadcrumb-item>客房入住</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-form>
                <el-form-item label="选择用户(身份证)">
                        <el-select v-model="queryForm.cid" 
                        filterable 
                        clearable
                        placeholder="请选择身份证信息(若无信息，则去客户管理中添加)" 
                        style="width:400px">
                            <el-option
                            v-for="item in clientList"
                            :key="item.cid"
                            :label="item.ccardId"
                            :value="item.cid">
                            <span style="float: left">{{ item.cname }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.ccardId }}</span>
                            </el-option>
                        </el-select>
                        <el-button icon="el-icon-search" @click="checkReserve(queryForm.cid)"></el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card v-if="reserveSelectRoomVisible" style="margin-top: 20px;">
            <div class="block" style="margin-bottom:20px">
                <span class="demonstration">查询到预定信息，请选择房间号</span>
            </div>
            <el-form>
                <el-form-item label="选择房间号">
                        <el-select v-model="queryForm.reserveRIid" 
                        filterable 
                        clearable
                        placeholder="请选择房间号" 
                        style="width:400px">
                            <el-option
                            v-for="item in riidList"
                            :key="item.riid"
                            :label="item.riname"
                            :value="item.riid">
                            </el-option>
                        </el-select>
                        <el-button icon="el-icon-search" @click="reserve()"></el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card v-if="orderSelectVisible" style="margin-top:20px;">
            <div class="block" style="margin-bottom:20px">
                <span class="demonstration">未查询到预定信息，请输入入住信息</span>
            </div>

            <el-form :model="orderInformation" ref="orderInformationRef" label-width="100px">
                <el-form-item label="房间号">
                    <el-select v-model="orderInformation.riid" filterable placeholder="请选择房间号">
                        <el-option
                        v-for="item in roomNoUsed"
                        :key="item.riid"
                        :label="item.riname"
                        :value="item.riid">
                        <span style="float: left">{{ item.riname }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.rtname }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="开始时间">
                    <el-date-picker
                        v-model="orderInformation.ostartTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="结束时间">
                    <el-date-picker
                        v-model="orderInformation.oendTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="入住人数">
                    <el-input style="width:100px" v-model="orderInformation.opcnt"></el-input>
                </el-form-item>

                <el-form-item label="预支付金额">
                    <el-input style="width:100px" v-model="orderInformation.opay"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="addOrder()" style="margin-left:30px;">添 加</el-button>
            <el-button type="info" @click="clearOrder()" style="margin-left:30px;">清 空</el-button>
        </el-card>
    </div>
</template>

<script>
import axios from 'axios'
export default{
    data(){
        return{
            //所有的客户信息
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
            //根据身份证获取到的预定信息
            reserveInformation:[
                {
                "rid": 1,
                "rtime": "2024-05-16 17:13:36.0",
                "rstartTime": "2024-05-17 14:00:00.0",
                "rendTime": "2024-05-19 14:00:00.0",
                "rpay": 100.0,
                "rpcnt": 2,
                "rtid": 1,
                "cid": 2,
                "sid": 3
                }
            ],
            //根据预定信息的房间类型获取的所有房间列表
            riidList:[
            {
                "isUsed": 0,
                "riid": 3,
                "riname": "102",
                "rtid": 1,
                "riphone": "88116102",
                "rifloor": 1
            },
            {
                "isUsed": 0,
                "riid": 4,
                "riname": "103",
                "rtid": 1,
                "riphone": "88116103",
                "rifloor": 1
            },
            ],
            //所有未入住的房间列表（在未预定入住时候用）
            roomNoUsed:[
                {
                    "isUsed": 0,
                    "riid": 2,
                    "riname": "101",
                    "riphone": "78787878",
                    "rifloor": 2,
                    "rtid": 2
                }
            ],
            //房间类型列表
            roomTypeList:[
            ],
            queryForm:{
                cid:'',
                reserveRIid:'', //RIid
                ccardId:''
            },
            //入住订单需要填写的信息
            orderInformation:{
                cid:'',
                riid:'',
                ostartTime:'',
                oendTime:'',
                opcnt:'',
                opay:''
            },
            //预定  选择房间模块是否可见
            reserveSelectRoomVisible:false,
            orderSelectVisible:false
        }
    },
    methods:{
        //获取客房类型的列表
        async getAllRoomType(){
            const {data:res} = await axios.get(`/roomtype/getAllroomType`)
            console.log("getAllRoomType的返回结果为：",res)
            this.roomTypeList = res.roomTypes
            console.log("roomlist",this.roomTypeList)
        },
        //获取所有人身份证号
        async getClient(){
            const {data:res} = await axios.get(`/discount/getClient`)
            this.clientList = res.clients
            console.log("clientList:",this.clientList)
        },
        //通过cid查询是否有预定信息
        checkReserve(cid){
            if(cid == ""){
                this.$message({
                message: '请选择客户',
                type:'error'
            });
            this.reserveSelectRoomVisible = false
            return
            }
            this.getReserveInformation()
            console.log("cid",cid)
        },
        //获取预定信息列表/user/getreserve?sqlOption=where cid=${queryForm.cid}
        async getReserveInformation(){
            const {data:res} = await axios.get(`/user/getreserve?sqlOption=where cid=${this.queryForm.cid}`)
            console.log("getreserve的返回结果为：",res)
            this.reserveInformation = res.reserves
            console.log("reserveImformation",this.reserveInformation)
            if(res.reserves.length == 0){
                this.$message({
                message: '无预定',
                type:'error'});
                this.reserveSelectRoomVisible = false
                this.orderSelectVisible =true
                return
            }
            this.getRIidList()
            this.reserveSelectRoomVisible = true
            this.orderSelectVisible =false
        },
        //获取所有该类型的房间号
        async getRIidList(){
            const {data:res} = await axios.get(`/roominfo/getAllroominfo?sqlOptions= where RTid = ${this.reserveInformation[0].rtid}`)
            console.log("getRIidList中获取的用户信息为",res)
            this.riidList = res.roomsinfo
        },
        //预定操作/user/checkin_r?&operatorid=${this.$store.state.Sid}&CcardId=${this.queryForm.ccardId}&RIid=${this.queryForm.reserveRIid}
        async reserve(){
            //获取身份证号
            this.queryForm.ccardId = this.clientList.find(client => client.cid === this.queryForm.cid)?.ccardId;
            console.log("queryForm",this.queryForm)
            const {data:res} = await axios.post(`/user/checkin_r?&operatorid=${this.$store.state.Sid}&CcardId=${this.queryForm.ccardId}&RIid=${this.queryForm.reserveRIid}`)
            console.log("checkin_r的返回结果为：",res)
            if(res.status == 200){
                this.$message({
                message: res.message,
                type:'success'
            });
            this.$router.push('/orderInformation');
            }
        },
        //获取所有没有被使用过的房间
        async getRoomNoUsed(){
            const {data:res} = await axios.get(`/roominfo/getAllroominfo?sqloptions=where isUsed=0`)
            console.log("getRoomNoUsed的返回结果为：",res)
            this.roomNoUsed = res.roomsinfo

            this.roomNoUsed.forEach(room => {
                var roomType = this.roomTypeList.find(rt => rt.rtid === room.rtid);
                if (roomType) {
                    room.rtname = roomType.rtname;
                    room.rtprice = roomType.rtprice;
                }
            });
            console.log("roomlist",this.roomNoUsed)
        },
        //提交入住信息/user/checkin_o?&operatorid=${this.$store.state.Sid}&Cid=${this.orderInformation.cid}&RIid=${this.orderInformation.riid}&OstartTime=${this.orderInformation.ostartTime}&OendTime=${this.orderInformation.oendTime}&Opcnt=${this.orderInformation.opcnt}&Opay=${this.orderInformation.opay}
        async addOrder(){
            console.log("orderInformation为：",this.orderInformation)
            console.log(`/user/checkin_o?&operatorid=${this.$store.state.Sid}&Cid=${this.queryForm.cid}&RIid=${this.orderInformation.riid}&OstartTime=${this.orderInformation.ostartTime}&OendTime=${this.orderInformation.oendTime}&Opcnt=${this.orderInformation.opcnt}&Opay=${this.orderInformation.opay}`)
            const {data:res} = await axios.post(`/user/checkin_o?&operatorid=${this.$store.state.Sid}&Cid=${this.queryForm.cid}&RIid=${this.orderInformation.riid}&OstartTime=${this.orderInformation.ostartTime}&Oendtime=${this.orderInformation.oendTime}&Opcnt=${this.orderInformation.opcnt}&Opay=${this.orderInformation.opay}`)
            console.log("addOrder的res",res)
            if(res.status == 200){
                this.$message({
                    message: res.message,
                    type:'success'
                });
                this.$router.push('/orderInformation');
            }else{
                this.$message({
                    message: res.message,
                    type:'error'
                });
            }
        },
        clearOrder(){
            this.orderInformation={
                cid:'',
                riid:'',
                ostartTime:'',
                oendTime:'',
                opcnt:'',
                opay:''
            }
        }
    },
    async created(){
        await this.getAllRoomType()
        await this.getClient()
        await this.getRoomNoUsed()
    }
}

</script>

<style lang="less" scoped>

</style>