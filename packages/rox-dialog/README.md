# rox-dialog

- category: UI
- chinese: 对话框

---

### 说明
包含 默认 Dialog 组件，另外还有订制的 `Dialog.Alert`, `Dialog.Confirm`

## Guide

Dialog 的实现方式是通过Weex 中的 Mask 标签进行包装实现, 使用方式如下：



## API - Dialog

| 参数      | 说明                                     | 类型          | 默认值 |
|-----------|------------------------------------------|---------------|--------|
| contentStyle   | 触发元素       | Element        |   |
| triggerType   | 触发行为，可选 `hover/click`       | string        | hover  |
| align | 气泡框位置，可选 `t,r,b,l,tl,tr,rt,rb,bl,br,lt,lb` | string        | t    |
| closable | 是否有关闭按钮 |  bool        | true   |
| visible   | 用于手动控制浮层显隐                     | boolean       | false  |
| onClose   | 关闭时触发回调                     | function       |   |
| afterClose   | 关闭后触发回调                     | function       | false  |



## API - Dialog.Alert

| 参数      | 说明                                     | 类型          | 默认值 |
|-----------|------------------------------------------|---------------|--------|
| titleText   | 标题文字                 | String       | 温馨提醒  |
| disabledTitle   | 禁用标题                 | Boolean       | false  |
| okText   | 确认文字                     | String       | 确定  |




## API - Dialog.Confirm

| 参数      | 说明                                     | 类型          | 默认值 |
|-----------|------------------------------------------|---------------|--------|
| titleText   | 标题文字                 | String       | 温馨提醒  |
| okText   | 确认文案                 | String       | 确定  |
| cancelText   | 取消文案                     | String       | 取消  |




## 事例方法

通过 ref 的方式获取当前 组件，调用 内部 的方法，控制 对话框 的展示与隐藏

| 参数      | 说明                                     | 类型          | 默认值 |
|-----------|------------------------------------------|---------------|--------|
| show   | 展示对话框      | Function       |   |
| hide   | 隐藏对话框      | Function       |   |




