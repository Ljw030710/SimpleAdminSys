<template>
  <div class="box">
    <div class="header">
      <h1>精彩活动</h1>
    </div>
    <div class="center">
      <div class="container-box">
        <div class="common-container">
          <el-tabs @tab-click="handleTabClick" v-model="activeName" class="demo-tabs" stretch>
            <!--            <el-tab-pane label="全部" name="all"  @tab-click="handleClick" stretch >
                          <ActivityCard  tag=0 />
                        </el-tab-pane>-->
            <el-tab-pane v-for="tag in tagList" :label="tag.value.tagName" :name="tag.value.tagId">

            </el-tab-pane>

            <div class="card-container" v-if="show">
              <el-card class="card" v-for="(item, index) in activityList.value" :key="index">
                <el-row>
                  <el-col :span="10" class="card-left">
                    <img class="cover mouse" :src="item.pic" @click="enter"/>
                    <div class="overlay mouse" @click="enter(item)">
                      <h2>· 活动 {{ item.time }} 开始</h2>
                    </div>
                    <div class="overlay1 mouse">
                      <div class="bottom-right">
                        <p>{{ item.subscriberCount }} 人已报名</p>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="14" class="card-right">
                    <h2 class="card-title mouse">{{ item.name }}</h2>
                    <div class="card-tag mouse">
                      <el-tag  type="warning" round>活动</el-tag>{{ "\xa0" }}
                      <el-tag type="primary" round>{{ item.tagName }}</el-tag>
                      <!-- <el-tag
                        v-for="item in items"
                        :key="item.label"
                        :type="item.type"
                        effect="light"
                        round
                      >
                        {{ item.label }}
                      </el-tag> -->
                    </div>
                    <p class="card-describe">{{ item.content }}</p>
                    <span class="card-position"><el-icon :size="15"><Location /></el-icon> {{ item.address }}</span>
                    <div style="display: flex;">
                      <el-button class="card-but2" round @click="enter(item)">查看活动</el-button>
                      <!--            <el-button class="card-but" round><el-icon :size="7.5"><Plus /></el-icon>{{ "\xa0" }}立即预约</el-button>-->
                    </div>
                    <el-button @click="() => submitUpDate(item)" >修改</el-button>
                    <el-button @click="() => submitDelete(item)" >删除</el-button>
                  </el-col>
                </el-row>
              </el-card>
            </div>
            <div v-else>
              <ActivityCard :act="activityList"></ActivityCard>
            </div>

            <el-pagination style="align-content: center;justify-content: center"
                           v-model:current-page="currentPage"
                           :page-size="pageSize"
                           :total="totalActivities"
                           @current-change="handlePageChange"
                           layout="prev, pager, next"
            />
          </el-tabs>
        </div>
      </div>
    </div>
    <el-button class="foot" @click="submitBack">返回</el-button>
  </div>
</template>

<script setup>
import { nextTick,ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ActivityCard from '@/components/ActivityCard.vue';
import actStore from "@/store/actStore";
import activityService from "@/requests/activityService";
import adminService from "@/requests/adminService";
const newActStore = actStore();

const activeName = ref(1)

const tagList = toRefs(newActStore.getTag());

const show = ref(true);

const currentPage = ref(1);
const pageSize = ref(4);
const totalActivities = ref(0);

const { setActivity } = actStore();

const activityList = toRefs(newActStore.getActivity());
// activityList computer 按照activityId排序
const sortedActivityList = computed(() => {
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
});

onMounted(async () => {
  console.log('3.-组件挂载到页面之后执行-------onMounted')
  currentPage.value = 1;

  const res = await activityService.getActivityTagList();
  if(res.data.success){
    newActStore.setTag(res.data.data);
    tagList.value = res.data.data;
  }

  const res1 = await activityService.getActivityInfo({
    pageDTO: {
      pageNum: currentPage.value,
      pageSize: pageSize.value
    },
    tagId: activeName.value
  });
  if (res1.data.success) {
    show.value = false;
    newActStore.setActivity(res1.data.data.list);
    activityList.value = res1.data.data.list;
    activityList.value =   (activityList.value.sort((a, b) => a.activityId - b.activityId));
    totalActivities.value = res1.data.data.total;

    await nextTick(
        () => {
          show.value = true;
        }
    );
  }
})
const submitBack = () => {
  router.push("/indexPage");
};
const handleTabClick = async (tab) => {
  console.log(tab)
  currentPage.value = 1;

  const res = await activityService.getActivityInfo({
    pageDTO: {
      pageNum: currentPage.value,
      pageSize: pageSize.value
    },
    tagId: tab.props.name
  });
  if (res.data.success) {
    newActStore.setActivity(res.data.data);
    activityList.value = res.data.data.list;
    activityList.value =   (activityList.value.sort((a, b) => a.activityId - b.activityId));
    totalActivities.value = res.data.data.total;

    await nextTick();
  }
};

const handlePageChange = async (page) => {
  show.value = false;
  currentPage.value = page;
  console.log(page)
  const res = await activityService.getActivityInfo({
    pageDTO: {
      pageNum: currentPage.value,
      pageSize: pageSize.value
    },
    tagId: activeName.value
  });
  if (res.data.success) {
    newActStore.setActivity(res.data.data);
    activityList.value = res.data.data.list;
    activityList.value =   (activityList.value.sort((a, b) => a.activityId - b.activityId));
    totalActivities.value = res.data.data.total;

    await nextTick(
        show.value = true
    );
  }

  // Add logic to fetch or display activities for the current page
};

import {watch} from "vue";
import {ElMessage} from "element-plus";

watch(() => activeName.value, async (newVal, oldVal) => {
  console.log('activeName changed', newVal, oldVal)
  currentPage.value = 1;

  const res = await activityService.getActivityInfo({
    pageDTO: {
      pageNum: currentPage.value,
      pageSize: pageSize.value
    },
    tagId: activeName.value
  });
  if (res.data.success) {
    newActStore.setActivity(res.data.data);
    activityList.value = res.data.data.list;
    activityList.value =   (activityList.value.sort((a, b) => a.activityId - b.activityId));
    totalActivities.value = res.data.data.total;

    await nextTick();
  }
})

const toggleReserve = async (activityId, item) => {
  // Add logic to toggle the reservation status of the activity
  show.value = false;
  console.log(activityId);
  item.isEnroll = !item.isEnroll;

  const res = await activityService.joinActivity(activityId);
  if (res.data.success) {
    ElMessage.success('操作成功');
  }
  else {
    ElMessage.error('操作失败');
  }
  await nextTick(
      show.value = true
  );
};

const router = useRouter();
const enter = (item) => {
  console.log(item)
  router.push({path: '/activityDetail', query: {activityId: item.activityId}});
};
const submitUpDate = (item) => {
  router.push({path: '/activityUpdate'});
  console.log(item,'item')
  setActivity({
    activityId: item.activityId,
    name: item.name,
    address: item.address,
    tagName: item.tagName,
    time: item.time,
    pic: item.pic,
    content: item.content,
    subscriberCount: item.subscriberCount,
    isEnroll: item.isEnroll
  })
}
const submitDelete = async (item) => {
  show.value = false;
  console.log(item)
  const res = await adminService.deleteActivity({ activityId:  item.activityId});
  if (res.data.success) {
    ElMessage.success('删除成功');
  }
  else {
    ElMessage.error('删除失败');
  }
  await nextTick(
      show.value = true
  );
}

</script>
<style scoped lang='less'>
/* 整体背景设置 */
.box {
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position-y: bottom;
}

/* 标题样式 */
.header {
  h1 {
    position: absolute;
    left: 20%;
    top: 25%;
    font-size: 0.7rem;
    color: #fff;
  }
}

/* Banner 图片 */
.banner-img {
  width: 100%;
  height: 4rem;
}

/* 页脚 */
.foot {
  position: relative;
  bottom: 0;
}

/* 内容区域 */
.center {
  padding: 1rem 2rem;
}

.container-box {}

/* 通用容器样式 */
.common-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #2d3c7033;
  border-radius: 30px;
  padding: 1rem;
}

/* 主要内容区 */
.center-container {
  height: 100%;
  width: 100%;
  padding-bottom: 20px;
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position-y: bottom;
}

/* 标题 */
.title {
  height: 1rem;
  position: relative;
  line-height: 1rem;
  padding-left: 0.5rem;
  font-weight: 700;
  font-size: 2rem; /* 增大标题字体 */
  display: flex;
  margin-bottom: 1rem; /* 增大标题下方的间距 */
  color: #222;
  background: linear-gradient(to right, #e4e8fc, transparent);
}

/* 卡片容器 */
.card-container {
  display: flex;
  flex-wrap: wrap;  /* 允许卡片换行 */
  gap: 1rem;  /* 卡片之间增加间距 */
  justify-content: center;  /* 居中对齐卡片 */
}

/* 卡片样式 */
.card {
  width: 12rem;
  margin-bottom: 1rem;  /* 增大卡片之间的垂直间距 */
  border-radius: 10px;  /* 圆角 */
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1); /* 轻微阴影 */
  background: #fff;
  overflow: hidden;  /* 防止溢出 */
}

/* 卡片内部的左侧内容 */
.card-left {
  position: relative;
  width: 100%;
}

/* 卡片内部右侧内容 */
.card-right {
  position: relative;
  padding-left: 1rem;  /* 右侧内容的左边距 */
}

.card-title {
  font-size: 0.5rem;  /* 调整标题字体大小 */
  font-weight: 700;
}

.card-tag {
  font-size: 0.8rem;
  color: #999;
}

.card-describe {
  font-size: 0.9rem;
  color: #555;
}

.card-position {
  font-size: 0.8rem;
  color: #333;
}

.card-but {
  position: absolute;
  right: 1rem;
  bottom: 0.5rem;
  width: 3rem;
  background: #4CAF50;
  color: #fff;
  border-radius: 5px;
  padding: 0.5rem;
  text-align: center;
  cursor: pointer;
}

.card-but2 {
  position: absolute;
  right: 5rem;
  bottom: 0.5rem;
  width: 3rem;
  background: #f44336;
  color: #fff;
  border-radius: 5px;
  padding: 0.5rem;
  text-align: center;
  cursor: pointer;
}

/* 图片封面 */
.cover {
  height: 5rem;
  width: 100%;
  border-radius: 10px;
  display: block;
}

/* 蒙版覆盖层 */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40%;  /* 增加蒙版的高度 */
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  justify-content: center;  /* 内容居中 */
  align-items: center; /* 内容垂直居中 */
  z-index: 1;
  padding: 0.2rem;

  h2 {
    font-size: 0.8rem;
    margin: 0;
  }

  p {
    font-size: 0.6rem;
    margin: 0;
  }
}

/* 底部右侧浮动标签 */
.overlay1 {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1;
}

.bottom-right {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  border-radius: 5px;
  position: relative;
  box-shadow: 0px 3px 68px rgba(0, 0, 0, 0.5);

  p {
    font-size: 0.8rem;
  }
}

/* 鼠标悬停样式 */
.mouse {
  cursor: pointer;
}
</style>
