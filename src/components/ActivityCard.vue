<!-- 近期直播 -->
<template>
  <div v-if="!dialogVisible">
  <div class="card-container">
    <el-card class="card" v-for="(item, index) in props.act" :key="index">
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
          <el-button class="card-but" round @click="toggleReserve(item.activityId, index)">
            {{ item.isEnroll ? '已报名' : '立即报名' }}
          </el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {ElMessage, TagProps} from 'element-plus';
import { user } from '@/store/user';
import actStore from "@/store/actStore";
import activityService from "@/requests/activityService";

// eslint-disable-next-line no-undef
const props = defineProps<{
  act: any
}>();

const newActStore = actStore();
const cardList = newActStore.getActivity();


type Item = {
  type: TagProps['type'];
  label: string
}

const items = ref<Array<Item>>([
  { type: 'primary', label: 'Tag 1' },
  { type: 'success', label: 'Tag 2' },
  { type: 'info', label: 'Tag 3' },
  { type: 'warning', label: 'Tag 4' },
  { type: 'danger', label: 'Tag 5' },
])
const storeUser = user();
const route = useRoute();
const router = useRouter();
const data = reactive({})


const actList = newActStore.getActivity();

const currentPage = ref(1);
const pageSize = ref(4);
const totalActivities = ref(0);

const handlePageChange = (page: number) => {
  currentPage.value = page;
  // Add logic to fetch or display activities for the current page
};

const toggleReserve = async (activityId: number, index: number) => {
  // Add logic to toggle the reservation status of the activity
  console.log(activityId);
  cardList[index].isEnroll = !cardList[index].isEnroll;

  const res = await activityService.joinActivity(activityId);
  if (res.data.success) {
    ElMessage.success('操作成功');
    cardList[index].isEnroll = !cardList[index].isEnroll;
  }
  else {
    ElMessage.error('操作失败');
  }
};

const dialogVisible = ref(false);
const selectedActivity = reactive({
  activityId: 0,
  name: '',
  pic: '',
  time: '',
  reserved: 0,
  tagName: '',
  content: '',
  address: ''
});

const enter = (item:{
  activityId: number;
  name: string;
  pic: string;
  time: string;
  reserved: number;
  tagName: string;
  content: string;
  address: string;
}) => {
  Object.assign(selectedActivity, item);
  dialogVisible.value = true;
};




onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(async () => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
  console.log(props.tag)
})
watchEffect(()=>{
})
// 使用toRefs解构
// let { } = { ...toRefs(data) }
defineExpose({
  ...toRefs(data)
})

</script>
<style scoped lang='less'>
.card-container {
  //   display: flex;
  //   flex-wrap: wrap;
  //   gap: 20px; /* 设置卡片之间的间隔 */
  display: flex;
  flex-direction: column;
  align-items: center;
}


.card{
  width: 12rem;
  // margin-top: 1rem;
  margin-bottom: 0.3rem;

  &:nth-last-child(2){
    margin-left: -12px !important;
    margin-top: 0.3rem;
  }

  .card-left{
    position: relative;
  }
  .card-right{
    position: relative;
    left: 0.7rem;
    .card-title {
      position: absolute;
      font-size: 0.38rem;
      top:0;
      left: 0;
    }
    .card-tag{
      position: absolute;
      top:0.7rem;
      left: 0;
      font-size: 0.2rem;
    }
    .card-describe{
      position: absolute;
      font-size: 0.2rem;
      top:1.2rem;
      left:5px;
    }
    .card-position {
      position: absolute;
      font-size: 0.2rem;
      bottom: 0.1rem;
      left: 0;
    }
    .card-but{
      position: absolute;
      right: 1rem;
      bottom: 0;
      width: 1.6rem;
    }
    .card-but2{
      position: absolute;
      right: 2.8rem;
      bottom: 0;
      width: 1.4rem;
    }
  }
}

.cover{
  height: 2.5rem;
  width: 100%;
  border-radius: 10px;
  display: block;
}
.overlay {
  position: absolute; /* 绝对定位，相对于父容器 */
  top: 0; /* 距离父容器顶部距离为0 */
  left: 0; /* 距离父容器左侧距离为0 */
  width: 100%; /* 宽度与父容器相同 */
  height: 23%; /* 高度为图片高度的三分之一 */
  background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
  color: white; /* 文字颜色为白色 */
  display: flex; /* 使用 flex 布局 */
  //flex-direction: column; /* 垂直方向排列子元素 */
  //justify-content: center; /* 垂直居中子元素 */
  justify-content: space-between; /* 左右对齐 */
  align-items: center; /* 水平居中子元素 */
  z-index: 1; /* 使阴影位于图片上方 */
  h2 {
    margin: 0;
    padding-left: 0.2rem;
    font-size: 0.2rem;
  }
  h2:nth-child(2){
    padding-right: 0.08rem;
  }
  p {
    padding-right: 0.08rem;
    font-size: 0.2rem;
    margin: 0;
  }
}
.overlay1{
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1;
}
.bottom-right {
  background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
  color: white;
  padding: 10px 0px;
  border-radius: 5px;
  position: relative;
  box-shadow: 0px 3px 68px rgba(0, 0, 0, 0.5); /* 阴影效果 */
  p {
    padding-right: 0.08rem;
    font-size: 0.2rem;
    margin: 0;
  }
}
.mouse{
  cursor: pointer;
}
</style>