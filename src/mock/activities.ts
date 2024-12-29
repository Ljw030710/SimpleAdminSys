import Mock from 'mockjs';


// 模拟活动数据
let activities = [
    { id: 1, name: "张三", age: 18, gender: "男", email: "zhangsan@example.com" },
    { id: 2, name: "李四", age: 20, gender: "女", email: "lisi@example.com" },
    { id: 3, name: "王五", age: 22, gender: "男", email: "wangwu@example.com" },
];

// 模拟接口：获取活动数据
Mock.mock('/api/activities', 'get', () => {
    return {
        code: 200,
        message: '获取活动数据成功',
        data: activities,
    };
});

// 模拟接口：新增活动数据
Mock.mock('/api/activity', 'post', (options) => {
    const { name, age, gender, email } = JSON.parse(options.body);
    const newActivity = {
        id: activities.length + 1, // 不限制 ID，根据数组长度生成
        name,
        age,
        gender,
        email,
    };
    activities.push(newActivity);
    return {
        code: 200,
        message: '新增活动成功',
        data: newActivity,
    };
});

// 模拟接口：修改活动数据
Mock.mock(/\/api\/activity\/\d+/, 'put', (options) => {
    const { id, name, age, gender, email } = JSON.parse(options.body);
    const activityIndex = activities.findIndex((item) => item.id === id);
    if (activityIndex !== -1) {
        activities[activityIndex] = { id, name, age, gender, email };
        return {
            code: 200,
            message: '修改活动成功',
            data: activities[activityIndex],
        };
    }
    return {
        code: 404,
        message: '活动未找到',
    };
});

// 模拟接口：删除活动数据
Mock.mock(/\/api\/activity\/\d+/, 'delete', (options) => {
    const id = parseInt(options.url.split('/').pop());
    const index = activities.findIndex((item) => item.id === id);
    if (index !== -1) {
        activities.splice(index, 1);
        return {
            code: 200,
            message: '删除活动成功',
        };
    }
    return {
        code: 404,
        message: '活动未找到',
    };
});
