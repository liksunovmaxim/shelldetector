<template>
  <q-item
    clickable
    tag="a"
    target="_blank"
    style="align-items: flex-start"
    :href="link"
  >
    <q-item-section>
      <h5 style="margin-top: 0">{{final.label}}</h5>
      <ul style="padding: 0">
        <li style="list-style-position: inside;" v-for="(item, index) in info.tth" :key="index">
          {{item}}
        </li>
      </ul>
    </q-item-section>
    <q-item-section>
      <p>{{info.description}}</p>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent, toRaw, computed } from 'vue';
import {Describer} from '../describer/describer'

export default defineComponent({
  name: 'FinalResult',
  props: {
    result: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const final = computed(() => toRaw(props.result).filter(i => (i as any).confidence === Math.max(...props.result.map(o => (o as any).confidence)))[0]) as any
    const info = computed(() => new Describer().getInfo(final.value.label as any))

    return {
      final,
      info
    }
  }
});
</script>
