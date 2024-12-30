import apis from "./apis.js";
import request from "./request.js";

export default class adminService {
    // 管理员登录
    static async login(data:{
        principal: string,
        credentials: string,
        sysType: number | null,
    }) {
        return request({
            headers: {
                "Content-Type": "application/json",
            },
            method: "post",
            url: apis.admin.login,
            data: data
        });
    }
    // 增加活动
    static async addActivity(data:{
        name:string,
        pic:string,
        address:string,
        tagId:number,
        content:string,
        time:string,
    }){
        return request({
            headers: {
                "Content-Type": "application/json",
            },
            method: "post",
            url: apis.admin.addActivity,
            data: data
        });
    }
    // 删除活动
    static async deleteActivity(data:{

    }){
        return request({
            headers: {
                "Content-Type": "application/json",
            },
            method: "post",
            url: apis.admin.deleteActivity,
            data: data
        });
    }
    //修改活动
    static async updateActivity(data:{
        activityId:number,
        name:string,
        pic:string,
        address:string,
        tagId:number,
        content:string,
        time:string,
    }){
        return request({
            headers: {
                "Content-Type": "application/json",
            },
            method: "put",
            url: apis.admin.updateActivity,
            data: data
        });
    }
}
