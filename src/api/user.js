import request from "@/utils/request";

export const userRegisterService = (registerData) => {
    const params = new URLSearchParams();
    for (const key in registerData) {
        params.append(key, registerData[key])
    }
    return request.post('/user/register', params)
}

export const userLoginService = (loginData) => {
    const params = new URLSearchParams();
    for (const key in loginData) {
        params.append(key, loginData[key])
    }
    return request.post('/user/login', params)
}

export const userInfoService = () => {
    return request.get('/user/userInfo')
}

export const userInfoUpdateService = (userInfoData) => {
    return request.put('/user/update', userInfoData)
}

export const userAvatarUpdateService = (avatarUrl) => {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('avatarUrl', avatarUrl)
    return request.patch('/user/updateAvatar', urlSearchParams)
}

export const userPwdUpdateService = (pwdData) => {
    return request.patch('/user/updatePwd', pwdData)
}
// 获取员工列表（分页）
export const listEmployeesService = (params) => {
    return request.get('/user', { params });
};

// 添加员工
export const addEmployee = (employeeData) => {
    return request.post('/user', employeeData);
};

// 更新员工信息
export const updateEmployee = (employeeData) => {
    return request.put('/user/update', employeeData);
};

// 删除员工
export const deleteEmployee = (id) => {
    return request.delete(`/user/delete?id=${id}`);
};
