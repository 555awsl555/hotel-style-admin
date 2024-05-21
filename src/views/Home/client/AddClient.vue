<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>客户管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加客户</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
            <el-form :model="addInformation" ref="addInformationRef" label-width="70px">

                <el-form-item label="姓名">
                    <el-input v-model="addInformation.cname"></el-input>
                </el-form-item>

                <el-form-item label="身份证号">
                    <el-input v-model="addInformation.ccardId"></el-input>
                </el-form-item>

                <el-form-item label="电话">
                    <el-input v-model="addInformation.cphone"></el-input>
                </el-form-item>

                <el-form-item label="地址">
                    <el-input v-model="addInformation.caddr"></el-input>
                </el-form-item>

                <el-form-item label="折扣率">
                    <el-select v-model="addInformation.dgrade" placeholder="请选择折扣率">
                        <el-option
                        v-for="item in discountList"
                        :key="item.did"
                        :label="item.dratio"
                        :value="item.dgrade">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="add()">添 加</el-button>
        </el-card>
    </div>

    
</template>

<script>
import axios from 'axios'
export default{
    data(){
        return{
            addInformation:
                {
                    "cname": "",
                    "dgrade": "",
                    "ccardId": "",
                    // "cid": 2,
                    "cphone": "",
                    "caddr": ""
                }
            ,
            discountList:[
                {
                    "dgrade": 1,
                    "dratio": 1.0,
                    "did": 1
                }
            ],
        }
    },
    methods:{
        async getDiscount(){
            const {data:res} = await axios.get(`/discount/getdiscount`)
            this.discountList = res.discount
            console.log("discountList:",this.discountList)
        },
        //添加客户/user/insertclientinfo
        async add(){
            console.log("addInformation为:",this.addInformation)
            const {data:res} = await axios.post(`/user/insertclientinfo?operatorid=${this.$store.state.Sid}&Cname=${this.addInformation.cname}&Cphone=${this.addInformation.cphone}&Caddr=${this.addInformation.caddr}&Dgrade=${this.addInformation.dgrade}&CcardId=${this.addInformation.ccardId}`)
            console.log("添加客户的结果为:",res)

            if(res.status == 200)
            {
                this.$message({
                    message: '添加成功',
                    type: 'success'
                });
            }else{
                this.$message({
                    message: res.message,
                    type: 'error'
                });
            }

            // 清空对象
            this.addInformation=
            {
                 "cname": "",
                 "dgrade": "",
                 "ccardId": "",
                 // "cid": 2,
                 "cphone": "",
                 "caddr": ""
            }

        }
    },
    created(){
        this.getDiscount()
    }
}

</script>

<style lang="less" scoped>

</style>