<template>
  <q-item
    clickable
    tag="a"
    target="_blank"
    :href="link"
  >
    {{final.label}}
  </q-item>
</template>

<script lang="ts">
import { defineComponent, toRaw, computed } from 'vue';

export default defineComponent({
  name: 'FinalResult',
  props: {
    result: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const final = computed(() => toRaw(props.result).filter(i => (i as any).confidence === Math.max(...props.result.map(o => (o as any).confidence)))[0])

    return {
      final
    }
  }
});
</script>
