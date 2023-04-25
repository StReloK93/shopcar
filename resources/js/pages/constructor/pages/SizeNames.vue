<template>
    <section>
        <div class="mb-4 flex justify-between items-center">
            <h3 class="text-gray-600 flex items-center">
                <i class="fa-light fa-cube text-pink-500 mr-3 text-xl"></i> O'lchamlar
            </h3>
            <button @click="createSize" class="mini-button">
                <i class="fa-light fa-rectangle-history-circle-plus"></i>
            </button>
        </div>
        <main v-if="SizeNames.length">
            <Sizes v-for="size in SizeNames" :key="size.id" :SizeNames="size" @deleted="deleteSizeName"></Sizes>
        </main>
    </section>
</template>

<script setup lang="ts">
import Sizes from '@/components/Sizes.vue';
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