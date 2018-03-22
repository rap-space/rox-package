---
subtitle: 搜索框
group: General
---

# rox-snackbar

---


## API
参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----
message|提示文本|string|无
visibile|是否可视|bool|false
actionTpl | 交互区域模板，不传则为不可交互 | tpl |无
onAction | 交互回调函数 | function | false

```javascript
import Snackbar from 'rox-snackbar'

/**
 * message String 提示文本
 * visibile Boolean 是否可视
 * actionTpl String 交互区域模板，不传则为不可交互
 * onAction Func 交互回调函数
 *
 */

<Snackbar
  message="测试提示文本"
  actionTpl={actionTpl}
  visibile={this.state.showSnackBar}
  onAction={() => {
    this.closeHandler()
  }}
    />

```
