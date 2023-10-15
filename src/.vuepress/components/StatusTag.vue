<template>
  <span
    :class="['status-tag', type]"
    :style="{
      backgroundColor: color,
    }"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import {} from 'vue'
defineProps<{
  type?: string
  color?: string
}>()
</script>

<style scoped lang="sass">
.status-tag
  padding: 2px 6px
  margin: auto 2px
  user-select: none
  cursor: default
  text-transform: uppercase
  border-radius: 2px
  background-color: #888888
  color: #ffffff

  &.new,
  &.ok,
  &.success,
  &.stable,
  &.done
    background: #6cc569

  &.test,
  &.updated,
  &.dev
    background: #6bbfe9

  &.fixed
    background: #cc69e0

  &.deleted,
  &.error,
  &.fail
    background: #c22525

  &.warning,
  &.progress
    background: #ff9100

  /** GitHub Labels */
  &.level-1
    background: #ff0000

  &.level-2
    background: #ff9040

  &.level-3
    background: #6eba03

  &.level-4
    background: #dff49a
    color: #252525

  &.review
    background: #d4c5f9
    color: #252525
</style>
