<template>
  <div class="wikitext-playground">
    <h3>{{ decodeURI(title) }}</h3>
    <NSpace
      class="editform-container"
      style="width: 100%"
      :item-style="{ flex: 1 }"
    >
      <div class="textarea-container">
        <NInput
          class="wikitext-input"
          type="textarea"
          v-model:value="inputRef"
        ></NInput>
        <NButtonGroup style="width: 100%">
          <NButton style="flex: 1" type="primary" @click="handleSubmit"
            >提交答案</NButton
          >
          <NButton style="flex: 1" type="warning" @click="handleReset"
            >重置</NButton
          >
          <NButton style="flex: 1" type="info" @click="handleHelpme"
            >帮帮我！</NButton
          >
        </NButtonGroup>
      </div>
      <div class="wikitext-output">
        <iframe frameborder="0" :srcdoc="output || '等待提交……'"></iframe>
      </div>
    </NSpace>
    <div class="actions-container">
      <p>
        结果：<NTag :type="answerType">{{ answerComments }}</NTag>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, toRaw, onMounted } from 'vue'
import { NInput, NSpace, NButtonGroup, NButton, NTag } from 'naive-ui'
import { MediaWikiApi } from 'wiki-saikou'

// Types
type AwaitAble<T> = T | Promise<T>
interface WikitextSettiongs {
  apiEndpoint?: string
}

const props = withDefaults(
  defineProps<{
    key?: string
    title?: string
    files?: string
    settings?: string
  }>(),
  { title: 'Wikitext Playground', files: '{}', settings: '{}' }
)

const api = new MediaWikiApi('/api.php')
const computedFiles = computed<
  Record<string, { ext: string; content: string }>
>(() => JSON.parse(props.files))
const computedSettings = computed<Record<string, string>>(() =>
  JSON.parse(props.settings)
)

const inputRef = ref('')
const output = ref('')
const answerStatus = ref<boolean | string | null>(null)
const answerType = computed(() => {
  if (
    typeof answerStatus.value === 'undefined' ||
    answerStatus.value === null
  ) {
    return 'default'
  }
  switch (answerStatus.value) {
    case true:
      return 'success'
    case false:
      return 'error'
    default:
      return 'warning'
  }
})
const answerComments = computed(() => {
  if (
    typeof answerStatus.value === 'undefined' ||
    answerStatus.value === null
  ) {
    return '等待提交……'
  }
  switch (answerStatus.value) {
    case true:
      return '邦邦卡邦，就是这样！'
    case false:
      return '啊哦，好像不太对哦'
    default:
      return answerStatus.value?.toString() || ''
  }
})

const noop = () => {}
function getFileContent(name: string) {
  return computedFiles.value?.[name]?.content ?? ''
}
function getHookFunction(name: string): Function {
  const raw = getFileContent(`${name}.js`)?.trim()
  try {
    if (!raw) {
      throw new Error('Missing function')
    } else if (
      raw.startsWith('return function') ||
      raw.startsWith('return async function')
    ) {
      return new Function(raw)()
    } else {
      throw new Error('Invalid function')
    }
  } catch (e) {
    console.warn(`[WikitextPlayground] hook parse error ${name}:`, e)
    return noop
  }
}

// Hooks
const onBeforeMount = getHookFunction('onBeforeMount') as (ctx: {
  api: MediaWikiApi
}) => AwaitAble<void>
const onBeforeSubmit = getHookFunction('onBeforeSubmit') as (ctx: {
  api: MediaWikiApi
  input: string
}) => AwaitAble<string | undefined>
const onCheckAnswer = getHookFunction('onCheckAnswer') as (ctx: {
  api: MediaWikiApi
  input: string
  output: string
  parsedDOM: HTMLElement | null
}) => AwaitAble<boolean>

// Methods
async function handleReset() {
  answerStatus.value = null
  await onBeforeMount({ api })
  inputRef.value =
    getFileContent('default.wikitext') || getFileContent('default.wiki')
}
async function handleSubmit() {
  const wikitext =
    (await onBeforeSubmit({ api, input: inputRef.value })) || inputRef.value
  const { data } = await api.post({
    action: 'parse',
    text: wikitext,
    pst: true,
    preview: true,
    disableeditsection: true,
    disabletoc: true,
    disablelimitreport: true,
  })
  output.value = data?.parse?.text ?? ''
  const dom = new DOMParser().parseFromString(output.value, 'text/html')
  try {
    const good = await onCheckAnswer({
      api,
      input: wikitext,
      output: output.value,
      parsedDOM: dom.querySelector('.mw-parser-output'),
    })
    console.info('Answer status:', good)
    if (typeof good === 'string' || typeof good === 'boolean') {
      answerStatus.value = good
    } else {
      answerStatus.value = true
    }
  } catch (e) {
    if (typeof e === 'string') {
      answerStatus.value = e
    } else {
      console.error(e)
      answerStatus.value = e.message ?? false
    }
  }
}
async function handleHelpme() {
  const code =
    getFileContent('example.wikitext') || getFileContent('example.wiki')
  if (!code) return

  inputRef.value = code
  await handleSubmit()
}

onMounted(() => {
  handleReset()
})
</script>

<style scoped lang="sass"></style>
