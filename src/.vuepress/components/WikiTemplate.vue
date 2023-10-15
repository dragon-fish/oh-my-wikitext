<template>
  <span>
    <span>{{ lb }}&nbsp;</span>
    <strong class="tl-name">{{ name }}</strong>
    <span v-if="typeof args === 'string'"> | {{ args }} </span>
    <span v-else-if="Array.isArray(args)">
      <span v-for="(val, index) in args">
        | {{ val.includes('=') ? `${index + 1} = ` : '' }}{{ val }}
      </span>
    </span>
    <span v-else-if="typeof args === 'object'">
      <span v-for="(val, key) in args"> | {{ key }} = {{ val }}</span>
    </span>
    <span>&nbsp;{{ rb }}</span></span
  >
</template>

<script setup lang="ts">
import {} from 'vue'

const props = defineProps<{
  name: string
  args?: string | string[] | Record<string, string>
}>()

const lb = '{{'
const rb = '}}'
</script>

<style scoped lang="sass">
.tl-name
  font-weight: 700
  text-decoration: underline
</style>
