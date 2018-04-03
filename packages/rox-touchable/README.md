---
subtitle: 可点击元素
group: General
---

# Touchable

Touchable 定义简单的 touch 事件。

---


## API

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
onPress | 点击事件  | function(e) |
activeStyle | 手指按下时的样式  | object |


使用示例：

```javascript
<Touchable style={{backgroundColor:'#3089dc',height:'80rem',justifyContent:'center',alignItems:'center'}} activeStyle={{backgroundColor:'#cccccc'}}>Hello Nuke</Touchable>
```
