<template>
    <section class="w-72">
        <main class="bg-pink-500 p-1 text-center text-white">
            {{ FormData.category_name }} <span class="invisible">|</span>
        </main>

        <main class="flex justify-between px-3 py-1 border-b">
            <div>Product name</div>
            <span>{{ FormData.name }}</span>
        </main>
        <main class="flex justify-between px-3 py-1 border-b">
            <div>Original price</div>
            <span>{{ FormData.original_price }}</span>
        </main>
        <main class="flex justify-between px-3 py-1 border-b">
            <div>Price</div>
            <span>{{ FormData.price }}</span>
        </main>
        <main  class="flex justify-between px-3 py-1 border-b">
            <div>Size type</div>
            <span v-if="sizeName">{{ sizeName.name }}</span>
        </main>
        <main class="flex justify-between px-3 py-1 border-b">
            <div>Product count</div>
            <span>{{ sizesCount }}</span>
        </main>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const sizeName = computed(() => {
    if(PageData.sizeNames.length) {
        return PageData.sizeNames.find((size) => size.id == FormData.size_names_id)
    }
    else return null
    
})


const { FormData , PageData, sizesCount } = defineProps(['FormData','PageData','sizesCount'])

</script>