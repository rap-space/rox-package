---
subtitle: 主题控制器
group: Other
---

# Theme Provider

---

## 何时使用

需要全局换肤的时候，可以通过简单修改主题变量，达到换肤的目的。


## API

### StyleProvider

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
style | 需要替换的主题变量集合 | obj | 无
androidConfigs | 安卓 md 相关配置，如{materialDesign:false,rippleEnabled:false} | obj|无

- style

  style 注入提供了主题换肤能力，使用 style 注入变量后，可以直接替换全局的颜色、大小配置。

  使用 demo:

  ````js
  import { StyleProvider } from 'nuke-theme-provider';

  let orange = {
      Core:{
          [`color-brand1-1`]: '#FFF0E6', // [主品牌色-浅]
          [`color-brand1-6`]: '#FF6A00', // [主品牌色-常规]
          [`color-brand1-9`]: '#E35300'  // [主品牌色-深]
      },

  };
  <StyleProvider style={orange}>
       <Button type="primary" style={styles.btn}>主操作</Button>
  </StyleProvider>
  ````

- androidConfigs

  androidConfigs 是为安卓定制，主要用于 MD 开关的开启、关闭。当前开放的 api 为：

  ```
  {
      materialDesign:true, // 是否启用 materialDesign 效果
      rippleEnabled:true // 是否开启水波纹特效
  }
  ```

  使用 demo:

  ````js
  import { StyleProvider } from 'nuke-theme-provider';

  <StyleProvider androidConfigs={{materialDesign：true,rippleEnabled:true}}>
       <Button type="primary" style={styles.btn}>主操作</Button>
  </StyleProvider>
  ````


  ## 附常用基础变量

```js

'color-brand1-1' :'#E4F0FD', // [主品牌色-浅]

'color-brand1-6': '#3089DC', // [主品牌色-常规]

'color-Brand1-9' :'#1170BC', // [主品牌色-深]

'color-line1-2' :'#DCDEE3', // [线条-常规]

'color-line1-3' :'#C4C6CF', // [线条-深]

'color-text1-2' :'#999999', // [文字-浅]

'color-text1-3' :'#666666', // [文字-常规]



```
