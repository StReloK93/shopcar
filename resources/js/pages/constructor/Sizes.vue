<template>
    <section>
        <h3>
            Sizes
        </h3>
        <main v-if="sizes.length">
            <div v-for="size in sizes">
                {{ size.name }}
            </div>
        </main>
        <div>
            <form @submit.prevent="addSize">
                <button class="px-2 py-1 bg-gray-200 shadow rounded active:bg-gray-300 active:shadow-sm">
                    <i class="fal fa-plus-circle"></i>
                </button>
            </form>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from '../../modules/axios';

const sizes = ref([])

function addSize(){
    axios.post('sizenames').then((res) => {
        sizes.value.push(res.data)
    })
}


axios.get('sizenames').then((res) => {
    sizes.value = res.data
})

</script>