<template>
    <div class="wrapper" >
        <div class="left">
            <div class="wechat">
                <img src="..//assets/oldCode.jpg" alt="">
                <div style="display: flex;justify-content: space-between;">
                    <div style="width:1.3rem"><el-input v-model="allData.inputValue" placeholder="输入验证码" /></div>
                    <el-button type="primary" @click="showAll">展示全部</el-button>
                </div>
            </div>
        </div>
        <div class="box">
            <div class="tip_wrapper">
                <div class="tip_box">{{`${allData.date} 更新 10个 免费ChatGPT账号`}}</div>
                <div class="tip_box">由于使用人数过多 只展示 5 个</div>
                <div class="tip_tip">关注左侧二维码；回复【chatgpt账号】即可展示全部</div>
            </div>
            <div  class="tabel_box">
                <el-table 
                    :data="allData.accountArr" 
                    style="width: 100%"
                    :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                >
                    <el-table-column prop="account" align="center"  label="账号" width="300" />
                    <el-table-column align="center" width="140" label="操作">
                        <template  #default="scope">
                            <el-button 
                                size="small"
                                type="primary"
                                @click="handleEdit(scope.$index, scope.row.account)"
                            >
                                复制账号
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="password" align="center"  label="密码" width="160" />
                    <el-table-column align="center" width="140" label="操作">
                        <template #default="scope">
                            <el-button 
                                size="small"
                                type="primary"
                                @click="handleEdit(scope.$index, scope.row.password)"
                            >
                                复制密码
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            
            <div class="tip_wrapper">
                <div class="tip_box">{{`${allData.date} 更新 10个 免费OpenAI API key`}}</div>
                <div class="tip_box">由于使用人数过多 只展示 5 个</div>
                <div class="tip_tip">关注左侧二维码；回复【chatgpt账号】即可展示全部</div>
            </div>
            <div  class="tabel_box">
                <el-table 
                    :data="allData.apiArr" 
                    style="width:100%"
                    :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                >
                    <el-table-column prop="date" align="center"  label="Keys" width="600" />

                    <el-table-column align="center" width="140" label="操作">
                        <template #default="scope">
                            <el-button 
                                size="small"
                                type="primary"
                                @click="handleEdit(scope.$index, scope.row.date)"
                            >
                                复制 key
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref,reactive } from 'vue'
import {getApi,getAccount} from '~/api/manager.js'
let allData = reactive({
    accountArr:[],// 账户密码
    apiArr:[], //api 的数据
    date: new Date(),
    inputValue:'',
    showNum:5
})
const date = new Date();
const year = date.getFullYear(); // 获取当前年份
const month = date.getMonth() + 1; // 获取当前月份（注意返回值范围是 0~11，因此需要加 1）
const day = date.getDate(); // 获取当前日份
allData.date = `${year}-${month}-${day}`
const getAccounts = () =>{
    getAccount().then((res) => {
        if(res.status === 200){
            const accountList = res.data.split('\r\n')
            console.log("🚀 ~ file: login.vue:68 ~ getAccount ~ accountList:", accountList)
            accountList.map((item,index)=>{
                if(allData.showNum<index+1) return
                let account_password = item.split('---')
                if(account_password.length == 2){
                    allData.accountArr.push({
                        account:account_password[0],
                        password:account_password[1],
                    })
                }
            })
            console.log("allData.accountArr",allData.accountArr)
        }
        
    }).catch((err)=>{
        console.log("失败了",err);
    })
    
}

const getApiKeys = ()=>{
    getApi().then((res)=>{
        if(res.status === 200){
            const arrList = res.data.split('\r\n')
            arrList.map((item,index)=>{
                if(allData.showNum<index+1) return
                if(item){
                    allData.apiArr.push({
                        date:item
                    })
                }
            })
            console.log(allData)
        }
    }).catch((err)=>{
        console.log("失败了",err);
    })
}

const initData = ()=>{
    getAccounts()
    getApiKeys()
}
initData()

const handleEdit = (index,rowDate) => {
    let oInput = document.createElement("input");
    oInput.value = rowDate;
    document.body.appendChild(oInput);
    oInput.select();
    document.execCommand("Copy");
    oInput.remove();
}

const showAll = ()=>{
    if(allData.inputValue === '9527'){
        allData.showNum = 10
        initData()
    }
}

</script>

<style scoped>
.wrapper{
    width: 100vw;
    display: flex;
    font-size: 0.01rem;
}
.left{
    width: 30%;
    display: flex;
    justify-content: center;
}
.wechat{
    position: fixed;
    top: 0.3rem;
}
.box{
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.tabel_box{
    /* margin: 0.2rem 0; */
    font-size: 12px;

}
::v-deep .el-table{
    width: 100%;
    font-size: 0.08rem;
}
::v-deep .el-button{
    font-size: 0.08rem;
}
.tip_wrapper{
    text-align: center;
    margin: 0.06rem 0;
}
.tip_box{
    font-size: 0.14rem;
    /* padding: 0.1rem 0.2rem; */
    color: rgb(66, 185, 131);
    margin-top: 0.1rem;
}
.tip_tip{
    color: red;
    font-size: 0.1rem;
}
</style>