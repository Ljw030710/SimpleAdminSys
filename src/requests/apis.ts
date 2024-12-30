const apis = {
    admin: {
        login: '/a/westlake_auth/ua/login',
        //增加活动
        addActivity: '/a/westlake_activity/activity/add',
        //删除活动
        deleteActivity: '/a/westlake_activity/activity/delete',
        //修改活动
        updateActivity: '/a/westlake_activity/activity/update',
    },
    activity: {
        getActivity:"/a/westlake_activity/activity/detail",
        getActivityInfo:"/a/westlake_activity/activity/page",
        //报名参加活动
        joinActivity:"/a/westlake_activity/activity/enroll",
        //统计活动信息(后端还未给出api)
        getActivityStatistics:"/a/statisticsActivity",
        //获取活动TAG列表
        getActivityTagList:"/a/westlake_activity/activity/tag",
    },
}
export default apis;
