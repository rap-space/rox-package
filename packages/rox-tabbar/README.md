---
subtitle: 导航栏
group: Layout
---

# rox-tabbar

tab 切换，常用于业务的整个布局框架。 容器切换

---

## API

#### Tabbar


| 属性                      | 说明                                       | 类型      | 默认值   |
| ----------------------- | ---------------------------------------- | ------- | ----- |
| itemStyle               | 自定义tabbar-item容器的样式，会覆盖默认样式,通过该字段可自定义设置tab导航栏的宽高及布局方式 | object  | false |
| style                   | 自定义tabbar容器的样式，会覆盖默认样式                   | object  | false |
| navTop                  | 是否顶部导航，默认为底部的tabbar，可调节到顶部               | boolean | false |
| navStyle                | 自定义tab标题栏的样式需要传入{active: {style...}, inactive: {style...}} active对应选中样式, inactive 为取消选中的样式 | object  | false |
| navScrollable           | 导航是否可滚动，如果可滚动，则不限制tab宽度，横向滚动。如果不可滚动，则每个子元素flex =1 均分父容器宽度 | boolean | false |
| iconBar                 | 是否带icon                                  | boolean | false |
| activeKey               | （必须）用于初次打开及切换到指定的tab，接收tab的key           | string  | false |
| asFramework             | 当做框架来使用，启动该项，需要业务方手动控制shouldComponentUpdate事件进行优化控制，否则会认为以简单容器形式使用，对props变更进行过滤控制 | boolean | false |
| onChange（embed模式无效）     | 切换tab时抛出prevTab和nextTab，手动更改props时不触发    | funtion | false |
| customChange（embed模式无效） | 定义内置切换tab的注入方法名称，默认为changeTo，使用方法，在tabContent中直接调用this.changeTo('tab 的key') | string  | false |
| customFocus（embed模式无效）  | 定义获得交点的hook，该方法存在tabbar在切换时会执行此方法，默认为onFoucs，在tabContent中直接定义changeTo即可，切换tab时切出为false，切入为true | string  | false |

#### 注意

* **更改state,props不生效** 默认`asFramework`配置为false，将会对非tabbar状态变更进行过滤，达到提高性能的效果。如果使用者需要通过状态变更来控制组件，请设置为true
* **embed模式** 当Tabbar.item设置 src 属性时，会启用embed模式，该模式 h5 表现为使用 iframe 加载页面，native 表现为使用 embed 加载jsBundle来加载模块， 目前只支持air域名的jsBundle


#### Tabbar.Item

| 属性                  | 说明                                       | 类型       | 默认值  |
| ------------------- | ---------------------------------------- | -------- | ---- |
| render              | 自定义渲染函数，item会传入当前是否属于活动状态 status，当前 tabkey 为参数 | function | 无    |
| tabKey              | （必须）定义该tabbar的key                        | string   | 无    |
| preventDefaultEvent | 定义是否要禁止掉默认事件                             | boolean  | 无    |
| badge               | 透出的消息数，以小角标方式显示在右上角                      | string   | 无    |
| num                 | 透出的数字，跟在tab的title后面，展示方式 title(num)      | string   | 无    |
| onPress             | 点击后事件handler                             | function | 无    |
| title               | 透出的文案                                    | string   | 无    |
| icon                | 如果tabbar 设置 iconbar=true，则此处设置有效，{src: 'xxx',selected:'xxx',size:'small/medium/large',style:{}} | object   | 无    |
| src(启用embed模式)      | 定义要加载的 jsbundle url                      | string   | 无    |




