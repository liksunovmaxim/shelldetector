<template>
  <div class="w-3/4 m-auto">
    <div style="margin: 8px;">
      <h3 class="text-2xl text-green-800" style="margin-top: 0; text-align: center;">Виберiть або сфотографуйте</h3>
      <div style="max-width: 300px; margin-bottom: 40px;">
        <q-file v-model="fileRef" color="light-green-5" glossy bg-color="green-6" filled label="Вибрати файл">
          <template v-slot:prepend>
            <q-icon name="attachment" color="light-green-5" />
          </template>
        </q-file>
      </div>

      <div v-if="!isStreaming">
        <q-btn @click="openCamera" color="green-6" glossy label="Вiдкрити камеру"  />
      </div>
      <div v-else class="flex justify-between">
        <q-btn @click="stopStreaming" color="black" glossy label="Зупинити cтрiм" />
        <q-btn @click="snapshot" color="black" glossy label="Фото"/>
      </div>
      <video ref="videoRef" autoplay="true" width="100" id="video" />
      <div
        class="bg-gray-300 h-64 w-64 rounded-lg shadow-md bg-cover bg-center"
      >
        <img
          :src="urlRef"
          ref="imgRef"
          style="height: 340px; max-width: 350px"
        />
        <final-result v-if="result.length > 0" :result="result" />
      </div>
      
      <q-btn @click="detectImage" color="green-6" glossy label="Визначити снаряд" />
      
      <div v-if="result.length > 0">
        <p>{{ result[0].class }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Ref, ref, watch } from 'vue';
import { defineComponent } from 'vue';
import { imageClassifierFactory } from '../classifier';
import FinalResult from 'components/FinalResult.vue';

const video = document.getElementById('video') as HTMLVideoElement;
const img = document.getElementById('video') as HTMLImageElement;
const classifier = imageClassifierFactory();
const url = 'ТМ-62М.png'

export default defineComponent({
  name: 'App',
  components: {FinalResult},
  setup() {
    const imgRef = ref(img);
    const fileRef = ref<HTMLVideoElement>(video)
    const urlRef = ref<any>(url)
    const videoRef = ref<HTMLVideoElement>(video);
    const isStreaming = ref(false);
    const result = ref([]) as Ref<any[]>;

    async function openCamera() {
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
          isStreaming.value = true;

          videoRef.value.srcObject = stream;
        });
      }
    }

    async function detectImage() {
      const cl = await classifier;
      const img = imgRef.value;
      const res = await cl.classifyByImage(img);
      result.value = res;
    }

    function stopStreaming() {
      const stream = videoRef.value.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.map((track) => track.stop());
      isStreaming.value = false;
    }

    function snapshot() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

      ctx.drawImage(videoRef.value, 0, 0, 400, 400);
      const data = canvas.toDataURL('image/png');
   
      imgRef.value.setAttribute('src', data);
    }

    function blobToBase64(blob:Blob) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        }
        reader.readAsDataURL(blob);
      })
    }

    watch(fileRef, val => {
      blobToBase64(val as any).then(res => {
        urlRef.value = res
      })
    });

    return {
      imgRef,
      result,
      isStreaming,
      videoRef,
      openCamera,
      stopStreaming,
      snapshot,
      detectImage,
      fileRef,
      urlRef
    };
  },
});
</script>

<style lang="scss">
  .q-field__native {
    color: white;
  }
</style>