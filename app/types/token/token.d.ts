interface TokenSearchParams {
  userId?: string;
  assess_token?: string;
}
interface UserTokenInfo {
  _id: string;
}

// 数据库中存储的token信息
interface ConnectToken {
  userId: string;
  assess_token: string;
}