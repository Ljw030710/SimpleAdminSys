<!-- 媒体中心新闻中心 -->
<template>
  <div class="article container">
    <div class="top">
        <h3>{{article.name}}</h3>
        <h6>活动 | {{article.time}}</h6>
    </div>
    <div class="common_container">
      <div >
        <div class="rounded-box" style="margin-bottom: 60px">
          <h1>AI 总结</h1>
           <h3 style="padding: 20px;">{{summary}}</h3>

        </div>


                <p style="text-align: center">
          <img
            src={{article.pic}}
            style="width: 800px;margin-bottom: 60px"
          /><br />
        </p>

        <h3>{{article.content}}</h3>

      </div>
<!--      <div class="page">
        <p class="prev">
          <a href="451.html?info_id=451" target="_blank"
            ><span class="action">上一篇: </span>
            <span class="topic text-overflow">
              【重磅干货】大家都关心的嘉宾PPT下载指南来啦！
            </span></a
          >
        </p>
        <p class="next">
          <a href="500.html?info_id=500" target="_blank"
            ><span class="action">下一篇: </span>
            <span class="topic text-overflow">
              2023西湖论剑·数字安全大会在杭举行
            </span></a
          >
        </p>
      </div>-->
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import {onMounted, ref} from "vue";
import activityService from "@/requests/activityService";

//拿到路由的query
const route = useRoute();
const router = useRouter();
console.log(route.query.activityId);

const article = ref({});
const summary = ref("正在生成中...请稍后");

import OpenAI from "openai";

const apiKey = 'sk-FiyzBXUHKMVGRFMp51Bf7113C36c4fB5A7D333A705Ef9dC1';
const url = 'https://az.gptplus5.com/v1';

const data = {
  prompt: 'Translate the following English text to French: "Hello, how are you?"',
  max_tokens: 60,
  temperature: 0,
  model: 'gpt-3.5-turbo',
};

const client = new OpenAI({
   // 访问 OpenAI 的 API 密钥
   apiKey: apiKey,
   // OpenAI API 的基本 URL
   baseURL: url, // 注意：这里应该是正确的 OpenAI API 地址
  dangerouslyAllowBrowser: true
});


onMounted(async () => {
    console.log('mounted');
    const res = await activityService.getActivity(route.query.activityId);
    if (res.data.success) {
        console.log(res.data.data);
        article.value = res.data.data;
    }

    try {
        // 调用 OpenAI API 获取响应
        const response = await client.chat.completions.create({ // 创建一个openai的创建一个通过聊天完成请求的方法
            model: "gpt-3.5-turbo", // 模型
            // 对话列表（模拟聊天内容）
            messages: [
                {
                    role: "user", // 角色
                    content: [ // 内容
                        {
                            type: "text",
                            text: article.value?.content
                        },
                    ]
                }
            ],
            max_tokens: 300
        });

        // 输出响应内容
        console.log(response.choices[0].message.content);
        summary.value = response.choices[0].message.content;
    } catch (err) {
        // 捕获并输出错误信息
        console.log(err);
    }
    /*await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => {
        console.log(result.choices[0].text);
      })
      .catch(error => {
        console.error('Error:', error);
      });*/
});
</script>

<style scoped>
.article {
    padding-bottom: 1rem;
    position: relative;
}
.container {
    width: 100%;
    position: relative;
    z-index: 2;
}
.container .common_container {
    width: 144rem;
    max-width: 75%;
    margin: 0 auto;
}
.common_container {
    width: 120rem !important;
    min-width: 1000px !important;
    margin: 0 auto;
}

.common_container .page {
    border-top: 0.1rem solid #dedede;
    display: flex;
    justify-content: space-between;
    padding-top: 1rem;
}
.top{


    color: #ffffffc4;
    font-size: 90px;
    padding: 0.7rem;
    padding-left: 3rem;
    margin-bottom: 3%;
}
.top>p:nth-child(2){

    margin-top: 30px;
}


.rounded-box {
  background-color: #f0f0f0;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin: 20px auto;
  text-align: center;
  padding-bottom: 40px;
  border: 2px dashed #666;
}

.rounded-box h1 {
  margin-top: 10px;

  color: #00aeec;
}

.rounded-box h3 {
  margin-left: 20px;
  margin-right: 20px;
  padding-left: 20px;
  padding-right: 20px;
  color: #666;
}
</style>
