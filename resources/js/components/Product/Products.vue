<template>
    <section @click="$emit('close')" class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 p-8">
        <main @click.stop class="h-full w-full bg-white">
            <div class="text-right bg-gray-100 border-b">
                <button @click="$emit('close')" class="px-4 py-2 hover:bg-gray-200">
                    <i class="far fa-times text-red-500"></i>
                </button>
            </div>
        </main>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const { productName } = defineProps(['productName'])
</script>