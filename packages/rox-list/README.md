---
subtitle: 列表
group: Layout
category:
chinese: 列表容器
---

# List

---

## Guide

列表容器以一致的格式来显示一组相关的内容，为一致性的类型或者一组内容指定优先顺序来体现层次感以获取更好的可读性。

## API

| 参数      | 说明                                  | 类型                | 默认值   |
| -------- | ----------------------------------- | ----------------- | ----- |
| type     | 类型: normal 普通类型; href: 带连接; select 点击可选择  | string |normal |
| title    | 标题                                  | string            |  
| titleAfterEle | 标题描述角标 | element | null |
| href | 链接只有当type为href时才会生效 | string |  |
| thumb | 左侧图标 | string |  |
| thumbHeight | 左侧图标的高度 | number | 30 | 
| brief    | 辅助描述信息,可理解为副标题，辅助信息,可接受字符串或者rax element |  string或element  |  |
| rightEle | 自定义右侧内容，支持string或者element | string或element |  |
| isSelect | 是否默认选中,type为select时生效 | bool |false| 
| disabled | 是否为disable状态(不可点击不可跳转) | bool | false|
| hasBorder | 是否显示底边线 | bool | true |
| clickHandle  | 点击Item时，会传递给List父回调函数（便于统一处理Item点击）| function(item, e) | noop  |

