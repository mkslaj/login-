<script setup>
import {ref, reactive, getCurrentInstance, toRefs} from "vue";
import {User,Lock} from '@element-plus/icons-vue';
import axios from "axios";
import {useRouter} from "vue-router";


const router = useRouter();
const user =reactive(
    {
      name:'',
      password:''
    }
)
const rules=reactive({
  name:[
    {required:true,message:'ユーザーを入力ください',trigger:'blur'},
    {min:1,max:20,message: '長さは一からに二十です',trigger: "blur"},
  ],
})
const loginError=reactive({value:false});
const login=async ()=>{
      try {
        const response = await
            axios.post('http://localhost:8080/api/login', {
              name: user.name,
              password: user.password,
            });
        if (response.data === 1)
        {
          await router.push(
              '/kanri');
        }
        else if (response.data===0)
        {
          loginError.value=true;
        }
      }
        catch(error){
        console.error("ログイン失敗しました",error);
        loginError.value=true;
      }

}
</script>
<template>
  <div id="app">
    <div style="width: 500px; margin: 150px auto">
      <h1 style="text-align: center; margin-bottom: 30px">ログイン</h1>
      <el-form :model="user" :rules="rules" label-width="120px">
        <el-form-item label="ユーザー" prop="name">
          <el-input v-model="user.name"  :prefix-icon="User">
          </el-input>
        </el-form-item>
        <el-form-item label="パスワード" prop="password">
          <el-input v-model="user.password" type="password" :prefix-icon="Lock">
          </el-input>
        </el-form-item>
        <el-button type="primary" style="width: 100%" @click="login">ログイン</el-button>
      </el-form>
    </div>
  </div>
</template>
<style>
#app{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>
