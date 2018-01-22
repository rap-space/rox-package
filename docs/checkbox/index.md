# Checkbox

- category: UI
- chinese: 复选框
- type: UI组件

---

## API

### Checkbox

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
checked | 是否选中，如果在group中需使用value设置是否选中 | boolean | 
disabled | 是否禁用 | boolean | false
onChange | 状态改变时的回调函数 | function(checked,e) |
type     | 复选框类型 |string（'normal'，'list'）| normal |
defaultChecked | 默认选中状态 | boolean | false 
### Checkbox.group

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
value | 当前选择的值 | array | []
onChange | 选中值发生改变后的回调 | function(value,e) | ()=>{}
dataSource | 可选数据源，数据源的结构见demo | array | []

#### 设计思路
rx中只提供了一个简单的textinput，因为会触发键盘，因此需要使用view和image结合的方式实现。从外观表现和交互逻辑上，单个radio和checkbox的表现是完全一致的。两者仅有的区别在于批量使用时，radio需要做到互斥。