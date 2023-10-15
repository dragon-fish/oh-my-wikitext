---
title: 沙盒
---

::: playground#wikitext

@file default.wikitext

```wikitext
随便玩玩！
```

@file example.wikitext

```wikitext
在这里填入参考答案
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
return async function onCheckAnswer(ctx) {
  console.info('onCheckAnswer', ctx)
  // 返回布尔值，或者抛出异常
  throw new Error('抛出错误并附带说明')
}
```

:::
