### 0.1.28
* 修复用户首次授权会跳多次的问题
* 修复 Android 下报缺少 appkey 的 bug

### 0.1.24
* 修复 Rap.user.getUserInfo 不传参数报错的 bug
* 新申请 appkey 跳自动授权页面
* 新申请 appkey 最大不超过 5 人的提示

### 0.1.23
* 支持 web 端调试 RAP.aop.proxy
  > 请确保您的接口支持跨域请求
  ```js
  RAP.aop.proxy({
    method: 'GET',
    url: 'https://httpbin.org/ip'
  }, d => {
    alert(JSON.stringify(d));
  })
  ```
* 支持简单的 on, emit 方法
* 修复 RAP.aop.request 在 web 端下报错
  > 请确保您的 appkey 有权限调用相应的 API
  ```js
  RAP.aop.request({
    namespace:'com.alibaba.logistics',
    api:'alibaba.logistics.mySendGoodsAddress.list.get',
    version:'1',
    params: {},
  },(result)=>{
    alert(JSON.stringify(result))
  },(error)=>{
    alert(JSON.stringify(error))
  });
  ```


