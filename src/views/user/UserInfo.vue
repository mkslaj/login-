<script setup>
import {ref} from 'vue'
import {useUserInfoStore} from "@/stores/userInfo";
import {userInfoUpdateService} from "@/api/user";
import {ElMessage} from "element-plus";

const userInfoStore = useUserInfoStore();


const userInfo = ref({
  ...userInfoStore.userInfo
})
const rules = {
  usernamekanji: [
    {required: true, message: '漢字を入力ください', trigger: 'blur'},
    {
      pattern: /^\S{2,10}$/,
      message: '名前は2-10桁の文字しかがありません',
      trigger: 'blur'
    }
  ],
  usernamekana: [
    {required: true, message: 'カタカナを入力ください', trigger: 'blur'},
    {
      pattern: /^\S{2,10}$/,
      message: '名前は2-10桁のカタカナしかがありません',
      trigger: 'blur'
    }
  ],
  usermibun: [
    {required: true, message: 'カタカナを入力ください', trigger: 'blur'},
    {
      pattern: /^\S{1,10}$/,
      message: '名前は1-10桁のカタカナしかがありません',
      trigger: 'blur'
    }
  ],
  email: [
    {required: true, message: 'メールアドレス入力ください', trigger: 'blur'},
    {type: 'email', message: 'メールのフォーマットが間違っています', trigger: 'blur'}
  ]
}

const updateUserInfo = () => {
  userInfoUpdateService(userInfo.value);
  ElMessage.success('成功')
  userInfoStore.setUserInfo(userInfo.value)
}
</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>基本资料</span>
      </div>
    </template>
    <el-row>
      <el-col :span="12">
        <el-form :model="userInfo" :rules="rules" label-width="100px" size="large">
          <el-form-item label="ユーザー">
            <el-input v-model="userInfo.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="漢字" prop="usernamekanji">
            <el-input v-model="userInfo.usernamekanji"></el-input>
          </el-form-item>
          <el-form-item label="カタカナ" prop="usernamekana">
            <el-input v-model="userInfo.usernamekana"></el-input>
          </el-form-item>
          <el-form-item label="身分" prop="usermibun">
            <el-input v-model="userInfo.usermibun"></el-input>
          </el-form-item>
          <el-form-item label="メール" prop="email">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateUserInfo">コミット</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>