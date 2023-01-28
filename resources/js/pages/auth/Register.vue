<template>
	<aside class="bg-inherit shadow-none flex-center">
		<section class="w-96 p-4 bg-white relative">
			<h3 class="text-gray-900 text-2xl mb-4 text-center">{{$t('register')}}</h3>
			<transition name="fade" mode="out-in">
				<PhaseOne 	:activeNumber="activeNumber" @next="next"   				v-if="phase == 0"/>
				<PhaseTwo 	:activeNumber="activeNumber" @next="next"   @back="back" 	v-else-if="phase == 1"/>
				<PhaseThree :activeNumber="activeNumber" 				@back="back" 	v-else-if="phase == 2" />
			</transition>
			<div class="mt-5 flex justify-center">
				<span  class="w-2 h-2 mx-2 rounded-full bg-pink-500"></span>
				<span :class="{'bg-pink-500 border-none': phase == 1 || phase == 2}" class="w-2 h-2 mx-2 rounded-full border"></span>
				<span :class="{'bg-pink-500 border-none': phase == 2}" class="w-2 h-2 mx-2 rounded-full border"></span>
			</div>
		</section>
	</aside>
</template>
<script setup lang="ts">
import { ref } from "@vue/runtime-core"
import PhaseOne from './phaseOne.vue'
import PhaseTwo from './phaseTwo.vue'
import PhaseThree from './phaseThree.vue'

const activeNumber = ref(null)
const phase = ref(0)

function back(num){
	phase.value = num
}

function next(index, number){
	activeNumber.value = number
	phase.value = index
}
</script>