---
subtitle: 情感化
group: Feedback
---

# Emotion

情感化页面

---

## API
参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----
type| 提示类型|string|404
feedbackText|提示文案|string|无
btnText | 按钮文案 | string |无
onPress | 点击按钮后触发回调 | function | false
jumpText|底部跳转链接文本|string|无
jumpLink|底部跳转链接|string|无

```javascript
import EmptyPage from 'rox-empty-page'

<EmptyPage type="404" feedbackText="出错了" btnText="我知道了" onPress={() => { console.log('press') }} jumpText="去首页看看" jumpLink="http://m.1688.com/" />
```
