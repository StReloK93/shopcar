<template>
    <section class="my-2">
        <form class="flex" @submit.prevent="emit('updated', SizeNames)">
            <div @click="toggle" :class="{ 'cursor-pointer': isFolder && SizeNames.disabled }" class="select-none flex items-center justify-between border-b bg-gray-50 shadow-sm flex-grow px-2 py-0.5">
                <input
                    :class="{ '!border-pink-600 shadow-inner': SizeNames.disabled == false, 'cursor-pointer': isFolder && SizeNames.disabled }"
                    v-model="SizeNames.name" class="border-b border-transparent outline-none py-0.5 px-2 text-gray-600 disabled:text-gray-500"
                    :disabled="SizeNames.disabled">
                <i :class="{ 'rotate-180': isOpen, 'text-gray-300': SizeNames.disabled == false }"
                    class="mx-2 far fa-angle-down transition-all text-pink-500"></i>
            </div>
            <main v-if="SizeNames.shop_id != null" class="ml-4">
                <button v-if="SizeNames.disabled"
                    @click="SizeNames.disabled = !SizeNames.disabled" type="button"
                    class="mini-button mr-4 h-full text-cyan-500 border-cyan-500">
                    <i class="fa-regular fa-pen-nib"></i>
                </button>
                <button v-else type="submit" class="mini-button h-full mr-4">
                    <i class="fas fa-save"></i>
                </button>
                <button v-if="SizeNames.shop_id != null" @click="createSize(SizeNames)" class="mini-button h-full mr-4 text-pink-500 border-pink-500">
                    <i class="fa-light fa-rectangle-history-circle-plus"></i>
                </button>
                <button @click="emit('deleted', SizeNames)" type="button" class="mini-button h-full">
                    <i class="far fa-times"></i>
                </button>
            </main>
        </form>
        <main v-show="isOpen" class="flex items-center flex-wrap w-full ml-3 text-gray-500 my-3">
            <div v-for="size in SizeNames.sizes" :key="size.id" class="bg-gray-100 border-b border-pink-500 mb-2 text-gray-600 mr-3 flex items-center pl-1.5 pr-0">
                <input @keydown.enter="editSize(size)" :class="{ '!border-teal-600 shadow-inner': size.disabled == false, 'cursor-pointer': size.disabled }"
                    v-model="size.name" class="border-b border-transparent outline-none py-0.5 px-1 w-12"
                    :disabled="size.disabled">
                <aside v-if="SizeNames.shop_id != null && size.opened">
                    <button v-if="size.disabled" @click="size.disabled = !size.disabled" class="text-pink-500 px-1.5 rounded-sm">
                        <i class="fas fa-pen-nib text-sm"></i>
                    </button>
                    <button @click="editSize(size)" v-else class="text-pink-500 px-2 rounded-sm">
                        <i class="fas fa-save"></i>
                    </button>
                    <button @click="deleteSize(size)" class="text-red-500  px-2 rounded-sm">
                        <i class="far fa-times relative left-px"></i>
                    </button>
                </aside>
                <button v-if="SizeNames.shop_id != null" @click="openCurrentCloseOther(SizeNames.sizes, size)" class="px-2 hover:bg-gray-200">
                    <i v-if="size.opened" class="fal fa-angle-left"></i>
                    <i v-else class="fal fa-angle-right"></i>
                </button>
            </div>
        </main>
    </section>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
const emit = defineEmits(['deleted', 'updated'])
const { SizeNames } = defineProps({ SizeNames: Object })

SizeNames.sizes.forEach(size => {
    size.disabled = true
    size.opened = false
    size.oldname = size.name
})

const isOpen = ref(false)

const isFolder = computed(() => SizeNames.sizes?.length)

function toggle() {
    if (SizeNames.disabled == false) return
    isOpen.value = !isOpen.value
}

function createSize(SizeNames){
    axios.post('/sizes', SizeNames).then((res) => {
        SizeNames.sizes.push(res.data)
        isOpen.value = true
    })
}

function editSize(currentSize){
    if (currentSize.name == currentSize.oldname) return currentSize.disabled = true
    axios.put(`/sizes/${currentSize.id}`, currentSize).then(() => {
        currentSize.disabled = true
    })
}

function deleteSize(currentSize){
    axios.delete(`/sizes/${currentSize.id}`).then(() => {
        SizeNames.sizes = SizeNames.sizes.filter((size) => size.id != currentSize.id)
    })
}

function openCurrentCloseOther(sizeArray, currentSize){
    if(currentSize.opened) return currentSize.opened = false

    sizeArray.forEach(size => {
        if(size.id == currentSize.id) size.opened = true
        else size.opened = false
    });
}
</script>