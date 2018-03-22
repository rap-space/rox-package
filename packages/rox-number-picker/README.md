---
subtitle: 数字选择器
group: Data Entry
category: UI
chinese: 数量选择
english: Number Picker
type: 基本
---

# Number Picker

数量选择

---


## API

| 参数 | 说明 | 类型 | 默认值 |
|:-----|:-----|:-----|:-----|
| value | 当前数值 | number | |
| defaultValue | 默认数值（非受限） | number | 0 |
| min | 最小值 | number | 0 |
| max | 最大值 | number | 100 |
| step | 步长 | number | 1 |
| disabled | 是否禁用 | bool | false |
| editable | 是否可以输入 | bool | true |
| autoCorrect | 是否自动修正用户输入的非法内容 | bool | false |
| onChange | 数值改变时回调函数 | function(value) | noop |
