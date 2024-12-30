/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-12-12 20:47:51
 * @LastEditors: Fleurxxx 984209872@qq.com
 * @LastEditTime: 2024-03-25 20:00:07
 * @FilePath: \hope-enroll\src\store\user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia';
import { ref } from 'vue';

const userStore = defineStore(
    'user',
    () => {
      const accessToken = ref<string | null>("");
      const refreshToken = ref<string | null>("");
      const principal = ref<string | null>("");

      const userId = ref<string | null>("");
      const nickName = ref<string | null>("");
      const avatar = ref<string | null>("https://static.juzicon.com/avatars/avatar-200602130320-HMR2.jpeg?x-oss-process=image/resize,w_100");
      const phoneNumber = ref<string | null>("");
      const address = ref<string | null>("");
      const status = ref<number | null>(1);
      const createTime = ref<string | null>("");
      const updateTime = ref<string | null>("");

      const info = ref({
        userId: "",
        nickName: "",
        pic: "",
        phoneNumber: "",
        address: "",
        status: 1,
        createTime: "",
        updateTime: "",
      })

        const setInfo = (data: any) => {
            info.value = data;
        }

        const getInfo = () => {
            return info.value;
        }

      const setAccessToken = (token: string) => {
        accessToken.value = token;
      }

      const setRefreshToken = (token: string) => {
        refreshToken.value = token;
      }

      const setPrincipal = (token: string) => {
        principal.value = token;
      }

        const setUserId = (id: string) => {
            userId.value = id;
        }

        const setNickName = (name: string) => {
            nickName.value = name;
        }

        const setAvatar = (url: string) => {
            avatar.value = url;
        }

        const setPhoneNumber = (phone: string) => {
            phoneNumber.value = phone;
        }

        const setAddress = (addr: string) => {
            address.value = addr;
        }

        const setStatus = (sta: number) => {
            status.value = sta;
        }

        const setCreateTime = (time: string) => {
            createTime.value = time;
        }

        const setUpdateTime = (time: string) => {
            updateTime.value = time;
        }

        const getUserId = () => {
            return userId.value;
        }

        const getNickName = () => {
            return nickName.value;
        }

        const getAvatar = () => {
            return avatar.value;
        }

        const getPhoneNumber = () => {
            return phoneNumber.value;
        }

        const getAddress = () => {
            return address.value;
        }

        const getStatus = () => {
            return status.value;
        }

        const getCreateTime = () => {
            return createTime.value;
        }

        const getUpdateTime = () => {
            return updateTime.value;
        }

      const getAccessToken = () => {
        return accessToken.value;
      }

      const getRefreshToken = () => {
        return refreshToken.value;
      }

      const getPrincipal = () => {
        return principal.value;
      }

      return {
        accessToken,
        refreshToken,
        principal,
          userId,
          nickName,
            avatar,
            phoneNumber,
            address,
            status,
            createTime,
            updateTime,
          info,
            setInfo,
            getInfo,
        setAccessToken,
        setRefreshToken,
        setPrincipal,
        setUserId,
        setNickName,
        setAvatar,
        setPhoneNumber,
        setAddress,
        setStatus,
        setCreateTime,
        setUpdateTime,
        getUserId,
        getNickName,
        getAvatar,
        getPhoneNumber,
        getAddress,
        getStatus,
        getCreateTime,
        getUpdateTime,
        getAccessToken,
        getRefreshToken,
        getPrincipal
      }
    },
    {
      persist: {
          enabled: true,
      }
    }
);

export default userStore;