---
title: 字形
---

在本章节，您将学习如何使用Wikitext在文章里插入粗体与斜体文字

## 斜体

Wikitext 中，用**两个**半角引号（`''`）包裹起来的文字会变成斜体：

`''斜体''` → _斜体_

## 粗体

Wikitext 中，用**三个**半角引号（`'''`）包裹起来的文字会变成斜体：

`'''粗体'''` → **粗体**

## 斜体

聪明的你也许已经想到了，如果使用五个半角引号包裹一段文字，它会不会变得又粗又斜呢？答案是肯定的：

`'''''粗斜体'''''` → **_粗斜体_**

## 小测验

现在，你已经学会了如何在文章里插入粗体和斜体文字，尝试让下面输入框中的文字拥有对应的效果吧！

::: playground#wikitext

@file default.wikitext

```wikitext
斜体

粗体

粗斜体
```

@file example.wikitext

```wikitext
''斜体''

'''粗体'''

'''''粗斜体'''''
```

@file onCheckAnswer.js

```js
return async function ({ input, parsedDOM }) {
  if (input.includes('<i') || input.includes('<b')) {
    throw new Error('炒饭！')
  }
  return !!(
    input.includes("''") &&
    parsedDOM.querySelector('i') &&
    parsedDOM.querySelector('b') &&
    parsedDOM.querySelector('i > b')
  )
}
```

:::
