<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>客户管理</el-breadcrumb-item>
            <el-breadcrumb-item>客户信息设置</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
<!-- 表格 -->
            <el-table :data="clientList" style="width: 100%">

                <el-table-column label="客户ID" width="150">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.cid}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="客户姓名" width="150">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.cname }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="客户身份证" width="150">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.ccardId }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="电话号码" width="150">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.cphone }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="居住地址" width="150">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.caddr }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="折扣等级" width="150">
                    <template slot-scope="scope">
                        <span style="">{{ scope.row.dgrade }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="更改折扣等级" width="80">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="primary"
                        @click="getModifyInformation(scope.row.cid)">更改</el-button>
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
                <el-form-item label="客户ID">
                    <el-input v-model="modifyInformation[0].cid" disabled></el-input>
                </el-form-item>

                <el-form-item label="客户姓名">
                    <el-input v-model="modifyInformation[0].cname" disabled></el-input>
                </el-form-item>

                <el-form-item label="折扣等级">
                    <el-select v-model="modifyInformation[0].dgrade" placeholder="请选择客房类型">
                        <el-option
                        v-for="item in discountList"
                        :key="item.dgrade"
                        :label="item.dgrade"
                        :value="item.dgrade">
                        <span style="float: left">{{ item.dgrade }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">折扣率：{{ item.dratio }}</span>
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
            discountList:[
                {
                    "dgrade": 1,
                    "dratio": 1.0,
                    "did": 1
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
            modifyInformation:[
                {
                    "cname": "王家晨",
                    "dgrade": 1,
                    "ccardId": "331003200410160000",
                    "cid": 2,
                    "cphone": "18868436522",
                    "caddr": "杭电618"
                }
            ],
            modifyVisible:false,
            addVisible:false

        }
    },
    methods:{
        //1.获取所有折扣/discount/getdiscount
        async getDiscount(){
            const {data:res} = await axios.get(`/discount/getdiscount`)
            this.discountList = res.discount
            console.log("discountList:",this.discountList)
        },
        //2.获取所有客户信息/discount/getClient
        async getClient(){
            const {data:res} = await axios.get(`/discount/getClient`)
            this.clientList = res.clients
            console.log("clientList:",this.clientList)
        },
        //3.根据id修改客户的折扣信息/discount/updateClientdiscount?operatorid=${this.$store.state.Sid}&Cid=${this.modifyInformation[0].cid}&Dgrade=${this.modifyInformation[0].dgrade}
        async modify(){
            // console.log(this.modifyInformation)
            const {data:res} = await axios.post(`/discount/updateClientdiscount?operatorid=${this.$store.state.Sid}&Cid=${this.modifyInformation[0].cid}&Dgrade=${this.modifyInformation[0].dgrade}`)
            console.log("信息修改的结果为:",res)
            if(res.status == 200)
            {
                this.$message({
                    message: res.message,
                    type: 'success'
                });
                this.modifyVisible = false;
                this.getClient();
            }
        },
        //3.1获取被修改客户的信息数据/discount/getClient?sqloptions=where cid=${cid}
        async getModifyInformation(cid){
            const {data:res} = await axios.get(`/discount/getClient?sqloptions=where cid=${cid}`)
            console.log("getModifyInformation中获取的用户信息为",res)
            this.modifyInformation = res.clients
            this.modifyVisible = true
        }
    },
    created(){
        this.getDiscount()
        this.getClient()
    }
}

</script>

<style lang="less" scoped>

</style>