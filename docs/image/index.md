# Image

- category: Component
- chinese: 图片
- type: 基础元件
- order:10
---

## API

- 类似于web img标签

### Image

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
source | 设置图片的 uri，格式{uri: '//img.alicdn.com/image.png'}  | object | 无
style | 必须设置宽高，否则默认为0,{width: '100rem',height: '100rem'} | object | {width: '0',height: '0'}
resizeMode | 决定当组件尺寸和图片尺寸不成比例的时候如何调整图片的大小。 | string | cover