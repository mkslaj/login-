<script setup>
import {ref} from 'vue'
import {userPwdUpdateService} from "@/api/user";
import {ElMessage} from "element-plus";


const pwdData = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})

const updatePwdData = async () => {
  await userPwdUpdateService(pwdData.value);
  ElMessage.success('成功')
  pwdData.value = {
    old_pwd: '',
    new_pwd: '',
    re_pwd: ''
  }
}
const checkRePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('パスワードが確認ください'))
  } else if (value !== pwdData.value.new_pwd) {
    callback(new Error('二回を入力パスワードが違います'))
  } else {
    callback()
  }
}
const rules = {
  old_pwd: [
    {required: true, message: '元のパスワードが入力ください', trigger: 'blur'},
    {min: 5, max: 16, message: '长度为5-16位', trigger: 'blur'},
  ],
  new_pwd: [
    {required: true, message: '新しいパスワードが入力ください', trigger: 'blur'},
    {min: 5, max: 16, message: '长度为5-16位', trigger: 'blur'},
  ],
  re_pwd: [
    {required: true, message: '新しいパスワードが確認ください', trigger: 'blur'},
    {validator: checkRePassword, trigger: 'blur'},
  ]
}
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>パスワードをリセット</span>
      </div>
    </template>
    <el-row>
      <el-col :span="12">
        <el-form :model="pwdData" :rules="rules" label-width="100px" size="large">
          <el-form-item label="元のパスワード" prop="old_pwd">
            <el-input v-model="pwdData.old_pwd" type="password" placeholder="元のパスワードを入力ください"></el-input>
          </el-form-item>
          <el-form-item label="新しいパスワード" prop="new_pwd">
            <el-input v-model="pwdData.new_pwd" type="password" placeholder="新しいパスワードを入力ください"></el-input>
          </el-form-item>
          <el-form-item label="新しいパスワードが確認ください" prop="re_pwd">
            <el-input v-model="pwdData.re_pwd" type="password" placeholder="新しいパスワードが確認ください"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updatePwdData">コミット</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>