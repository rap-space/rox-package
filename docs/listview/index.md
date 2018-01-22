# ListView

- category: UI
- chinese: 列表
- type: UI组件

---



## 何时使用

一个页面 ListView 列表

## API



### ListView

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
renderHeader | 头部  | function | 无
renderFooter | 底部 | function  | 无
renderRow | 渲染单行的方法 | function | 无
dataSource | 数据源 |array |无
onEndReached | 加载到底部时触发 的事件 | 原onloadmore 事件 |无
onEndReachedThreshold | 加载更多的位移设置量 | string | 500rem