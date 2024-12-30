<template>
  <el-main>
    <el-form
      :model="activityAddItem"
      :rules="rules"
      ref="activityAddFormRef"
      label-width="80px">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="activityAddItem.name"></el-input>
      </el-form-item>
      <el-form-item label="活动图片" prop="pic">
        <el-upload list-type="picture-card" :auto-upload="false" multiple :on-change="handleChange" limit="1">
          <el-icon><Plus /></el-icon>

          <template #file="{ file }">
            <div>
              < img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
              <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                      <el-icon><zoom-in /></el-icon>
                    </span>
                    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                      <el-icon><Download /></el-icon>
                    </span>
                    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                      <el-icon><Delete /></el-icon>
                    </span>
                  </span>
            </div>
          </template>
        </el-upload>


        <el-dialog v-model="dialogVisible">
          < img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>

      </el-form-item>
      <el-form-item label="活动地址" prop="address">
        <el-input v-model="activityAddItem.address"></el-input>
      </el-form-item>
      <el-form-item label="活动标签" prop="tagId">
        <el-input v-model="activityAddItem.tagId"></el-input>
      </el-form-item>
      <el-form-item label="活动时间" prop="time">
        <el-date-picker
          v-model="activityAddItem.time"
          type="datetime"
          placeholder="选择活动时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="submitBack">返回</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script lang="ts" setup>
import { ref,reactive } from "vue";
import { ElButton } from "element-plus";
import "element-plus/theme-chalk/el-button.css";
import axios from "axios";
import adminService from "@/requests/adminService.ts";
import { useRouter } from "vue-router";
const router = useRouter();
import { ElMessage } from "element-plus";
import {FormInstance,FormRules} from "element-plus"
import userStore from "@/store/userStore";
const showForum = ref(true);
import activityService from "@/requests/activityService";
const dialogImageUrl = ref('');
const dialogVisible = ref(false);
const fileList = ref([]);

const discussList = ref([]);

const commentsVisible = ref(false);

// 上传文件
const newTokenStore = userStore();
const activityAddFormRef = ref<FormInstance>();
const activityAddItem = reactive({
  name: "",
  pic: "",
  address: "",
  tagId: "",
  time: "",
})
const rules = ref<FormRules>({
  name: [
    { required: true, message: "请输入活动名称", trigger: "blur" },
  ],
  pic: [
    { required: true, message: "请上传活动图片", trigger: "blur" },
  ],
  address: [
    { required: true, message: "请输入活动地址", trigger: "blur" },
  ],
  tagId: [
    { required: true, message: "请选择活动标签", trigger: "blur" },
  ],
  time: [
    { required: true, message: "请选择活动时间", trigger: "blur" },
  ],
})
/*const submitForm = async () => {
  const res = await adminService.addActivity(activityAddItem);
  if (res.data.success === true) {
    ElMessage.success("添加活动成功");
    router.push("/indexPage");
  } else {
    ElMessage.error("添加活动失败");
  }
};*/

const submitBack = () => {
  router.push("/indexPage");
};









// 上传文件
const submitForm  = async (uploadData) => {
  console.log('Upload files:', fileList.value);
  const formData = new FormData();
  const promises = fileList.value.map((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = () => {
        const base64 = reader.result;
        formData.append('file', file.raw); // Add Base64 string to FormData
        resolve();
      };
      reader.onerror = (error) => {
        console.error('FileReader error:', error);
        reject(error);
      };
    });
  });

  /*console.log('Upload files:', fileList.value);
  const formData = new FormData();
  fileList.value.forEach((file) => {
    formData.append('file', file.raw); // Add raw file to FormData
  });*/

  try {
    await Promise.all(promises); // Wait for all files to be read
    const baseurl = 'http://192.168.123.49';
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.post(baseurl+':8000/a/westlake_biz/oss/upload_minio', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': accessToken,
        'withCredentials': true
      },
    });
    // Call success callback
    //uploadData.onSuccess(response.data);

    const url = baseurl+':9005/westlake/'+response.data.data.dir+response.data.data.fileName;

    const res = await adminService.addActivity({
      name: activityAddItem.name,
      pic: url,
      address: activityAddItem.address,
      tagId: activityAddItem.tagId,
      time: activityAddItem.time
    });
      if (res.data.success === true) {
        ElMessage.success("添加活动成功");
        await router.push("/activityPage");
      } else {
        ElMessage.error("添加活动失败");
      }
  } catch (error) {
    // Call error callback
    //uploadData.onError(error);
  }
};

const handleChange = (file, newFileList) => {
  fileList.value = newFileList;
};

// Delete operation logic
const handleRemove = (file) => {
  const index = fileList.value.indexOf(file); // Find the file index
  console.log(index);
  if (index !== -1) {
    fileList.value.splice(index, 1);
  }
};

const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};

const handleDownload = (file) => {
  console.log(file);
};
</script>

<style scoped lang="less">
</style>
