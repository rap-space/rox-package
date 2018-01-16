# rox-menu

## API
参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----
list|菜单列表|array<string>|无
selectedIndex|选中序号|number|1
onSelect | 交互回调函数 | function | 无


```js
<Menu
  list={['货品名', '订单号', '测试1', '测试2']}
  selectedIndex={1}
  onSelect={(index, text, list) => console.log(index, text, list)}
  />
```
