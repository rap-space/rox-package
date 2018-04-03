---
subtitle: 滑动容器
group: Layout
---

# Slip

---

## 设计思路

 使用 Mask + Transition 实现的一个滑动容器


## 何时使用

各种需要用到浮层的情况下

## API

参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----
direction | 方向,枚举值可选：ease-in,ease-in-out,ease-out,linear,cubic-bezier|strIng|200
width|浮层宽度||750
height|浮层高度|number|deviceHeight
effect | 显示的动画效果，枚举值可选：ease-in,ease-in-out,ease-out,linear,cubic-bezier|string|'ease-in-out'
maskClosable| 能否点击空白区域关闭|boolean|false
duration | 动画时长，默认 200（单位是 ms）|number|200
