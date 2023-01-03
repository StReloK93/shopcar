<template>
    <form class="flex items-center my-2" @submit.prevent="updateSizeName(SizeNames)">
        <div @click="toggle" :class="{ 'cursor-pointer': isFolder && SizeNames.disabled }"
            class="flex items-center justify-between bg-gray-100 w-72">
            <input
                :class="{ '!border-teal-600 shadow-inner': SizeNames.disabled == false, 'cursor-pointer': isFolder && SizeNames.disabled }"
                type="text" v-model="SizeNames.name" class="border-b border-transparent outline-none py-0.5 px-2 w-32"
                :disabled="SizeNames.disabled">
            <i v-if="isFolder" :class="{ 'rotate-180': isOpen, 'text-gray-300': SizeNames.disabled == false }"
                class="mx-2 far fa-angle-down"></i>
        </div>
        <main class="ml-2">
            <button v-if="SizeNames.disabled" @click="SizeNames.disabled = !SizeNames.disabled" type="button"
                class="text-teal-500 bg-gray-100 px-2 py-0.5 rounded-sm">
                <i class="fas fa-marker "></i>
            </button>
            <button v-else type="submit" class="text-teal-500 bg-gray-100 px-2 py-0.5 rounded-sm">
                <i class="fas fa-save"></i>
            </button>
            <button @click="addSizes(SizeNames)" class="bg-gray-100 px-2 py-0.5 rounded-sm text-teal-600 mx-2">
                <i class="far fa-layer-plus "></i>
            </button>
            <button @click="$emit('delete', SizeNames)" type="button" class="text-red-500 bg-gray-100 px-2 py-0.5 rounded-sm">
                <i class="fas fa-trash"></i>
            </button>
        </main>
    </form>
    <ul v-show="isOpen" class="px-6" v-if="isFolder">
        <li v-for="size in SizeNames.sizes">
            {{ size.name }}
        </li>
        <v-for >

        </v-for>
    </ul>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import axios from '../modules/axios'

const { SizeNames } = defineProps({ SizeNames: Object })

SizeNames.disabled = true
SizeNames.oldname = SizeNames.name
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

function addSizes(SizeNames){
    axios.post('/sizes', SizeNames).then((res) => {
        SizeNames.sizes.push(res.data)
        isOpen.value = true
    })
}


function deleteSizeNames(SizeNames) {
    axios.delete(`/sizenames/${SizeNames.id}`).then(res => {
        SizeNames.sizes = SizeNames.sizes.filter((categ) => categ.id != SizeNames.id)
    })
}
</script>

<style scoped>
input:disabled {
    background-color: inherit;
    color: inherit;
}
</style>