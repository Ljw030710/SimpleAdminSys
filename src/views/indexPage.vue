<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse ? '64px' : '240px'" class="custom-aside">
      <div class="logo" v-if="!isCollapse">
        <h3><i class="el-icon-eleme"></i> 西湖论剑管理系统</h3>
      </div>
      <div class="logo" v-else>
        <h3><i class="el-icon-eleme"></i></h3>
      </div>
      <!-- 菜单 -->
      <el-menu
          :default-active="$route.path"
          router
          :collapse="isCollapse"
          class="custom-menu"
      >
        <el-submenu index="1">
          <template #title>
            <i class="el-icon-s-tools"></i>
            <span>后台管理</span>
          </template>
          <el-menu-item index="/activityPage">
            <i class="el-icon-user"></i>
            <span>活动管理</span>
          </el-menu-item>
          <el-menu-item index="/activityAdd">
            <i class="el-icon-edit"></i>
            <span>添加活动</span>
          </el-menu-item>
          <el-menu-item index="/activityUpdate">
            <i class="el-icon-edit"></i>
            <span>修改活动</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <!-- 主容器 -->
    <el-container>
      <!-- 顶部栏 -->
      <el-header class="custom-header">
        <div class="header-left">
          <div class="trigger" @click="toggleCollapse">
            <i class="el-icon-s-fold" v-if="!isCollapse"></i>
            <i class="el-icon-s-unfold" v-else></i>
          </div>
        </div>
        <div class="header-right">
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-avatar
                  size="medium"
                  src="https://cube.elemecdn.com/e/fd/0fc8c3a7dc6fbbccdf67f8852ec4png.png"
              ></el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 主内容区域 -->
      <el-main class="custom-main">
        <el-card class="main-card">
          <router-view></router-view> <!-- 用于渲染子路由 -->
        </el-card>
      </el-main>

      <!-- 底部栏 -->
      <el-footer class="custom-footer">© 2024 西湖论剑管理系统</el-footer>
    </el-container>
  </el-container>
</template>


<script>
import { ref } from "vue";

export default {
  name: "IndexPage",
  setup() {
    const isCollapse = ref(false); // 控制侧边栏展开/收起

    const toggleCollapse = () => {
      isCollapse.value = !isCollapse.value;
    };

    return {
      isCollapse,
      toggleCollapse,
    };
  },
};
</script>

<style scoped>
/* 顶部栏样式 */
.custom-header {
  background-color: #ffffff; /* 顶部背景颜色 */
  border-bottom: 1px solid #ebeef5;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.header-left .trigger {
  cursor: pointer;
  font-size: 20px;
  color: #606266;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.search-input {
  width: 200px;
}

.badge {
  cursor: pointer;
  font-size: 20px;
  color: #b4c0d8;
}

/* 侧边栏样式 */
.custom-aside {
  background-color: #88aacc; /* 深蓝色背景 */
  color: #121111;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
}

.custom-aside .logo {
  background-color: #84b0da;
  color: #070707;
  text-align: center;
  width: 100%;
}

.custom-aside .logo h3 {
  margin: 0;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
}

/* 菜单样式 */
.custom-menu {
  border-right: 0;
  width: 100%;
}

.custom-menu ::v-deep(.el-menu-item) {
  color: #100f0f;
}

.custom-menu ::v-deep(.el-menu-item:hover) {
  background-color: #79a8d2;
}

.custom-menu ::v-deep(.el-submenu__title) {
  color: #ffffff;
}

/* 主内容区域样式 */
.custom-main {
  background-color: #f5f5f5; /* 浅灰色背景 */
  padding: 20px;
}

.main-card {
  padding: 20px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
}

/* 底部栏样式 */
.custom-footer {
  background-color: #ffffff;
  border-top: 1px solid #ebeef5;
  text-align: center;
  padding: 10px 0;
}
</style>

