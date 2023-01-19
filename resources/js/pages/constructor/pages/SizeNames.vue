<template>
    <section>
        <main v-if="SizeNames.length">
            <SizesVue v-for="size in SizeNames" :key="size.id" :SizeNames="size" @deleted="deleteSizeName"></SizesVue>
        </main>
        <form @submit.prevent="createSize">
            <button class="px-4 py-1.5 bg-pink-500 text-white shadow rounded-sm active:bg-gray-300 active:shadow-sm flex items-center">
                Kiritish <i class="ml-4 fa-light fa-ruler-triangle"></i>
            </button>
        </form>
    </section>
</template>

<script setup lang="ts">
import SizesVue from '@/components/Sizes.vue';
import { ref } from 'vue';
const SizeNames = ref([])


axios.get('sizenames').then((res) => SizeNames.value = res.data)

function createSize(){
    axios.post('sizenames').then((res) => SizeNames.value.push(res.data))
}

function deleteSizeName(size){
    axios.delete(`/sizenames/${size.id}`).then(() => {
        SizeNames.value = SizeNames.value.filter((sizeName) => sizeName.id != size.id)
    })
}
</script>