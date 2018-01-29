# rox-radio

- category: UI
- chinese: 单选框
- type: UI组件

---

## API

### Radio

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
checked | 是否选中,group中的选中不适用该API，而是通过value设置 | boolean | 
disabled | 是否禁用 | boolean | false
size | 大小  | string(small,medium) | medium
onChange | 状态改变时的回调函数 | function(checked,e) |
type     | 单选框类型 |string（'normal'，'list'）| normal |

### Radio.group

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
value | 当前选择的值 | any | ''
onChange | 选中值发生改变后的回调 | function(value,e) | ()=>{}
dataSource | 可选数据源 | array | []

#### 设计思路
rax中只提供了一个简单的textinput，因为会触发键盘，因此需要使用view和image结合的方式实现。从外观表现和交互逻辑上，单个radio和checkbox的表现是完全一致的。两者仅有的区别在于批量使用时。
