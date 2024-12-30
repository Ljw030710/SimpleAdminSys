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
    //获取活动
    static async getActivities(data: {
        pageDTO:{
            pageNum:number,
            pageSize:number
        },
        tagId:number
    }) {
        return request({
            "headers": {
                "Content-Type": "application/json",
            },
            method: "post",
            url: apis.admin.getActivities,
            data: data
        });
    }
    //添加活动
    static async addActivity(data: {

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
    //删除活动
    static async deleteActivity(data: {

    }){
        return request({
            headers: {
                "Content-Type": "application/json",
            },
            method: "delete",
            url: apis.admin.deleteActivity,
            data: data
        });
    }
    //修改活动
    static async updateActivity(data: {

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

    static async getActivityTagList() {
        return request({
            "headers": {
                "Content-Type": "application/json",
            },
            method: "get",
            url: apis.admin.getActivityTagList,
            params: {}
        });
    }
}
