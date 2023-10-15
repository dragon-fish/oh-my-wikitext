<template>
  <div
    class="monaco-editor"
    ref="containerRef"
    :data-filename="props.filename"
  ></div>
</template>

<script setup lang="ts">
import { ref, shallowRef, onMounted, nextTick, onUnmounted } from 'vue'
import { createModel } from './monaco'
import * as monaco from 'monaco-editor'
import { effect } from 'vue'

const props = defineProps<{
  value: string
  filename?: string
  theme?: string
}>()
const emit = defineEmits<{
  'update:value': [string]
  monaco: [monaco.editor.IStandaloneCodeEditor]
  'on:focus': []
  'on:blur': []
}>()
const containerRef = ref<HTMLElement>()
const instance = shallowRef<monaco.editor.IStandaloneCodeEditor | null>(null)
const isFocused = ref(false)
let model: monaco.editor.ITextModel
let observer: ResizeObserver | null = null

onMounted(async () => {
  await nextTick()
  const container = containerRef.value!
  model = createModel(props.value)
  instance.value = monaco.editor.create(container, {
    model,
    theme: props.theme || 'vs-dark',
    tabSize: 2,
  })
  emit('monaco', instance.value)

  model.onDidChangeContent(() => {
    emit('update:value', model.getValue())
  })
  instance.value.onDidFocusEditorText(() => {
    isFocused.value = true
  })
  instance.value.onDidBlurEditorText(() => {
    isFocused.value = false
  })

  observer = new ResizeObserver(() => {
    instance.value?.layout()
  })
  observer.observe(container)
})

effect(() => {
  if (instance.value && props.value !== model.getValue() && !isFocused.value) {
    model.setValue(props.value)
  }
})
effect(() => {
  if (instance.value && props.filename) {
    const language = getLanguage(props.filename)
    monaco.editor.setModelLanguage(model, language)
    console.info('set language', props.filename, language)
  }
})
effect(() => {
  if (instance.value && props.theme) {
    monaco.editor.setTheme(props.theme)
  }
})
effect(() => {
  // @ts-ignore
  emit(isFocused.value ? 'on:focus' : 'on:blur')
})

function getLanguage(filename: string) {
  const index = filename.lastIndexOf('.')
  const extension = index === -1 ? '' : filename.slice(index)
  for (const language of monaco.languages.getLanguages()) {
    if (language.extensions?.includes(extension)) return language.id
  }
  return 'plaintext'
}

onUnmounted(() => {
  if (instance.value) instance.value.dispose()
  if (observer) observer.disconnect()
})
</script>

<style scoped lang="sass">
.monaco-container
  height: 80vh
</style>
