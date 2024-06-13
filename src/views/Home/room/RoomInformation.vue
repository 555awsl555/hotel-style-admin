<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>客房管理</el-breadcrumb-item>
            <el-breadcrumb-item>客房信息设置</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-button type="primary" @click="addVisible = true">添加客房信息</el-button>
<!-- 表格 -->
            <el-table :data="roomInformationList" style="width: 100%">

                <el-table-column label="客房ID" width="150">
                    <template slot-scope="scope">
                        <i class="el-icon-s-help"></i>
                        <span style="margin-left: 10px">{{ scope.row.riid }}</span>
                    </template>
                </el-table-column>
                
                <el-table-column label="客房房间号" width="150">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.riname }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="客房类型" width="150">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.rtname }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="客房楼层" width="150">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.rifloor }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="客房电话" width="150">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.riphone }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="是否使用" width="150">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.isUsed?"使用中":"空闲中" }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="修改信息" width="80">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="primary"
                        @click="getModifyInformation(scope.row.riid)">更改</el-button>
                    </template>
                </el-table-column>

                <el-table-column label="删除类型">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="danger"
                        @click="deleteRoomInformation(scope.row.riid)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

<!-- 修改信息对话框 -->
        <el-dialog
        title="修改客房信息"
        :visible.sync="modifyVisible"
        width="50%">
            <el-form :model="modifyInformation[0]" ref="modifyInformationRef" label-width="70px">
                <el-form-item label="客房ID">
                    <el-input v-model="modifyInformation[0].riid" disabled></el-input>
                </el-form-item>

                <el-form-item label="客房房号">
                    <el-input v-model="modifyInformation[0].riname"></el-input>
                </el-form-item>

                <el-form-item label="客房类型">
                    <el-select v-model="modifyInformation[0].rtid" placeholder="请选择客房类型">
                        <el-option
                        v-for="item in roomTypeList"
                        :key="item.rtid"
                        :label="item.rtname"
                        :value="item.rtid">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="客房楼层">
                    <el-input v-model="modifyInformation[0].rifloor"></el-input>
                </el-form-item>

                <el-form-item label="客房电话">
                    <el-input v-model="modifyInformation[0].riphone"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="modifyVisible = false">取 消</el-button>
                <el-button type="primary" @click="modify()">修 改</el-button>
            </span>
        </el-dialog>
<!-- 添加对话框 -->
<el-dialog
        title="添加客房信息"
        :visible.sync="addVisible"
        width="50%">
            <!-- 表单主题 -->
            <el-form :model="addInformation" ref="addInformationRef" label-width="70px">

                <el-form-item label="客房房号">
                    <el-input v-model="addInformation.riname"></el-input>
                </el-form-item>

                <el-form-item label="客房楼层">
                    <el-input v-model="addInformation.rifloor"></el-input>
                </el-form-item>

                <el-form-item label="客房电话">
                    <el-input v-model="addInformation.riphone"></el-input>
                </el-form-item>

                <el-form-item label="客房类型">
                    <el-select v-model="addInformation.rtid" placeholder="请选择客房类型">
                        <el-option
                        v-for="item in roomTypeList"
                        :key="item.rtid"
                        :label="item.rtname"
                        :value="item.rtid">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="add()">添 加</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
export default{
    data(){
        return{
            //注:需要根据rtid去hash表里面取对应的name
            /**映射后的列表为：
             * isUsed: 0
                rifloor: 1
                riid: 5
                riname: "104"
                riphone: "88116104"
                rtid: 1
                rtname: "双床房"
                rtprice: 181
             */
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
            //修改信息列表
            modifyInformation:[
                {
                    "isUsed": 0,
                    "riname": "101",
                    "riid": 2,
                    "rifloor": 1,
                    "riphone": "77777",
                    "rtid": 1
                }
            ],
            addInformation:
                {
                    "isUsed": "",
                    "riname": "",
                    "rifloor": "",
                    "riphone": "",
                    "rtid": ""
                },
            //修改窗口可视参数
            modifyVisible:false,
            //添加窗口可视参数
            addVisible:false
        }
    },
    methods:{
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
        //3.1获取修改的列表的信息
        async getModifyInformation(riid){
        const {data:res} = await axios.get(`/roominfo/getAllroominfo?sqlOptions= where RIid = ${riid}`)
            console.log("getModifyInformation中获取的用户信息为",res)
            this.modifyInformation = res.roomsinfo
            this.modifyVisible = true
        },
        //3.2修改指定客房信息
        async modify(){
            const {data:res} = await axios.post(`/roominfo/updateroominfo?operatorid=${this.$store.state.Sid}&RIid=${this.modifyInformation[0].riid}&RIname=${this.modifyInformation[0].riname}&RIfloor=${this.modifyInformation[0].rifloor}&RIphone=${this.modifyInformation[0].riphone}&RTid=${this.modifyInformation[0].rtid}&isUsed=${this.modifyInformation[0].isUsed}`)
            console.log("信息修改的结果为:",res)
            if(res.status == 200)
            {
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
                this.modifyVisible = false;
                this.getAllRoomInformation();
            }
        },
        //4.删除客房信息
        async deleteRoomInformation(riid){
            console.log(riid)
            const {data:res} = await axios.post(`/roominfo/deleteroominfo?operatorid=${this.$store.state.Sid}&RIid=${riid}`)
            console.log("删除的结果为:",res)
            if(res.status == 200)
            {
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
                this.addVisible = false;
                this.getAllRoomType()
            }else{
                this.$message({
                    message: res.message,
                    type: 'error'
                });
            }
            this.getAllRoomInformation();
        },
        //5.增加客房信息
        async add(){
            this.addInformation.isUsed = 0
            const {data:res} = await axios.post(`/roominfo/insertroominfo?operatorid=${this.$store.state.Sid}&RIname=${this.addInformation.riname}&RIfloor=${this.addInformation.rifloor}&RIphone=${this.addInformation.riphone}&RTid=${this.addInformation.rtid}&isUsed=${this.addInformation.isUsed}`)
            console.log("添加客房信息的结果为:",res)
            if(res.status == 200)
            {
                this.$message({
                    message: '添加成功',
                    type: 'success'
                });
                this.addVisible = false;
                this.getAllRoomType()
            }else{
                this.$message({
                    message: res.message,
                    type: 'error'
                });
            }
            this.getAllRoomInformation();
        }

    },
    async created(){
        await this.getAllRoomType();
        await this.getAllRoomInformation();
    }
}

</script>

<style lang="less" scoped>

</style>