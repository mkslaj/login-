
<script setup>
import {
  CaretBottom,
  Crop,
  EditPen,
  Management,
  Promotion,
  SwitchButton,
  User,
  UserFilled
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import {userInfoService} from "@/api/user";
import {useUserInfoStore} from "@/stores/userInfo";
import {useRouter} from "vue-router";
import {ElMessage, ElMessageBox} from "element-plus";
import {useTokenStore} from "@/stores/token";

const userInfoStore = useUserInfoStore();
const getUserInfo = async () => {
  const result = await userInfoService();
  userInfoStore.setUserInfo(result.data)
}
getUserInfo()

const router = useRouter();
const tokenStore = useTokenStore();
const handleCommand = (command) => {
  if (command === 'logout') {
    ElMessageBox.confirm(
        'サインアウトを確認しますか？',
        'ご注意',
        {
          confirmButtonText: '确认',
          cancelButtonText: 'キャンセル',
          type: 'warning'
        }
    ).then(
        async () => {
          // clear data in pinia
          userInfoStore.removeUserInfo()
          tokenStore.removeToken()
          ElMessage.success("サインアウト成功")
          await router.push('/login')
        }
    )
  } else {
    router.push('/user/' + command)
  }
}
</script>

<template>
  <el-container class="layout-container">
    <!-- 左侧菜单 -->
    <el-aside width="200px">
      <div class="el-aside__logo"></div>
      <el-menu active-text-color="#ffd04b" background-color="#232323" text-color="#fff"
               router>
        <el-menu-item index="/article/manage">
          <el-icon>
            <Promotion/>
          </el-icon>
          <span>人物管理</span>
        </el-menu-item>
        <el-sub-menu>
          <template #title>
            <el-icon>
              <UserFilled/>
            </el-icon>
            <span>個人情報</span>
          </template>
          <el-menu-item index="/user/info">
            <el-icon>
              <User/>
            </el-icon>
            <span>基本資料</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon>
              <Crop/>
            </el-icon>
            <span>トプ画更新</span>
          </el-menu-item>
          <el-menu-item index="/user/resetPassword">
            <el-icon>
              <EditPen/>
            </el-icon>
            <span>パスワードをリセット</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <!-- 右侧主区域 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <div>社員：<strong>{{ userInfoStore.userInfo.usernamekanji }}</strong></div>
        <el-dropdown placement="bottom-end" @command="handleCommand">
                    <span class="el-dropdown__box">
                        <el-avatar :src="userInfoStore.userInfo.usersyashin?userInfoStore.userInfo.usersyashin:avatar"/>
                        <el-icon>
                            <CaretBottom/>
                        </el-icon>
                    </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="info" :icon="User">基本资料</el-dropdown-item>
              <el-dropdown-item command="avatar" :icon="Crop">スタッフ更新</el-dropdown-item>
              <el-dropdown-item command="resetPassword" :icon="EditPen">パスワードをリセット</el-dropdown-item>
              <el-dropdown-item command="logout" :icon="SwitchButton">サインアウト</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <!-- 中间区域 -->
      <el-main>
        <router-view/>
      </el-main>
      <!-- 底部区域 -->
      <el-footer>Wisdom-Solution</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  .el-aside {
    background-color: #232323;

    &__logo {
      height: 120px;
      background: url('@/assets/logo.svg') no-repeat center / 120px auto;
    }

    .el-menu {
      border-right: none;
    }
  }

  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>