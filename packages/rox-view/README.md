---
subtitle: 容器
group: General
---

# View

---


View 是一个容器组件，在 Native 端可以理解为 UIView ，在 web 端即 `<div>` ，它可以任意嵌套，**但嵌套层数过深可能会导致页面在安卓5.0以下或部分机型闪退**。

View 有如下默认样式，在项目中不必重复写：

````js
{
    position: 'relative',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
}
````

## API

参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----
style | 样式 | object|
onClick | 点击事件 | Function|
