import Fun from "./fun";
import base64_encode from "./base64_encode";
import { Loading, Message } from "element-ui";

var loading;

export default {
  // 封装的 GET请求后台基本不用
  get(url, params, message) {
    // Fun.getKeyByI() || 2
    let i = Fun.getKeyByI();
    let mid = Fun.getKeyByMid();
    let type = Fun.getTyep();
    let shop_id = Fun.getKeyByMicroShopId();
    let webToken = localStorage.getItem("token");
    let uid = localStorage.getItem("loginUid");

    let baseUrl = "";
    if (mid) {
      baseUrl =
        "/addons/yun_shop/api.php?i=" +
        i +
        "&mid=" +
        mid +
        "&type=" +
        type +
        "&shop_id=" +
        shop_id;
    } else {
      baseUrl =
        "/addons/yun_shop/api.php?i=" +
        i +
        "&type=" +
        type +
        "&shop_id=" +
        shop_id;
    }

    if (window.yzFirstlogin === 0 && window.yzValidate_page === 0) {
      baseUrl = baseUrl + "&validate_page=1";
    }

    if (
      (window.yzFirstlogin === 1 &&
        url.indexOf("member.login.index") < 0 &&
        url.indexOf("member.member.wxJsSdkConfig") < 0 &&
        url.indexOf("member.login.login-mode") < 0) ||
      url.indexOf("finance.income-page.index") >= 0
    ) {
      window.yzFirstlogin = 0;
      baseUrl = baseUrl + "&basic_info=1&validate_page=1";
    }

    if (message) {
      loading = Loading.service({
        lock: true,
        text: message,
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
    }

    if (
      window.location.href.indexOf("#/cashier_pay/") > -1 &&
      url.indexOf("member.login.check-login") < 0
    ) {
      baseUrl += "&scope=base&route=";
    } else {
      baseUrl += "&route=";
    }

    if (params) {
      let paramsArray = [];
      Object.keys(params).forEach(key =>
        paramsArray.push(key + "=" + params[key])
      );
      url += "&" + paramsArray.join("&");
      url = baseUrl + url;
    } else {
      url = baseUrl + url;
    }

    console.log("===test url====", url);

    return new Promise(function(resolve, reject) {
      // Authorization要删
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + base64_encode(uid + ":" + webToken)
        },
        credentials: "include"
      })
        .then(response => {
          if (message) {
            loading.close();
          }

          if (response.ok) {
            return response.json();
          } else {
            reject({ status: response.status });
          }
        })
        .then(response => {
          if (
            response.result === 0 &&
            !Fun.isTextEmpty(response.data) &&
            response.data.status === -2
          ) {
            window.location.href = Fun.getSiteRoot() + "/#/login?i=2";
            Message.error(response.msg);
          } else if (
            response.result === 0 &&
            !Fun.isTextEmpty(response.data) &&
            response.data.login_status === 1
          ) {
            window.location.href = Fun.getSiteRoot() + "/#/login?from=1&i=2";
            console.log("无权限，跳入登录入口");
          } else if (
            response.result === 1 &&
            !Fun.isTextEmpty(response.data) &&
            response.data.status === -5
          ) {
            window.location.href = Fun.getSiteRoot() + "/#/login?i=2";
            Message.error(response.msg);
          }
          if (
            response.result === 1 &&
            !Fun.isTextEmpty(response.data) &&
            response.data.url &&
            !response.data.url instanceof Object
          ) {
            // 操作员直接跳进主商城
            window.location.href = response.data.url;
          }else {
            return response;
          }
        })
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          if (message) {
            loading.close();
          }
          window.location.href = Fun.getSiteRoot() + "/#/500";
          console.error(err);
          reject({ status: -1 });
        });
    });
  },
  // POST请求  FormData 表单数据

  post(url, formData, message) {

	  let i = Fun.getKeyByI() || 9;
	  let store_id = Fun.getKey('store_id');

	  let baseUrl = "";
	  if (i) {
		  baseUrl = "/addons/yun_shop/api.php?scope=pass&i=" + i ;
	  } else {
		  baseUrl = "/addons/yun_shop/api.php?scope=pass";
	  }

	  if (store_id) {
		  baseUrl += "&store_id=" + store_id ;
	  }

    if (message) {
      loading = Loading.service({
        lock: true,
        text: message,
        background: "rgba(0, 0, 0, 0.7)"
      });
    }

    if (
      window.location.href.indexOf("cashier_pay") > 0 &&
      url.indexOf("member.login.check-login") < 0
    ) {
      baseUrl += "&scope=base&route=";
    } else {
      baseUrl += "&route=";
    }

    return new Promise(function(resolve, reject) {
      url = baseUrl + url;
      // Authorization要删
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
        credentials: "include"
      })
        .then(response => {
          if (message) {
            loading.close();
          }
          if (response.ok) {
            return response.json();
          } else {
            reject({ status: response.status });
          }
        })
        .then(response => {
          if (
            response.result === 0 &&
            !Fun.isTextEmpty(response.data) &&
            response.data.status === -2
          ) {
            window.location.href = Fun.getSiteRoot() + "/#/login?i=2";
            Message.error(response.msg);
          } else if (
            response.result === 0 &&
            !Fun.isTextEmpty(response.data) &&
            response.data.login_status === 1
          ) {
            window.location.href = Fun.getSiteRoot() + "/#/login?from=1&i=2";
            console.log("无权限，跳入登录入口");
          } else if (
            response.result === 1 &&
            !Fun.isTextEmpty(response.data) &&
            response.data.status === -5
          ) {
            window.location.href = Fun.getSiteRoot() + "/#/login?i=2";
            Message.error(response.msg);
          }
          if (
            response.result === 1 &&
            !Fun.isTextEmpty(response.data) &&
            response.data.url &&
            !response.data.url instanceof Object
          ) {
            // 操作员直接跳进主商城
            window.location.href = response.data.url;
          }else {
            return response;
          }
        })
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          if (message) {
            loading.close();
          }
          console.error(err);
          // reject({ status: -1 });
        });
    });
  },
};
