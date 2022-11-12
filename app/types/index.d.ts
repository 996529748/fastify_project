// 统一状态码
// https://blog.csdn.net/qq_26988127/article/details/72757986
type ResponseCode = 401 | 500 | 404 | 403 | 200;

interface ResponseInfo<D = any, S = string> {
  code: ResponseCode;
  msg?: S;
  data?: D;
}

// 全局配置文件
interface ConfigType {
  readonly AssessTokenKey: string;
}