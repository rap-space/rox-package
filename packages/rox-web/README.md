---
subtitle: 游览器
group: Layout
---

# Web

web 内嵌容器

---

## 设计思路

在 native 端使用 weex 提供的 web 组件，在 web 端使用 iframe 抹平差异。


## API

参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----
src | h5 src 地址 | string | 无

**注意，一定要声明宽高**

````js
<Web style={{width:'600rem',height:'300rem'}} src="https://m.taobao.com"></Web>
````
