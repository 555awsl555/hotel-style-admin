<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>客房管理</el-breadcrumb-item>
            <el-breadcrumb-item>客房类型设置</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-button type="primary" @click="addVisible = true">添加客房类型</el-button>
            <el-table :data="roomTypeList" style="width: 100%">

                <el-table-column label="客房类型ID" width="150">
                    <template slot-scope="scope">
                        <i class="el-icon-s-help"></i>
                        <span style="margin-left: 10px">{{ scope.row.rtid }}</span>
                    </template>
                </el-table-column>
                
                <el-table-column label="客房名" width="150">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.rtname }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="客房价格" width="150">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.rtprice }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="修改信息">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="primary"
                        @click="modifyRoomTypeInformation(scope.row.rtid)">更改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>


         <!-- 修改信息对话框 -->
         <el-dialog
        title="修改客房信息"
        :visible.sync="modifyVisible"
        width="50%">
            <!-- 表单主题 -->
            <el-form :model="modifyInformation[0]" ref="modifyInformationRef" label-width="70px">
                <el-form-item label="客房ID">
                    <el-input v-model="modifyInformation[0].rtid" disabled></el-input>
                </el-form-item>

                <el-form-item label="客房名称">
                    <el-input v-model="modifyInformation[0].rtname"></el-input>
                </el-form-item>

                <el-form-item label="客房价格">
                    <el-input v-model="modifyInformation[0].rtprice"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="modifyVisible = false">取 消</el-button>
                <el-button type="primary" @click="modify()">修 改</el-button>
            </span>
        </el-dialog>
<!-- 添加对话框 -->
        <el-dialog
        title="修改客房信息"
        :visible.sync="addVisible"
        width="50%">
            <!-- 表单主题 -->
            <el-form :model="addInformation" ref="modifyInformationRef" label-width="70px">

                <el-form-item label="客房ID">
                    <el-input v-model="addInformation.rtid"></el-input>
                </el-form-item>

                <el-form-item label="客房名称">
                    <el-input v-model="addInformation.rtname"></el-input>
                </el-form-item>

                <el-form-item label="客房价格">
                    <el-input v-model="addInformation.rtprice"></el-input>
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
            modifyInformation:[
                {
                    rtid:'',
                    rtname:'',
                    rtprice:''
                }
            ],
            addInformation:{
                rtid:'',
                rtname:'',
                rtprice:''
            },
            modifyVisible:false,
            addVisible:false
        }
    },
    methods:{
        async modifyRoomTypeInformation(rtid){
            //后端还未写接口，不知道怎么获取
            const {data:res} = await axios.get(`/roomtype/getAllroomType?sqlOptions= where RTid = ${rtid}`)
            console.log("modify中获取的用户信息为",res)
            this.modifyInformation = res.roomTypes
            
            this.modifyVisible = true
        },
        async getAllRoomType(){
            const {data:res} = await axios.get(`/roomtype/getAllroomType`)
            console.log("getAllRoomType的返回结果为：",res)
            this.roomTypeList = res.roomTypes
        },
        async modify(){

            //后端还未写接口，不知道怎么获取
            //console.log(`/roomtype/updateRoomType?operatorid=${this.$store.state.Sid}&RTid=${this.modifyInformation[0].rtid}&RTname=${this.modifyInformation[0].rtname}&RTprice=${this.modifyInformation[0].rtprice}`)
            const {data:res} = await axios.post(`/roomtype/updateRoomType?operatorid=${this.$store.state.Sid}&RTid=${this.modifyInformation[0].rtid}&RTname=${this.modifyInformation[0].rtname}&RTprice=${this.modifyInformation[0].rtprice}`)
            console.log("注册修改的结果为:",res)
            if(res.status == 200)
            {
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
                this.modifyVisible = false;
                this.getAllRoomType()
            }
        },
        async add(){
            // console.log(`/roomtype/insertRoomType?operatorid=${this.$store.state.Sid}&RTid=${this.addInformation.rtid}&RTname=${this.addInformation.rtname}&RTprice=${this.addInformation.rtprice}`)
            const {data:res} = await axios.post(`/roomtype/insertRoomType?operatorid=${this.$store.state.Sid}&RTid=${this.addInformation.rtid}&RTname=${this.addInformation.rtname}&RTprice=${this.addInformation.rtprice}`)
            console.log("添加客房信息的结果为:",res)
            if(res.status == 200)
            {
                this.$message({
                    message: '添加成功',
                    type: 'success'
                });
                this.addVisible = false;
                this.getAllRoomType()
            }
        }
    },
    created(){
        this.getAllRoomType()
    }
}

</script>

<style lang="less" scoped>

</style>