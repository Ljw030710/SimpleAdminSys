<template>
  <div class="login-page">
    <h2>管理员登录</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="principal">用户名</label>
        <input
            type="text"
            id="principal"
            v-model="principal"
            placeholder="请输入用户名"
            required
        />
      </div>

      <div class="form-group">
        <label for="credentials">密码</label>
        <input
            type="password"
            id="credentials"
            v-model="credentials"
            placeholder="请输入密码"
            required
        />
      </div>

      <div class="form-group">
        <label for="sysType">系统类型</label>
        <select v-model="sysType" required>
          <option value="" disabled>请选择系统类型</option>
          <option value="0">普通用户</option>
          <option value="1">管理员</option>
        </select>
      </div>

      <button type="submit" :disabled="loading">登录</button>

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import adminService from '@/requests/adminService';

export default {
  name: 'loginPage',
  setup() {
    const router = useRouter();
    const principal = ref('');
    const credentials = ref('');
    const sysType = ref(null); // 默认值为 null
    const loading = ref(false);
    const errorMessage = ref('');

    const handleLogin = async () => {
      loading.value = true;
      errorMessage.value = '';
      try {
        const response = await adminService.login({
          principal: principal.value,
          credentials: credentials.value,
          sysType: sysType.value,
        });

        if (response.data.success == true) {
          // 登录成功，跳转到首页
          console.log(response)
          localStorage.setItem("accessToken", response.data.data.accessToken);
          router.push({ path: '/indexPage' });
        } else {
          errorMessage.value = response.message || '登录失败，请重试';
        }
      } finally {
        loading.value = false;
      }
    };

    return {
      principal,
      credentials,
      sysType,
      loading,
      errorMessage,
      handleLogin,
    };
  },
};
</script>

<style scoped>
/* 样式可以根据需求自定义 */
.login-page {
  width: 300px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 15px;
}

input,
select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
