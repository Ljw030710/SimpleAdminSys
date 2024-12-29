<template>
  <el-card class="box-card">
    <!-- 新增按钮 -->
    <el-row class="toolbar">
      <el-button size="small" type="primary" @click="add">新增活动</el-button>
    </el-row>

    <!-- 对话框 -->
    <el-dialog :title="title" v-model="dialogFormVisible" width="35%">
      <el-form :model="form" :rules="rules" ref="form" label-width="80px">
        <el-form-item label="ID" hidden>
          <el-input v-model="form.id" readonly></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input-number
              v-model="form.age"
              :min="0"
              :max="200"
              placeholder="请输入年龄"
              style="width: 100%;"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="form.gender" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submit()">提交</el-button>
      </div>
    </el-dialog>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" border stripe>
      <el-table-column type="index" label="#" width="50"></el-table-column>
      <el-table-column property="name" label="姓名" width="150"></el-table-column>
      <el-table-column property="age" label="年龄" width="80"></el-table-column>
      <el-table-column property="gender" label="性别" width="80"></el-table-column>
      <el-table-column property="email" label="邮箱"></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="scope">
          <el-button
              size="small"
              type="success"
              icon="el-icon-edit"
              @click="edit(scope.$index, scope.row)"
          >
            编辑
          </el-button>
          <el-button
              size="small"
              type="danger"
              icon="el-icon-delete"
              @click="remove(scope.$index)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";

export default {
  name: "activityPage",
  setup() {
    const dialogFormVisible = ref(false); // 对话框显示状态
    const title = ref(""); // 对话框标题
    const form = reactive({
      id: null,
      name: "",
      age: null,
      gender: "",
      email: "",
    }); // 表单数据
    const tableData = ref([]); // 表格数据

    const rules = {
      name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
      age: [
        { required: true, message: "请输入年龄", trigger: "blur" },
        { type: "number", message: "年龄必须为数字值", trigger: "blur" },
        { pattern: /^(0|[1-9]\d?|200)$/, message: "范围在0-200", trigger: "blur" },
      ],
      gender: [{ required: true, message: "请选择性别", trigger: "change" }],
      email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
    };

    // 获取活动数据
    const getTableData = async () => {
      try {
        const response = await axios.get('/api/activities');
        tableData.value = response.data.data;
      } catch (error) {
        ElMessage.error('获取活动数据失败！');
      }
    };

    // 表单重置
    const resetForm = () => {
      form.id = null;
      form.name = "";
      form.age = null;
      form.gender = "";
      form.email = "";
    };

    // 新增
    const add = () => {
      resetForm();
      title.value = "新增活动";
      dialogFormVisible.value = true;
    };

    // 删除
    const remove = async (index) => {
      const activityId = tableData.value[index].id;
      try {
        await axios.delete(`/api/activity/${activityId}`);
        tableData.value.splice(index, 1); // 删除表格数据
        ElMessage.success("删除成功！");
      } catch (error) {
        ElMessage.error("删除失败！");
      }
    };

    // 编辑
    const edit = (index, row) => {
      resetForm();
      Object.assign(form, row); // 将选中行的数据复制到表单
      title.value = "修改活动";
      dialogFormVisible.value = true;
    };

    // 提交表单
    const submit = async () => {
      if (!form.name || !form.age || !form.gender || !form.email) {
        ElMessage.warning("请完整填写表单！");
        return;
      }

      if (form.id === null) {
        // 新增
        try {
          const response = await axios.post('/api/activity', form);
          tableData.value.push(response.data.data);
          ElMessage.success("新增成功！");
        } catch (error) {
          ElMessage.error("新增失败！");
        }
      } else {
        // 修改
        try {
          const response = await axios.put(`/api/activity/${form.id}`, form);
          const index = tableData.value.findIndex(item => item.id === form.id);
          if (index !== -1) {
            tableData.value[index] = response.data.data;
            ElMessage.success("修改成功！");
          }
        } catch (error) {
          ElMessage.error("修改失败！");
        }
      }
      dialogFormVisible.value = false; // 关闭对话框
    };

    // 获取初始数据
    getTableData();

    return {
      dialogFormVisible,
      title,
      form,
      tableData,
      rules,
      add,
      remove,
      edit,
      submit,
    };
  },
};
</script>


<style scoped>
/* 卡片布局 */
.box-card {
  margin: 20px;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

/* 工具栏样式 */
.toolbar {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}

/* 表单样式 */
.el-form-item {
  margin-bottom: 15px;
}

/* 对话框样式 */
.dialog-footer {
  text-align: right;
  padding: 10px 0;
}

/* 表格样式 */
.el-table {
  border: 1px solid #ebeef5;
  border-radius: 8px;
}

/* 操作按钮 */
.el-button {
  margin-right: 10px;
}

.el-button:last-child {
  margin-right: 0;
}

.el-button:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>

