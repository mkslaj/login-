<script setup>
import {ref,reactive} from "vue";
import {User,Lock} from '@element-plus/icons-vue'

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
</script>
<template>
  <div>
    <div style="width: 500px; margin: 150px auto">
      <h1 style="text-align: center; margin-bottom: 30px">ログイン</h1>
      <el-form :model="user" :rules="rules" label-width="120px">
        <el-form-item label="ユーザー" prop="name">
          <el-input v-model:label="user.name"  :prefix-icon="User">
          </el-input>
        </el-form-item>
        <el-form-item label="パスワード" prop="password">
          <el-input v-model:label="user.password" :prefix-icon="Lock">
          </el-input>
        </el-form-item>
        <el-button type="primary" style="width: 100%">ログイン</el-button>
      </el-form>
    </div>
  </div>
</template>
<style>

</style>