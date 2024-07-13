import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

// 自定义判断元素类型JS
function toType(obj: any): string {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)![1]
    .toLowerCase();
}
// 参数过滤函数
function filterNull(o: any) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key];
    }
    if (toType(o[key]) === "string") {
      o[key] = o[key].trim();
    } else if (toType(o[key]) === "object") {
      o[key] = filterNull(o[key]);
    } else if (toType(o[key]) === "array") {
      o[key] = filterNull(o[key]);
    }
  }
  return o;
}
/*
  接口处理函数
  这个函数每个项目都是不一样的，我现在调整的是适用于
  https://cnodejs.org/api/v1 的接口，如果是其他接口
  需要根据接口的参数进行调整。参考说明文档地址：
  https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
  主要是，不同的接口的成功标识和失败提示是不一致的。
  另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
*/

function apiAxios(
  method: string,
  url: string,
  params: null | string | object,
  success: any,
  failure: any
) {
  let contentTypeIsJson = false;
  if (params && typeof params != "string") {
    params = filterNull(params);
  } else contentTypeIsJson = true;

  // axios 对特殊字符处理
  if (params && (method === "GET" || method === "DELETE")) {
    const arr: Array<string> = [];
    Object.entries(params).forEach((item) => {
      arr.push(`${item[0]}=${encodeURIComponent(item[1])}`);
    });
    url = `${url}?${arr.join("&")}`;
  }
  axios({
    method: method,
    url: url,
    data: method === "POST" || method === "PUT" ? params : null,
    // params: method === 'GET' || method === 'DELETE' ? params : null,
    params: method === "GET" || method === "DELETE" ? "" : null,
    withCredentials: true,
    crossDomain: true,
    transformRequest: [
      function (data) {
        // Do whatever you want to transform the data
        if (contentTypeIsJson) return data;
        let ret = "";
        for (let it in data) {
          ret +=
            encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        return ret;
      },
    ],
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      "Content-Type": contentTypeIsJson
        ? "application/json"
        : "application/x-www-form-urlencoded",
    },
  } as AxiosRequestConfig<any>)
    .then(function (res) {
      let response = res.data;
      if (response.code == 302) {
        window.location.href = response.urlToRedirectTo;
        return;
      } else if (response.code == 0) {
        if (success) {
          success(response);
        }
      } else {
        if (failure) {
          failure(response);
        } else {
          if (response.data == 2) {
            // Message.error(response.msg); //错误处理
            setTimeout(() => {
              location.reload();
            }, 1000);
          } else {
            // Message.info(response.msg); //错误处理
          }
        }
      }
    })
    .catch(function (err) {
      let res = err.response;
      console.error(res || err);
      if (res) {
        // Message.closeAll();
        clearTimeout(timeObj);
        if (res.data.msg) {
          //   Message.error(res.data.msg); //错误处理
        } else {
          //   Message.error("网络请求出错"); //错误处理
        }
        return;
      }
    });
}

//字符串的16进制表达
function strToHexCharCode(_str: string) {
  if (_str === "") return "";
  var hexCharCode: Array<string> = [];
  for (var i = 0; i < _str.length; i++) {
    var str = _str.charCodeAt(i).toString(16);
    if (_str.length == 1) str += "0" + _str;
    hexCharCode.push(str);
  }
  return hexCharCode.join("");
}

let requestCount = 0;
let timeObj: NodeJS.Timeout;
// http request 拦截器
axios.interceptors.request.use((config) => {
  requestCount++;
  if (requestCount == 1) {
    timeObj = setTimeout(() => {
      //   Message.info({ message: "加载中...", duration: 0 });
    }, 800);
  }

  if (
    config.data &&
    Object.prototype.toString.call(config.data) == "[object FormData]"
  ) {
    config.headers!!["Content-Type"] = "multipart/form-data;charset=utf-8";
    config.transformRequest = [
      function (data) {
        return data;
      },
    ];
  }

  if (localStorage.getItem("userInfo")) {
    (config.headers as AxiosRequestHeaders)["userInfo"] =
      localStorage.getItem("userInfo");
  }
  return config;
});

// http response 拦截器
axios.interceptors.response.use((response) => {
  requestCount--;
  if (requestCount === 0) {
    setTimeout(() => {
      //   Message.closeAll();
    }, 1500);
    clearTimeout(timeObj);
  }
  return response;
});

// 返回在vue模板中的调用接口
export default {
  get: function (
    url: string,
    params: string | object | null,
    success: any,
    failure: any
  ) {
    return apiAxios("GET", url, params, success, failure);
  },
  post: function (
    url: string,
    params: string | object,
    success: any,
    failure: any
  ) {
    return apiAxios("POST", url, params, success, failure);
  },
  put: function (
    url: string,
    params: string | object,
    success: any,
    failure: any
  ) {
    return apiAxios("PUT", url, params, success, failure);
  },
  delete: function (
    url: string,
    params: string | object,
    success: any,
    failure: any
  ) {
    return apiAxios("DELETE", url, params, success, failure);
  },
};
