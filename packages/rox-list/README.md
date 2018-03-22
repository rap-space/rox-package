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

| 参数       | 说明                                  | 类型                | 默认值   |
| -------- | ----------------------------------- | ----------------- | ----- |
| title    | 标题                                  | string            |       |
| hasArrow | 是否含有箭头                              | boolean           | false |
| onClick  | 点击Item时，会传递给List父回调函数（便于统一处理Item点击） | function(item, e) | noop  |
