<script setup>

import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {useTokenStore} from "@/stores/token";
import {ElMessage, ElMessageBox} from "element-plus";
import {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  listEmployeesService
} from "@/api/user.js";
import {  ref } from 'vue'

const searchEmployeeCode = ref('');
const usermibun = ref('');
const mibunCategories = ref([
  { label: '営業', value: '営業' },
  { label: '総務', value: '総務' },
  { label: '管理者', value: '管理者' }
]);

const employeeData = ref([]);
const visibleDrawer = ref(false);
const drawerTitle = ref('');
const employeeModel = ref({
  username: '',
  usernamekanji: '',
  usernamekana: '',
  usermibun: '',
  email: ''
});

const pageNum = ref(1);
const total = ref(20);
const pageSize = ref(5);

const onSizeChange = (size) => {
  pageSize.value = size;
  getEmployees();
};

const onCurrentChange = (num) => {
  pageNum.value = num;
  getEmployees();
};
// const listEmployees=async()=>{
//   const response=await listEmployeesService();
//   mibunCategories.value=response.data
// }
// listEmployees();
const getEmployees = async () => {
  const params = {
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    username: searchEmployeeCode.value?searchEmployeeCode.value:null,
    usermibun: usermibun.value?usermibun.value:null,
  };
    const response = await listEmployeesService(params);
    employeeData.value = response.data.items;
    total.value = response.data.total;
};
 getEmployees();


const saveEmployee = async () => {
  if (drawerTitle.value === '社員を追加') {
    const response = await addEmployee(employeeModel.value);
    if (response.data.success) {
      ElMessage.success('社員が正常に追加されました');
    } else {
      ElMessage.error('追加に失敗しました');
    }
  } else {
    const response = await updateEmployee(employeeModel.value);
    console.log('111'+response.data);
    if (response.data.success) {
      ElMessage.success('社員情報が更新されました');
    } else {
      ElMessage.error('更新に失敗しました');
    }
  }
  visibleDrawer.value = false;
  await getEmployees();
};

const resetSearch = () => {
  searchEmployeeCode.value = '';
  usermibun.value = '';
  getEmployees();
};

const showAddEmployeeDialog = () => {
  clearEmployeeFormData();
  drawerTitle.value = '社員を追加';
  visibleDrawer.value = true;
};

const showEditEmployeeDialog = (employeeData) => {
  employeeModel.value = { ...employeeData };
  drawerTitle.value = '社員情報を編集';
  visibleDrawer.value = true;
};

const confirmDeleteEmployee = async (id) => {
  await ElMessageBox.confirm('この社員を削除してもよろしいですか？', '警告', {
    confirmButtonText: 'はい',
    cancelButtonText: 'いいえ',
    type: 'warning',
  });
  const response = await deleteEmployee(id);
  if (response.data.success) {
    ElMessage.success('社員が削除されました');
  } else {
    ElMessage.error('削除に失敗しました');
  }
  await getEmployees();
};

const clearEmployeeFormData = () => {
  employeeModel.value = {
    username: '',
    usernamekanji: '',
    usernamekana: '',
    usermibun: '',
    email: ''
  };
};

</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>社員管理</span>
        <div class="extra">
          <el-button type="primary" @click="showAddEmployeeDialog">社員を追加</el-button>
        </div>
      </div>
    </template>
    <!-- 検索フォーム -->
    <el-form inline>
      <el-form-item label="社員コード：">
        <el-input v-model="searchEmployeeCode" placeholder="社員コードを入力してください"></el-input>
      </el-form-item>

      <el-form-item label="役職："  style="width: 200px;">
        <el-select placeholder="役職を選択してください" v-model="usermibun">
          <el-option v-for="mibun in mibunCategories"
                     :key="mibun.value"
                     :label="mibun.label"
                     :value="mibun.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getEmployees">検索</el-button>
        <el-button @click="resetSearch">リセット</el-button>
      </el-form-item>
    </el-form>
    <!-- 社員リスト -->
    <el-table :data="employeeData" style="width: 100%">
      <el-table-column prop="username" label="社員コード" width="180"></el-table-column>
      <el-table-column prop="usernamekanji" label="社員名（漢字）"></el-table-column>
      <el-table-column prop="usernamekana" label="社員名（かな）"></el-table-column>
      <el-table-column prop="usermibun" label="役職"></el-table-column>
      <el-table-column prop="email" label="メールアドレス"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button  @click="showEditEmployeeDialog(row)" type="primary" icon="el-icon-edit" circle>編集</el-button>
          <el-button  @click="confirmDeleteEmployee(row.id)" type="danger" icon="el-icon-delete" circle>削除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- ページネーション -->
    <el-pagination
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </el-card>

  <!-- 社員追加/編集ドロワー -->
  <el-drawer :title="drawerTitle" v-model="visibleDrawer" :direction="'rtl'" :size="'50%'">
    <el-form :model="employeeModel" label-width="120px">
      <el-form-item label="社員コード">
        <el-input v-model="employeeModel.username"></el-input>
      </el-form-item>
      <el-form-item label="社員名（漢字）">
        <el-input v-model="employeeModel.usernamekanji"></el-input>
      </el-form-item>
      <el-form-item label="社員名（かな）">
        <el-input v-model="employeeModel.usernamekana"></el-input>
      </el-form-item>
      <el-form-item label="役職">
        <el-input v-model="employeeModel.usermibun"></el-input>
      </el-form-item>
      <el-form-item label="メールアドレス">
        <el-input v-model="employeeModel.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveEmployee">保存する</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}


/* 抽屉样式 */
.avatar-uploader {
  /* 直接在需要穿透的选择器前使用 :deep() */
  :deep(.avatar) {
    width: 178px;
    height: 178px;
    display: block;
  }

  :deep(.el-upload) {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  :deep(.el-upload:hover) {
    border-color: var(--el-color-primary);
  }

  :deep(.el-icon.avatar-uploader-icon) {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
}

.button-center {
  display: flex;
  justify-content: center;
}

.editor {
  width: 100%;

  /* 对于嵌套的深层选择器也是同样的方式 */
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>