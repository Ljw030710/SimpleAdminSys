import { defineStore } from 'pinia';
import { ref } from 'vue';

const actStore = defineStore(
    'act',
    () => {
        const tag = ref([{
            tagId: 1,
            tagName: "新品发布",
        },
        {
            tagId: 2,
            tagName: "数字成果",
        },
            {
                tagId: 3,
                tagName: "奋进三十年",
            }]);
        const activity = ref(
            {
                activityId: 2,
                name: "2024西湖论剑丨数据安全创新实践案例",
                content: "连续六年，60余个具备示范效益的优秀案例，数据安全创新实践案例征集活动”正式启动！",
                tagName: "数字成果",
                time: "2024-09-01 09:00:00",
                address: "杭州市西湖区西湖路",
                isEnroll: true,
            }
        );

        const act = ref([
  {
    pic: 'https://javaee32130.oss-cn-hangzhou.aliyuncs.com/picture/common/%E8%A7%86%E9%A2%911.png',
    exactDate: '2024-03-15',
    startTime: '10:00 AM',
      time: "2024-09-01 09:00:00",
    sumTime: 60,
    reserved: 158,
    name: '格致论道@西湖论剑',
    content: '活动描述',
    address: '格致论道@西湖论剑',
    tagName:'科普论坛',
      activityId: 1,
        isEnroll: false
  },
  {
    pic: 'https://javaee32130.oss-cn-hangzhou.aliyuncs.com/picture/common/%E8%A7%86%E9%A2%912.png',
    exactDate: '2024-03-16',
    startTime: '11:00 AM',
      time: "2024-09-05 09:00:00",
    sumTime: 30,
    reserved: 100,
    name: '95后极客青年Talk',
    content: '活动描述',
    address: '活动地点',
    tagName:'掌上论坛',
      activityId: 2,
      isEnroll: true,
  },
  {
    pic: 'https://javaee32130.oss-cn-hangzhou.aliyuncs.com/picture/common/%E8%A7%86%E9%A2%913.png',
    exactDate: '2024-03-16',
    startTime: '11:00 AM',
      time: "2024-09-10 09:00:00",
    sumTime: 30,
    reserved: 100,
    name: '当科幻照进现实我们会更安全吗？',
    content: '活动描述',
    address: '活动地点',
    tagName:'掌上论坛',
        activityId: 3,
        isEnroll: false,
  },
  {
    pic: 'https://javaee32130.oss-cn-hangzhou.aliyuncs.com/picture/common/%E8%A7%86%E9%A2%914.png',
    exactDate: '2024-03-16',
    startTime: '11:00 AM',
      time: "2024-09-21 09:00:00",
    sumTime: 30,
    reserved: 100,
    name: '生态合作伙伴分论坛',
    content: '活动描述',
    address: '杭州洲际酒店·杭州厅',
    tagName:'生太合作',
        activityId: 4,
      isEnroll: true,
  }
])

        const setTag = (data: any) => {
            tag.value = data;
        }

        const setActivity = (data: any) => {
            activity.value = data;
        }

        const getTag = () => {
            return tag.value;
        }

        const getActivity = () => {
            return activity.value;
        }

        const setAct = (data: any) => {
            act.value = data;
        }

        const getAct = () => {
            return act.value;
        }

        return {
            tag,
            activity,
            setTag,
            setActivity,
            getTag,
            getActivity,
            act,
            setAct,
            getAct
        }
    },
    {
      persist: {
          enabled: true,
      }
    }
)

export default actStore;
