---
subtitle: 按钮
group: General
category: UI
chinese: 按钮
type: UI组件
---

# Button

- 通过设置 Button 的属性来产生不同的按钮样式

---

## API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|------------------------------------------|---------------|--------|
| trigger | 触发元素 | Element | |
| triggerType | 触发行为，可选 `hover/click` | string | hover |
| align | 气泡框位置，可选 `t,r,b,l,tl,tr,rt,rb,bl,br,lt,lb` | string | t |
| closable | 是否有关闭按钮 | bool | true |
| visible | 用于手动控制浮层显隐 | boolean | false |
| onClose | 关闭时触发回调 | function | |
| afterClose | 关闭后触发回调 | function | false |
