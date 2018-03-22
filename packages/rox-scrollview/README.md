---
subtitle: 滚动容器
group: Layout
---

# rox-scrollview

ScrollView 是一个包装了滚动操作的组件。一般情况下需要一个确定的高度来保证 ScrollView 的正常展现。

---

## API

- 一个包装了滚动操作的组件。一般情况下需要一个确定的高度来保证 ScrollView 的正常展现。


### ScrollView

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
horizontal | 是否横向  | boolean | false
scrollEventThrottle | 在滚动过程中，scroll事件被调用的频率（默认值为100），用于滚动的节流  | number | 100
showsHorizontalScrollIndicator | 是否显示水平滚动条 | boolean | true
showsVerticalScrollIndicator | 是否显示垂直滚动条 | boolean | true
onEndReachedThreshold | 设置加载更多的偏移 | string | 500rem
onEndReached | 滚动到底部时的事件（diff 为 onEndReachedThreshold) | event | 无
