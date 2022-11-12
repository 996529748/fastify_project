import { pathToRegexp } from "path-to-regexp";

const RequestHeaderToken = 'assess_token';


//不需要验证token的白名单列表
const URLWhiteList = [
  { path: "/v1/user/register", methods: "POST" },
  { path: "/v1/user/login", methods: "POST" },
].map(item => {
  return { ...item, urlReg: pathToRegexp(item.path) };
})

// 校验url是否需要token验证 url规则匹配且methods匹配则通过
//exec : 检索字符串中正则表达式匹配 如果有匹配的值则返回该函数的值，如果没有则返回null
const VerifyURL = (url: string, method: string = "*") => {
  return !!URLWhiteList.find(
    item =>
      item.urlReg.exec(url) &&
      (method.toLocaleUpperCase() === item.methods || item.methods === "*")
  );
};

export { RequestHeaderToken, VerifyURL }