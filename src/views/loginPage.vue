<template>
  <div class="login-container">
    <el-form
        :model="ruleForm2"
        :rules="rules2"
        status-icon
        ref="ruleFormRef"
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-page"
    >
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <el-input
            type="text"
            v-model="ruleForm2.username"
            auto-complete="off"
            placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
            type="password"
            v-model="ruleForm2.password"
            auto-complete="off"
            placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" class="rememberme">
        记住密码
      </el-checkbox>
      <el-form-item style="width:100%;">
        <el-button
            type="primary"
            style="width:100%;"
            @click="handleSubmit"
            :loading="logining"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 确保所有 import 语句在这里
import { reactive, ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import { ElMessageBox } from "element-plus";
import axios from "axios";

export default {
  name: "loginPage",
  setup() {
    const router = useRouter();
    const logining = ref(false);
    const checked = ref(false);
    const ruleFormRef = ref(null); // 表单的引用
    const ruleForm2 = reactive({
      username: "",
      password: "",
    });
    const rules2 = reactive({
      username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    });

    const handleSubmit = () => {
      nextTick(() => {
        if (ruleFormRef.value) {
          ruleFormRef.value.validate((valid) => {
            if (valid) {
              logining.value = true;
              // 使用 axios 模拟发送请求
              axios
                  .post('/api/login', {
                    username: ruleForm2.username,
                    password: ruleForm2.password,
                  })
                  .then((response) => {
                    logining.value = false;
                    if (response.data.code === 200) {
                      sessionStorage.setItem('user', ruleForm2.username);
                      sessionStorage.setItem('token', response.data.data.token);
                      router.push({ path: '/indexPage' });
                    } else {
                      ElMessageBox.alert(response.data.message, '提示', {
                        confirmButtonText: '确定',
                      });
                    }
                  })
                  .catch((error) => {
                    logining.value = false;
                    console.error('登录请求失败', error);
                    ElMessageBox.alert('网络请求失败，请稍后再试', '错误', {
                      confirmButtonText: '确定',
                    });
                  });
            } else {
              console.log("验证失败");
            }
          });
        } else {
          console.error("ruleFormRef is null");
        }
      });
    };

    return {
      logining,
      ruleForm2,
      rules2,
      checked,
      handleSubmit,
      ruleFormRef,
    };
  },
};
</script>

