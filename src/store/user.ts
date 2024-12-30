
import { defineStore } from 'pinia';

interface FirstStoreState {
  token: string;
  id: string;
  username: string;
  signState: boolean; //签到状态：false未签，true签了
  apply: number;
  video: number; //0：视频，1：直播
  curnum: number;
  curtime: string;
}

export const user = defineStore('first', {
  state: (): FirstStoreState => {
    return {
      token: '',
      id: '',
      username: '',
      signState: false,
      apply: 0,
      video: 0,
      curnum: 1,
      curtime:'',
    };
  },
  getters: {
    // 在需要的时候添加你的 getter
  },
  actions: {
    // 在需要的时候添加你的 action
  },
  persist: {
    enabled: true, // 开启数据缓存
    strategies: [
      {
        // key: 'myuser',
        storage: sessionStorage, // 默认是sessionStorage
        paths: ['id','username','signState','apply','video','curnum','curtime']
      },
      // {
      //   storage: localStorage, // 默认是sessionStorage
      //   paths: ['token']
      // }
    ],
  }
});
