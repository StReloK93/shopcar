<template>
    <section>
        <Transition name="fade">
            <div v-if="headerOpen" @click="headerOpen = false"  class="fixed top-0 left-0 w-full h-full bg-black z-[60] bg-opacity-30"></div>
        </Transition>
        <nav :class="{'!translate-x-0': headerOpen}" class="z-[70] px-3 py-2 border-l w-60 border-pink-500 shadow fixed top-0 right-0 translate-x-full h-full bg-white transition-all">
            <button
                :class="{'opacity-0': headerOpen}"
                @click="headerOpen = !headerOpen" 
                class="absolute top-0 right-full -translate-x-1 px-4 py-1.5 transition-all z-0">
                <i class="fal fa-bars text-2xl text-white"></i>
            </button>
            <div class="mr-4">
                <router-link class="underline" :to="{name: 'sale'}">Savdo</router-link>
            </div>
            <div class="mr-4">
                <router-link class="underline" :to="{name: 'introduction'}">Tovar kiritish</router-link>
            </div>
            <div class="mr-4">
                <router-link class="underline" :to="{name: 'constructor'}">Constructor</router-link>
            </div>
        </nav>
    </section>

</template>
<script setup lang="ts">
import { ref } from 'vue'
const headerOpen = ref(false)
</script>