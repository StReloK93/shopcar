<template>
	<form class="bg-inherit shadow-none flex-center" @submit.prevent="login">
		<section class="w-96 w-full bg-white shadow-md relative p-4">
			<h3 class="text-gray-900 text-2xl text-center">{{$t('singup')}}</h3>
			<p class="text-xs text-center text-gray-300 my-4">{{$t('loginDesc')}} <router-link class="underline" to="/register">{{$t('registered')}}</router-link></p>
			<p class="text-red-600">
				{{errorMessage}}
			</p>
			<label class="text-gray-600 inline-block text-xs mb-2">{{$t('phone')}}</label>
			<PhoneNumber ref="phoneInput"/>
			<div>
				<label for="password" class="text-gray-400 text-xs">{{$t('password')}}</label>
				<input id="password" type="password" minlength="6" v-model="password" autocomplete="off" required class="text-input"/>
			</div>
			<div class="text-right mb-4 text-xs mt-2">
				<router-link to="#" class="hover:text-blue-500 text-blue-400">{{$t('passwordforget')}}</router-link>
			</div>
			<div class="flex justify-between items-center">
				<router-link to="/register" class="!bg-gray-200 px-2 py-1 bg-gray-300 rounded-sm shadow active:bg-gray-200">{{$t('register')}}</router-link>
				<button type="submit" class="!bg-gray-200 px-2 py-1 bg-gray-300 rounded-sm shadow active:bg-gray-200"><i class="fal fa-sign-in mr-4"></i>  {{$t('enter')}}</button>
			</div>
		</section>
	</form>
</template>
<script setup lang="ts">
import { getDevice } from "@/modules/helpers"
import { ref , Ref} from "@vue/runtime-core"
import PhoneNumber from '@/components/InputPhone.vue'
import { useAuthStore } from "@/store/useAuthStore"
const phoneInput: Ref<HTMLInputElement | null> = ref(null)// html teg
const store = useAuthStore()

const errorMessage = ref("")
const password = ref("")

async function login(){
	// @ts-ignore
	const numbers = phoneInput.value.getValues()
	if(numbers.isValid){
		const data = await store.login({phone: numbers.fullNumber , password: password.value , device: getDevice()})

		if(data != null && data.message) {
			errorMessage.value = data.message
		}
		else {
			errorMessage.value = ""
		}
	}
	else errorMessage.value = "Telefon raqami to'liq kiritilmagan"
	
}
</script>