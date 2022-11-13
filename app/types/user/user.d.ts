type Sex =  0 | 1; // 男 / 女

//用户注册凭证
interface UserRegisterCredentials {
    username: string;
    password: string;
    sex: Sex;
}

// 用户登录凭证
interface UserLoginCredentials {
    username: string;
    password: string;
}


// 数据库中存储的用户信息
interface UserInfo {
    userId: string;
    username: string;
    password: string;
    sex: Sex;
    role: UserRolePermissionsRole;
    createTime: string;
    updateTime: string;
}

// 选项化用户注册凭证
type OptionalUserRegisterCredentials = Partial<UserRegisterCredentials>;