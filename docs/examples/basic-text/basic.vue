<template>
  <BasicText truncated :width="300" style="width: 600px">
    The object-oriented nature of JavaScript is important to understand if you want to go further
    with your knowledge of the language and write more efficient code, therefore we've provided this
    module to help you.
  </BasicText>
  <br />
  <br />
  <BasicText truncated :line-clamp="2" :width="300" style="width: 600px">
    JavaScript frameworks are an essential part of modern front-end web development, providing
    developers with tried and tested tools for building scalable, interactive web applications. Many
    modern companies use frameworks as a standard part of their tooling, so many front-end
    development jobs now require framework experience. In this set of articles, we aim to give you a
    comfortable starting point to help you begin learning frameworks.
  </BasicText>
</template>

<script setup lang="ts">
import { BasicText } from '@center/components'
</script>
