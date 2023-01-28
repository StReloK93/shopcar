<template>
<form @submit.prevent="confirm">
   <h3 class="text-gray-900 font-medium mb-2">{{$t('confirmPhone')}}</h3>
   <div class="text-sm mb-2 text-gray-500">
      <span class="text-xl">+{{activeNumber.fullNumber}}</span> 
      <p class="mt-2">
         {{$t('pleaseHelpme')}}
      </p>
      <p class="text-red-600">
         {{errorMessage}}
      </p>
   </div>
   <div>
      <label class="text-blue-600">{{$t('secretcode')}}</label>
      <input type="number" @input="updateValue(smskey, 6)" placeholder="------"  minlength="6" v-model="smskey" autocomplete="off" class="holy-input mb-4 text-center text-blue-700" required/>
   </div>
   <div class="flex justify-between">
      <button type="button" @click="$emit('back', 0)" class="bg-gray-200 px-2 py-1 rounded-sm shadow active:bg-gray-100">
         <i class="fal fa-long-arrow-left mr-4 relative top-px"></i> {{$t('back')}} 
      </button>
      <button class="bg-gray-200 px-2 py-1 rounded-sm shadow active:bg-gray-100">
         {{$t('next')}} <i class="fal fa-long-arrow-right ml-4 relative top-px"></i>
      </button>
   </div>
</form>
</template>
<script setup lang="ts">
import { ref } from "vue"
const { activeNumber } = defineProps(['activeNumber'])
const emit = defineEmits(['next' , 'back'])

const errorMessage = ref(null)

const phaseLoader = ref(false)

const smskey = ref('')
async function confirm(){
   phaseLoader.value = true
	const {data} = await axios.post('/sms/confirm', {phone: activeNumber.fullNumber, smskey: smskey.value})
	if(data) {
      emit('next', 2 , activeNumber)
      phaseLoader.value = false
   }
	else errorMessage.value = "Mahfiy kod to'g'ri emas"
}


function updateValue(sms , limit) {
	var text = sms.toString()
	var limit = text.substr(0,limit)
	smskey.value = limit
}
</script>
