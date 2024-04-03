<script setup>
import {ref, reactive, getCurrentInstance, toRefs} from "vue";
import {User,Lock} from '@element-plus/icons-vue';
import {userRegisterService,userLoginService} from "@/api/user.js";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";
import {useTokenStore} from "@/stores/token";

const isRegister=ref(false)


  const registerData=ref({
    username:'',
    password:'',
    rePassword:'',
  })
  const checkRePassword=(rule,value,callback)=>{
    if (value===''){
      callback(new Error('もう一度確認ください'))
    }else if (value!==registerData.value.password){
      callback(new Error('二回入力パスワード同じことが必要です'))
    }else {
      callback()
    }
  }
  const rules=reactive({
    username:[
      {required:true,message:'ユーザーを入力ください',trigger:'blur'},
      {min:1,max:20,message: '長さは一からに二十です',trigger: "blur"},
    ],
    password:[
        {required:true,message:'パスワードを入力ください',trigger:'blur'},
        {min:1,max:20,message: '長さは一からに二十です',trigger: "blur"},
    ],
    rePassword:[
      {validator:checkRePassword,trigger:'blur'}
    ],
  })

const register = async () => {
  const valid = await form.value.validate();
  if (valid) {
    try {
      const authHeader = 'Basic ' + btoa('user:40fe9023-5809-414a-8bf6-bd4a27b679a2');
      const result = await userRegisterService(registerData.value,authHeader);
      ElMessage.success(result.message ? result.message : '登録成功');
    } catch (error) {
      if (error.response) {
        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
        console.log(error.response.status);
        ElMessage.error(`错误: ${error.response.status} ${error.response.data.message}`);
      } else if (error.request) {
        // 请求已发出，但没有收到响应
        console.log(error.request);
        ElMessage.error('服务器没有响应，请稍后再试');
      } else {
        // 发送请求时出了点问题
        console.log('Error', error.message);
        ElMessage.error(`请求错误: ${error.message}`);
      }
    }
  }
};
const router = useRouter()
const tokenStore = useTokenStore();
const form = ref(null)
const login = async () => {
  // HM
  const valid = await form.value.validate();
  if (valid) {
    const result = await userLoginService(registerData.value);
    ElMessage.success(result.message ? result.message : '成功')
    tokenStore.setToken(result.data)
    router.push('/')
  }
}

const clearRegisterData = () => {
  registerData.value = {
    username: '',
    password: '',
    rePassword: ''
  }
}
  </script>
  <template>
   <el-row class="login-page">
     <el-col :span="12" class="bg"></el-col>
     <el-col :span="6" :offset="3" class="form">
       <!--注册表单-->

       <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerData" :rules="rules">
         <el-form-item>
           <h1>登録</h1>
         </el-form-item>
         <el-form-item prop="username">
           <el-input :prefix-icon="User" placeholder="ユーザー名入力ください" v-model="registerData.username"></el-input>
         </el-form-item>
         <el-form-item prop="password">
           <el-input :prefix-icon="Lock" type="password" placeholder="パスワード入力ください" v-model="registerData.password"></el-input>
         </el-form-item>
         <el-form-item prop="rePassword">
           <el-input :prefix-icon="Lock" type="password" placeholder="もう一度パスワード入力ください" v-model="registerData.rePassword"></el-input>
         </el-form-item>
         <el-form-item>
           <el-button class="el-button" type="primary" auto-insert-space @click="register">
             登録
           </el-button>
         </el-form-item>
         <el-form-item class="flex">
           <el-link type="info" :underline="false" @click="isRegister=false">
             戻る
           </el-link>
         </el-form-item>
         </el-form>
  <!--  ログイン表-->
         <el-form ref="form" size="large" autocomplete="off" v-else :model="registerData" :rules="rules">
           <el-form-item>
             <h1>ログイン</h1>
           </el-form-item>
           <el-form-item prop="username">
             <el-input :prefix-icon="User" placeholder="ユーザー名入力ください" v-model="registerData.username"></el-input>
           </el-form-item>
           <el-form-item prop="password">
             <el-input :prefix-icon="Lock" type="password" placeholder="パスワード入力ください" v-model="registerData.password"></el-input>
           </el-form-item>
           <el-form-item class="flex">
             <div class="flex">
               <el-checkbox>私を覚えています</el-checkbox>
               <el-link type="primary" :underline="false">パスワード忘れた</el-link>
             </div>
           </el-form-item>
           <el-form-item>
             <el-button class="el-button" type="primary" auto-insert-space @click="login">ログイン</el-button>
           </el-form-item>
           <el-form-item class="flex">
             <el-link type="info" :underline="false" @click="isRegister=true;clearRegisterData()" >登録</el-link>
           </el-form-item>
         </el-form>
     </el-col>
   </el-row>
  </template>
<style lang="scss" scoped>
/* 样式 */
.login-page {
  height: 100vh;
  display: flex;
  width: 100%; /* 根据需要调整宽度 */
  background-color: #fff;
  .bg {
    background: url('@/assets/logo.svg') no-repeat 60% center / 240px auto,
    url('@/assets/logo.svg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
