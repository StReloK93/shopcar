<template >
   <form @submit.prevent="sendMessage">
      <h3 class="text-gray-900 font-medium text mb-2">{{ $t('inputphone') }}</h3>
      <p class="text-red-600">
         {{ config.error }}
      </p>
      <div>
         <label class="text-gray-600 inline-block text-xs mb-2">{{ $t('phone') }}</label>
         <PhoneNumber :activeNumber="activeNumber" ref="phoneInput" />

         <div class="mt-8 flex justify-between">
            <router-link to="/login"
               class="bg-gray-200 px-2 py-1 rounded-sm shadow active:bg-gray-100">
               <i class="fal fa-sign-in mr-4"></i> {{ $t('enter') }}
            </router-link>
            <button class="bg-gray-200 px-2 py-1 rounded-sm shadow active:bg-gray-100">
               {{ $t('next') }} <i class="fal fa-long-arrow-right ml-4 relative top-px"></i>
            </button>
         </div>
      </div>
   </form>
</template>
<script setup lang="ts">
import { reactive, ref } from "@vue/runtime-core"
import PhoneNumber from '../../components/InputPhone.vue'

const { activeNumber } = defineProps(['activeNumber'])

const emit = defineEmits(['next'])
const config = reactive({ error: null, loader: false })

const phoneInput = ref()


function sendMessage() {
   const numbers = phoneInput.value.getValues()


   if (numbers.isValid) {

      config.error = null
      config.loader = true
      axios.post('/sms/sendmessage', { phone: numbers.fullNumber })
         .then(res => {

            config.error = null
            config.loader = false
            emit('next', 1, numbers)

         },
            error => {

               const errors = error.response.data.errors
               if ('phone' in errors) config.error = errors.phone[0]
               config.loader = false

            })

      config.loader = false
   }

   else {
      config.error = "Telefon raqami to'liq kiritilmagan"
      config.loader = false
   }

}
</script>
