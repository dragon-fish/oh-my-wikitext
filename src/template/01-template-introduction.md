---
title: 模板入门
---

## 【DEV】WikiTemplate 组件

- <WikiTemplate name='模板名' /> _(没有参数)_
- <WikiTemplate name='模板名' args='参数是字符串' />
- <WikiTemplate name='模板名' :args="['参数是数组', '第二个参数', '参数里有=号']" />
- <WikiTemplate name='模板名' :args="{ foo: '参数是对象', bar: 'baz' }" />

## 小测验

使用 <WikiTemplate name='Color' :args='["颜色", "显示文字"]' /> 模板，使下面的文字变成蓝色(blue)，就像这样：<span style="color: blue">蓝颜色</span>

::: playground#wikitext

@file default.wikitext

```wikitext
{{Color|red|红颜色}}
```

@file example.wikitext

```wikitext
{{Color|blue|蓝颜色}}
```

@file onBeforeMount.js

```js
return async function onBeforeMount(ctx) {
  console.info('onBeforeMount', ctx)
}
```

@file onBeforeSubmit.js

```js
return async function onBeforeSubmit(ctx) {
  console.info('onBeforeSubmit', ctx)
  // 在这里返回修改后的 wikitext
  return ctx.wikitext
}
```

@file onCheckAnswer.js

```js
return async function onCheckAnswer({ input, parsedDOM }) {
  if (input.includes('style=')) {
    throw new Error('嗯？没有审题哟~')
  }
  const span = parsedDOM.querySelector('span[style]')
  return /\{\{color/i.test(input) && span && span.style.color === 'blue'
}
```

:::
