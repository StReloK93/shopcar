<template>
<main v-if="FormData.sizes.length != 0" class="flex min-w-min mb-2">
    <div v-for="size in FormData.sizes" class="flex flex-col mr-1.5">
        <button type="button" @click="size.count++" class="text-center py-1 hover:bg-gray-100 rounded-sm mb-1"><i class="far fa-angle-up"></i></button>
        <aside
            :class="{'bg-pink-500 text-white': size.count != 0}"
            class="bg-gray-200 rounded-sm shadow flex flex-col items-center justify-between uppercase  overflow-hidden">
            <span class="w-9 text-center py-1 bg-gray-500 text-gray-100">
                {{ size.name }}
            </span>
            <span class="w-9 text-center py-1">
                {{ size.count }}
            </span>
        </aside>
        <button 
            type="button"
            :disabled="size.count == 0"
            @click="decrement(size)"
            :class="{'text-gray-300': size.count == 0}"
            class="text-center py-1 hover:bg-gray-100 rounded-sm mt-1">
            <i class="far fa-angle-down"></i>
        </button>
    </div>
</main>
<main v-else class="flex min-w-min mb-2">
    <div v-for="rand in 7" class="flex flex-col mr-1.5 text-gray-300">
        <button type="button" class="text-center py-1 hover:bg-gray-100 rounded-sm mb-1">
            <i class="far fa-angle-up"></i>
        </button>
        <aside class="bg-gray-200 rounded shadow flex flex-col items-center justify-between">
            <span class="w-9 text-center py-1">
                1000
            </span>
            <span class="w-9 text-center py-1 bg-gray-100 text-gray-300">
                Кол
            </span>
        </aside>
        <button type="button" class="text-center py-1 hover:bg-gray-100 rounded-sm mt-1">
            <i class="far fa-angle-down"></i>
        </button>
    </div>
</main>
</template>

<script setup lang="ts">
const { FormData} = defineProps(['FormData'])
function decrement(size){
    if(size.count > 0) size.count--
}

</script>