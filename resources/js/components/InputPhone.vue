<template>
   <div class="flex">
      <input class="text-input w-12 mb-2 border-b font-mono bg-dark" value="+998" disabled>
      <input ref="inputNumber"
         autocomplete="off"
         inputmode="decimal"
         @input="Format.input" 
         @keydown="Format.keydown"
         @keyup="Format.caretPosition(inputNumber)"
         @click="Format.caretPosition(inputNumber)"
         class="text-input font-mono flex-grow mb-2 ml-1" required/>
   </div>
</template>
<script  lang="ts" setup>
import { ref , onMounted } from "@vue/runtime-core"
import formatter from '@/modules/uzFormatter'
const { activeNumber } = defineProps(['activeNumber'])
const Format = new formatter()
const inputNumber = ref(null)

const getValues = () => Format.allFormats(inputNumber.value.value)

defineExpose({getValues})

onMounted(() => {
   if(activeNumber) inputNumber.value.value = Format.placeholder(activeNumber.number)
   else inputNumber.value.value = Format.placeholder('')
})
</script>