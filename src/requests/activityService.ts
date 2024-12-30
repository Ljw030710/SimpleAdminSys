import apis from "./apis";
import request from "./request";

export default class activityService {
    static async getActivity(
        activityId: number
    ) {
        return request({
            "headers": {
                "Content-Type": "application/json",
            },
            method: "get",
            url: apis.activity.getActivity,
            params: {
                activityId: activityId
            }
        });
    }

    static async getActivityInfo(data: {
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
            url: apis.activity.getActivityInfo,
            data: data
        });
    }
    //报名参加活动（get方法）
    static async joinActivity(activityId:number) {
        return request({
            "headers": {
                "Content-Type": "application/json",
            },
            method: "get",
            url: apis.activity.joinActivity,
            params: {
                activityId:activityId
            },
        });
    }
    //统计活动信息（get方法）（后端未给出api）
    static async getActivityStatistics() {
        return request({
            "headers": {
                "Content-Type": "application/json",
            },
            method: "get",
            url: apis.activity.getActivityStatistics,
            params: {}
        });
    }
    //获取活动TAG列表（get方法）
    static async getActivityTagList() {
        return request({
            "headers": {
                "Content-Type": "application/json",
            },
            method: "get",
            url: apis.activity.getActivityTagList,
            params: {}
        });
    }
}