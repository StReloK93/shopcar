<template>
    <section>
        <h3>Sizes</h3>
        <main v-if="SizeNames.length">
            <SizesVue v-for="size in SizeNames" :key="size.id" :SizeNames="size" @deleted="deleteSizeName"></SizesVue>
        </main>
        <form @submit.prevent="createSize">
            <button class="px-2 py-1 bg-gray-200 shadow rounded active:bg-gray-300 active:shadow-sm flex items-center">
                New Size <i class="fal fa-plus-circle ml-3 relative top-[2px]"></i>
            </button>
        </form>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from '../../modules/axios';
import SizesVue from '../../components/Sizes.vue';


const SizeNames = ref([])

function createSize(){
    axios.post('sizenames').then((res) => {
        SizeNames.value.push(res.data)
    })
}


axios.get('sizenames').then((res) => {
    SizeNames.value = res.data
})


function deleteSizeName(size){
    axios.delete(`/sizenames/${size.id}`).then(() => {
        SizeNames.value = SizeNames.value.filter((sizeName) => sizeName.id != size.id)
    })
}
</script>