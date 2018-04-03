---
subtitle: 文本
group: General
---

# Text

Text 用于显示文本，在 web 端即 `<span>` 标签。

**注意： Text 标签不支持嵌套，嵌套使用可能会导致意想不到的结果。**

---


## API

参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----
style | 样式 | object|{display:'block',fontSize:32}
onPress | 点击事件 | function
numberOfLines| 显示的行数|number
fixedFont|字体大小是否固定，默认 false ，即跟随屏幕宽度缩放|false

### 关于 numberOfLines 控制多行文本

```js
// 超出 2 行隐藏且显示省略号
<View style={{backgroundColor: '#cccccc'}}>
  <Text numberOfLines={2}  style={{
    fontSize: 28,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    color: '#333333',
    lineHeight: 48,
    height: 48*2
    }}>
    Different from a "web app", "HTML5 app", or "hybrid app", you can use Weex to build a real mobile app.
  </Text>
</View>
```

### 关于 fixedFont

由于 rem 单位是根据屏幕宽度计算而自动缩放的：

```
750rem = 1 deviceWidth
```

因此，`<Text style={{fontSize: 28}}>123</Text>` 实际算出来的字号也是随着屏幕宽度缩放的。

某些场景下，为了避免屏幕超大、超小导致文字过大或过小，你可以选择 fixedFont 来固化字号的显示。

例如：`<Text style={{fontSize: 28}} fixedFont={true}>123</Text>` 这意味字体实际字号将被解析为：

````
web: 14px;
native iOS: 14 dp;
native android: 14 pt;
````

native 端的 `dp` `pt` 确保了字号在任何不同 dpi 的手机屏幕上显示不会发生改变。
