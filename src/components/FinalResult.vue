<template>
  <q-item
    clickable
    tag="a"
    target="_blank"
    :href="link"
  >
    {{finalRes.label}}
  </q-item>
</template>

<script lang="ts">
import { defineComponent, toRaw } from 'vue';

export default defineComponent({
  name: 'FinalResult',
  props: {
    result: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const maxValue = toRaw(Math.max(...props.result.map(o => (o as any).confidence)));
    const finalRes = toRaw(props.result).filter(i => (i as any).confidence === maxValue)[0]

    return {
      finalRes
    }
  }
});
</script>
