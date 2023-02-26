<template>
    <section class="my-2">
        <form class="flex items-center my-2" @submit.prevent="updateSizeName(SizeNames)">
            <div @click="toggle" :class="{ 'cursor-pointer': isFolder && SizeNames.disabled }"
                class="flex items-center justify-between bg-gray-100 w-72">
                <input
                    :class="{ '!border-teal-600 shadow-inner': SizeNames.disabled == false, 'cursor-pointer': isFolder && SizeNames.disabled }"
                    v-model="SizeNames.name" class="border-b border-transparent outline-none py-0.5 px-2 w-32"
                    :disabled="SizeNames.disabled">
                <i :class="{ 'rotate-180': isOpen, 'text-gray-300': SizeNames.disabled == false }"
                    class="mx-2 far fa-angle-down"></i>
            </div>
            <main v-if="SizeNames.user_id != null" class="ml-2">
                <button v-if="SizeNames.disabled" @click="SizeNames.disabled = !SizeNames.disabled" type="button"
                    class="text-teal-500 bg-gray-100 px-2 py-0.5 rounded-sm">
                    <i class="fas fa-pen-nib text-sm"></i>
                </button>
                <button v-else type="submit" class="text-teal-500 bg-gray-100 px-2 py-0.5 rounded-sm">
                    <i class="fas fa-save"></i>
                </button>
                <button @click="$emit('deleted', SizeNames)" type="button" class="text-red-500 bg-gray-100 px-2 py-0.5 ml-2 rounded-sm">
                    <i class="far fa-times"></i>
                </button>
            </main>
        </form>
        <main v-show="isOpen" class="flex items-center">
            <div v-for="size in SizeNames.sizes" :key="size.id" class="pl-1 py-0.5 bg-gray-200 mr-1.5 rounded shadow-sm border-gray-300 border flex items-center uppercase">
                <input @keydown.enter="editSize(size)" :class="{ '!border-teal-600 shadow-inner': size.disabled == false, 'cursor-pointer': size.disabled }"
                    v-model="size.name" class="border-b border-transparent outline-none py-0.5 px-1 w-10"
                    :disabled="size.disabled">
                <aside v-if="size.opened && SizeNames.user_id != null">
                    <button v-if="size.disabled" @click="size.disabled = !size.disabled" class="text-teal-500 px-2 rounded-sm">
                        <i class="fas fa-pen-nib text-sm"></i>
                    </button>
                    <button @click="editSize(size)" v-else class="text-teal-500 px-2 rounded-sm">
                        <i class="fas fa-save"></i>
                    </button>
                    <button @click="deleteSize(size)" class="text-red-500  px-2 rounded-sm">
                        <i class="far fa-times relative left-px"></i>
                    </button>
                </aside>
                <button v-if="SizeNames.user_id != null" @click="openCurrentCloseOther(SizeNames.sizes, size)" class="px-3">
                    <i v-if="size.opened" class="fal fa-angle-left"></i>
                    <i v-else class="fal fa-angle-right"></i>
                </button>
            </div>
            <button v-if="SizeNames.user_id != null" @click="createSize(SizeNames)" class="px-2 py-1 bg-gray-200 border-gray-300 border shadow rounded-sm active:bg-gray-300 active:shadow-sm">
                <i class="far fa-plus px-0.5 text-teal-600"></i>
            </button>
        </main>
    </section>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
defineEmits(['deleted'])

const { SizeNames } = defineProps({ SizeNames: Object })

SizeNames.disabled = true
SizeNames.oldname = SizeNames.name


SizeNames.sizes.forEach(size => {
    size.disabled = true
    size.opened = false
    size.oldname = size.name
})

const isOpen = ref(false)

const isFolder = computed(() => {
    return SizeNames.sizes && SizeNames.sizes.length
})

function toggle() {
    if (SizeNames.disabled == false) return
    isOpen.value = !isOpen.value
}

function updateSizeName(SizeNames) {
    if (SizeNames.name == SizeNames.oldname) return SizeNames.disabled = true
    axios.put(`/sizenames/${SizeNames.id}`, { name: SizeNames.name }).then(() => {
        SizeNames.disabled = true
        SizeNames.oldname = SizeNames.name
    })
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