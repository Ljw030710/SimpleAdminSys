import Mock from 'mockjs';

// 模拟登录接口
Mock.mock('/api/login', 'post', (options) => {
    // 获取请求的body数据
    const { username, password } = JSON.parse(options.body);

    // 模拟的用户名和密码
    if (username === 'admin' && password === '123456') {
        return {
            code: 200,
            message: '登录成功',
            data: {
                token: 'mock_token_123456', // 返回模拟的token
                username: 'admin',
            },
        };
    } else {
        return {
            code: 401,
            message: '用户名或密码错误',
        };
    }
});
