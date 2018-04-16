import { isWeex, isWeb } from './env';
import Rap from './rap';
// event
import { on, off, emit } from './event';

// navigator
import navigator from './navigator';

// localstorage
import localStorage from './localstorage';

// biz
import device from './device';
import user from './user';
import share from './biz/share';
import aliwangwang from './biz/aliwangwang';
import { getIdentity } from './biz/identity';
import { getBizInfo, getBizInfoUrl } from './biz/productinfo';
import sso from './biz/sso';
// request
import aop from './aop';

// UI
import Toast from 'universal-toast';
import { showLoading, hideLoading } from './loading';

// system
import clipboard from './clipboard';
import app from './app';
import util from './util';

// plugin manage
import plugin from './biz/plugin-manage';

// location
import location from './location';

// tracelog
import tracelog from './tracelog';

// 这里要设计 保护，不被外部 误干扰

/** @namespace
 */
const RAP = {
  /**
   * APP探测环境相关
   *
   * @param isIOS {boolean} - 是否是IOS系统
   * @param isAndroid {boolean} - 是否是Android系统
   * @param version {string} - 主客APP的版本号
   * @param ua {string} - UserAgent相关信息
   * @example
   * RAP.app.isIOS
   * RAP.app.isAndroid
   * RAP.app.version
   * RAP.app.ua
   */
  app: app,

  /**
   * 运行时环境相关
   * @param isWeex {boolean} - 是否在weex环境下
   * @param isWeb {boolean} - 是否在web环境下
   * @kind constant
   *
   * @example
   * if(RAP.env.isWeex) {
   *   //...
   * }
   *
   * if(RAP.env.isWeb){
   *   //...
   * }
   */
  env: {
    isWeex,
    isWeb
  },

  biz: {
    getBizInfo,
    getBizInfoUrl,
    getIdentity
  },
  plugin,

  /**
   * 绑定, 监听事件
   * @param eventName {string} - 事件名称
   * @param callback {function} - 回调函数
   *
   * @example
   * // RAP.on
   * // 绑定监听事件
   *
   * RAP.on('Page.hello', (data) => {
   *   console.log(data);
   * });
   *
   * // 如果需要关注事件注册的结果是成功还是失败
   * RAP.on('App.hello', (data) => {
   *   console.log(data);
   * })
   * .then(result => {
   *   console.log('注册成功');
   * })
   * .catch(error => {
   *   console.log('注册失败');
   * });
   */
  on,

  /**
   * 解绑, 注销事件
   * @param eventName {string} - 事件名称
   * @param callback {function} - 回调函数
   *
   * @example
   * // 注销事件时传递对应的回调函数。此时只会注销该回调函数，其他的事件回调函数不受影响。
   * RAP.off('Page.hello', (data) => {
   *   console.log(data);
   * });
   * // 注销事件时不传递事件回调函数，此时会注销所有该事件下的回调函数。
   * RAP.off('Page.hello');
   *
   * // 如果需要关注注销事件的结果是成功还是失败
   * RAP.off('App.hello', (data) => {
   *   console.log(data);
   * })
   * .then(result => {
   *   console.log('注销成功');
   * })
   * .catch(error => {
   *   console.log('注销失败');
   * });
   */
  off,

  /**
   * 触发事件
   * @param eventName {string} - 事件名称
   * @param data {object} - 传递参数
   *
   * @example
   * let data = {msg: 'msg from Page.hello'};
   * // 仅触发事件
   * RAP.emit('Page.hello');
   *
   * // 触发事件，并发送数据
   * RAP.emit('Page.hello', data);
   *
   * // 触发事件，并希望得知触发是否成功
   * RAP.emit('Page.hello')
   * .then(result => {
   *   console.log('触发成功');
   * })
   * .catch(error => {
   *   console.log('触发失败');
   * });
   */
  emit,

  /**
   * 导航类方法
   * @param push {function} - 打开跳转页面
   * @param pop {function} - 关闭/后退页面
   * @param popTo {function} - 后退页面到指定索引或URL的页面
   * @param setTitle {function} - 定制导航栏标题
   * @param addRightItem {function} - 添加导航栏自定义按钮
   * @param removeRightItem {function} - 移除导航栏自定义按钮
   *
   * @example
   * // RAP.navigator.push
   * // 打开跳转页面
   *
   * RAP.navigator.push({
   *   url: 'https://www.1688.com', //新开页面 url
   *   title: '新开页面标题~',
   *   backgroundColor: '#ffffff', //新开导航栏背景颜色,
   *   clearTop: false, //新开页面后，是否关闭除了新页面之外的【所有其它(当前应用的)】页面
   *   animated: true, //<Boolean>: 切换时是否启用动画效果， 默认是 true
   * }).then((result) => {
   *   console.log(result);
   * }).catch((error) => {
   *   console.log(error);
   * });
   *
   * @example
   * // RAP.navigator.pop
   * // 关闭页面/后退
   *
   * RAP.navigator.pop()
   *  .then((result) => { console.log(result);})
   *  .catch((error) => { console.log(error);});
   *
   * //传入 index, animate
   * RAP.navigator.pop({
   *   index: 1,  //index >=1,
   *   animated: true //是否开启动画，默认为 true
   * }).then((result) => {
   *   console.log(result);
   * }).catch((error) => {
   *   console.log(error);
   * });
   *
   * @example
   * // RAP.navigator.popTo
   * // 后退页面到指定索引或URL的页面
   *
   * RAP.navigator.popTo({
   *   index: 1,
   *   animated: true  //默认 false
   * }).then(result => {
   *   console.log(result);
   * }).catch(error => {
   *   console.log(error);
   * });
   *
   * @example
   * // RAP.navigator.setTitle
   * // 定制导航栏标题
   *
   * RAP.navigator.setTitle({
   *   text: '页面标题',
   *   color: '#fff600', //标题颜色
   *   url: 'https://www.1688.com' //点击标题跳转链接
   * }).then(result => {
   *   console.log(result);
   * }, error => {
   *   console.log(error);
   * });
   *
   * @example
   * // RAP.navigator.addRightItem
   * // 添加导航栏自定义按钮
   *
   * //使用文字
   * RAP.navigator.addRightItem({
   *   text: "分享", //显示文字,
   *   tag: "share", //唯一标识，做删除用
   * }, () => {
   *   alert('点了分享按钮');
   * });
   *
   * //文字图标同时存在的时候， 优先使用 iconImage
   * RAP.navigator.addRightItem({
   *   text: '分享',
   *   iconImage: 'https://gw.alicdn.com/tfs/TB17CV9XEgQMeJjy0FiXXXhqXXa-36-36.png',
   * }, function () {
   *   window.alert('点了 旺旺');
   * });
   *
   * @example
   * // RAP.navigator.removeRightItem
   * // 去除自定义按钮
   *
   * RAP.navigator.removeRightItem('tagName')  //根据tag 去除右侧自定义按钮
   */
  navigator,

  /**
   * 本地持久化
   * 本地的持久化存储，有效范围为整个插件
   * @param getItem {function} - 获取数据
   * @param setItem {function} - 存储数据
   * @param removeItem {function} - 删除数据
   * @param getKeys {function} - 获取已有存储数据键
   *
   * @example
   * // RAP.localStorage.getItem
   * // 获取数据
   *
   * RAP.localStorage.getItem({
   *   keys: ['key1', 'key2', 'key3']
   * }).then((result) => {
   *   console.log(result);
   * }).catch((error) => {
   *   console.log(error);
   * });
   *
   * @example
   * // RAP.localStorage.setItem
   * // 存储数据
   *
   * RAP.localStorage.setItem({
   *   a: 'aaaaaaaaaaaaaaaaaaaaa',
   *   b: 'bbbbbbbbbbbbbbbbbbbbb',
   *   c: 'ccccccccccccccccccccc'
   * }).then((result) => {
   *   console.log(result);
   * }).catch((error) => {
   *   console.log(error);
   * });
   *
   * @example
   * // RAP.localStorage.removeItem
   * // 删除数据
   *
   * RAP.localStorage.removeItem({
   *   keys: ['key1', 'key2', 'key3']
   * }).then((result) => {
   *   console.log(result);
   * }).catch((error) => {
   *   console.log(error);
   * });
   *
   * @example
   * // RAP.localStorage.getKeys
   * // 获取已存储的键
   *
   * RAP.localStorage.getKeys()
   *   .then((result) => {console.log(result);})
   *   .catch((error) => {console.log(error);});
   *
   */
  localStorage,

  /**
   * 用户状态信息相关
   * @param getUserInfo {function} - 获取用户登录状态
   * @param login {function} - 登录
   * @param logout {function} - 登出
   *
   * @example
   * // RAP.user.getUserInfo
   * // 获取用户登录状态和用户信息
   *
   * RAP.user.getUserInfo()
   * .then((result) => {
   *   console.log(result);
   * })
   * .catch((error) => {
   *   console.log(error)
   * })；
   *
   * // 获取额外的用户信息
   * RAP.user.getUserInfo({ extraInfo: true })
   * .then((result) => {
   *   console.log(result);
   * })
   * .catch((error) => {
   *   console.log(error)
   * })；
   *
   * @example
   * // RAP.user.login
   * // 拉起登录
   *
   * RAP.user.login()
   * .then((result) => {
   *   console.log(result);
   * })
   * .catch((error) => {
   *   console.log(error)
   * });
   *
   * @example
   * // RAP.user.logout
   * // 拉起登出
   *
   * RAP.user.logout()
   * .then((result) => {
   *   console.log(result);
   * })
   * .catch((error) => {
   *   console.log(error)
   * })；
   */
  user,

  /**
   * fetch (RAX中的网络请求方法)
   *
   * @param url {string} - 请求地址
   * @param option(method) {string} - 资源请求方法('GET'|'POST')
   * @param option(mode) {string} - 请求模式（cors, no-cors, same-origin 和 jsonp）
   * @param option(dataType) {string} - 资源类型（仅在weex下支持，包括json和text两种)
   * @param option(body) {string} - 请求体
   * @param option(header) {object} - 请求头
   *
   * @example
   * fetch('./api.json', {
   *   mode: 'same-origin',
   *   dataType: 'json',
   *   method: 'GET'
   * })
   * .then((response) => {
   *   return response.json();
   * })
   * .then((data) => {
   *   console.log(data);
   * })
   * .catch((err) => {
   * // handle exception
   * });
   *
   */
  fetch,

  /**
   * 网络请求相关
   * @param request {function} - 发送MTOP请求
   * @param proxy {function} - 发送代理请求
   *
   * @example
   * // RAP.aop.request
   * // 发送请求
   *
   * const requestParams = {
   *   namespace: "cn.alibaba.open",
   *   api: "userCategory.offers.remove",
   *   version: "1",
   *   params: JSON.stringify({"offerIds":"564985083537","groupId":"96005556"})
   * }
   * // MTOP请求
   * RAP.aop.request(requestParams)
   * .then((data) => {
   *   console.log(data);
   * })
   * .catch((error) => {
   *   console.log(error);
   * })
   *
   * @example
   * // RAP.aop.proxy
   * // 发送代理请求
   *
   * const requestParams = {
   *   method: 'GET',
   *   url: 'https://devweb1688.aiyongbao.com/Autoresend/getNoResProduct?ayServer=true&sellernick=上海爱用宝软件'
   * }
   *
   * //发送代理请求
   * RAP.aop.proxy(requestParams)
   * .then((data) => {
   *   console.log(data);
   * })
   * .catch((error) => {
   *   console.log(error);
   * })
   *
   */
  aop,
  location,

  /**
   * 调用分享
   *
   * @example
   * const url = 'http://cui.m.1688.com/weex/weex_dacu/3139.html?__positionId__=weex_dacu&__pageId__=3139&__weex__=true';
   * const picUrl = 'https://gw.alicdn.com/tfs/TB1isFOcgMPMeJjy1XcXXXpppXa-750-473.jpg_10000x340q60.jpg';
   *
   * RAP.share({
   *   title: '这里是分享标题',
   *   url: url,
   *   picUrl: picUrl,
   *   content: '这里是分享内容这里是分享内容这里是分享内容',
   *   webUrl: url,
   *   formWhere: 'formWhere',
   *   companyName: 'companyName',
   *   leftButtonName: '左按钮',
   *   rightButtonName: '右按钮',
   *   address: 'address',
   *   // 分享到web的时候
   *   template: '推荐一个不错的商品，分享口令 @shareToken@，点击链接：@shareUrl@',
   *
   *   // typeQr: 当isUserToken 为false 的时候可用， WEB 【text, imgtext, web】
   *   typeQr: 'text',
   *   isUserToken: true
   * });
   */
  share,
  device,

  /**
   * 提示信息
   * @param show {function} - 显示消息
   *
   * @example
   * RAP.toast.show('Hi'); // 默认是RAP.toast.SHORT
   * RAP.toast.show('Hello', RAP.toast.SHORT); // 2秒
   * RAP.toast.show('Hello', RAP.toast.LONG);  // 3.5秒
   */
  toast: Toast,

  /**
   * 阿里旺旺
   * @param openChat(userID) {function} - 打开阿里旺旺聊天
   * @param userID {string} - 旺旺ID
   * @param sendMessage(option) {function} - 发送消息
   * @param option {object} - 发送消息参数
   *
   * @example
   * // RAP.aliwangwang.openChat
   * // 打开旺旺聊天
   *
   * RAP.aliwangwang.openChat("用户 旺旺ID")
   * .then((result) => {
   *   console.log(result);
   * }).catch((error) => {
   *   console.log(error);
   * });
   *
   * @example
   * // RAP.aliwangwang.sandMessage
   * // 发送消息
   *
   * RAP.aliwangwang.sendMessage({
   *   loginId: '123',  //旺旺id
   *   message: '消息内容'
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   *
   * @example
   * // RAP.aliwangwang.isLogin
   * // 判断是否登录
   *
   * RAP.aliwangwang.isLogin({
   *   loginId: '123'
   * })
   * .then(result => console.log(result))
   * .catch(error => console.log(error))
   *
   */
  aliwangwang,

  /**
   * 显示加载动画
   *
   * @param option(text) {string} - 加载文本
   * @param option(iconImage) {string} - 加载图片
   *
   * @example
   * RAP.showLoading({
   *  iconImage: '',
   *  text: "加载中..."
   * });
   */
  showLoading,

  /**
   * 隐藏加载动画
   *
   * @example
   * RAP.hideLoading();
   */
  hideLoading,

  /**
   * 剪贴板
   * @param getString {function} - 获取剪贴板文本数据
   *
   * @example
   * // RAP.clipdoard.getString
   * // 获取剪贴板文本数据
   *
   * RAP.clipdoard.getString((res) => {
   *   console.log(res);
   * });
   */
  clipboard,

  /**
   * 授权
   * @param goAuth {function} - 调用授权
   *
   * @example
   * RAP.sso.goAuth();
   */
  sso,

  util,
  tracelog
};

RAP.invoke = Rap.call;

export default RAP;
