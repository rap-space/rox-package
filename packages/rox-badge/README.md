# {英文组件名}

- category: 布局/表单/...
- chinese: {中文描述}

---

## Guide

这里您可以编写组件的开发指南。

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
