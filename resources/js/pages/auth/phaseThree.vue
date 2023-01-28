<template>
   <form @submit.prevent="register">
      <!-- Error Info -->
      <p class="text-red-600">{{ PageData.errorMessage }}</p>

      <div>
         <label class="text-gray-600 text-xs">{{ $t('shopName') }}</label>
         <input v-model="form.name" class="holy-input" required />
      </div>
      <div>
         <label class="text-gray-600 text-xs">{{ $t('password') }}</label>
         <input type="password" autocomplete="off" minlength="6" v-model="form.password" class="holy-input" required />
      </div>
      <div>
         <label class="text-gray-600 text-xs">{{ $t('confirmPassword') }}</label>
         <input type="password" autocomplete="off" minlength="6" v-model="form.password_confirmation" class="holy-input"
            required />
      </div>
      <div class="text-right mb-4 text-xs mt-2">
         <!-- <router-link to="/login" class="hover:text-blue-500 text-blue-400">{{ $t('registerAll') }}</router-link> -->
      </div>
      <div class="flex justify-between">
         <button type="button" @click="$emit('back', 0)"
            class="bg-gray-200 border border-gray-200 text-center shadow-sm rounded text-gray-800 px-4 py-1.5">
            <i class="fal fa-long-arrow-left mr-4 relative top-px"></i> {{ $t('back') }}
         </button>
         <button class="bg-button  text-center shadow-sm rounded text-white px-4 py-1.5 ml-5">
            {{ $t('confirm') }} <i class="fal fa-check ml-2"></i>
         </button>
      </div>
   </form>
</template>
<script setup lang="ts">
import { getDevice } from "@/modules/helpers"
import { reactive } from "vue"
import { useAuthStore } from "@/store/useAuthStore"
const { activeNumber } = defineProps(['activeNumber'])
const store = useAuthStore()
const PageData = reactive({
   errorMessage: "",
   phaseLoader: false
})

const form = reactive({
   name: "",
   password: "",
   password_confirmation: "",
   phone: activeNumber.fullNumber,
   device: getDevice()
})

async function register() {
   PageData.phaseLoader = true
   store.register(form)
      .then(res => {

         PageData.errorMessage = ""
         PageData.phaseLoader = false

      },
         error => {

            const error_data = error.response.data.errors
            PageData.errorMessage = error_data.password[0]
            PageData.phaseLoader = false

         })
}
</script>
