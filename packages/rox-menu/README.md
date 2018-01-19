# rox-menu

## API
| 参数              | 说明             | 类型                     | 默认值  |
| --------------- | -------------- | ---------------------- | ---- |
| dataSource      | 菜单列表           | array<object>          | []   |
| selected        | 选中序号或是否选中的判断函数 | array<int> \| function | []   |
| onSelect        | 交互回调函数         | function               | 无    |



## Demo
```js
<Menu.List dataSource={[{
  label: '测试1',
  value: '测试1-value', // 可选
}]} />
```


