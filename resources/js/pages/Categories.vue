<template>
    <section class="p-4">
        <h2 class="flex justify-between mb-3">
            <span>
                Categories
            </span>
        </h2>
        <form @submit.prevent="createCategory" class="flex mb-3">
            <input v-model="categories.name" class="border-b outline-none flex-grow p-2" required>
            <button type="submit" class="bg-gray-200 px-2">+ Add</button>
        </form>
        <ul v-if="categories.list.length">
            <TreeItem v-for="category in categories.list" :key="category.id" :category="category" :categories="categories"></TreeItem>
        </ul>
    </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import TreeItem from '@/components/TreeItem.vue';
import axios from '../modules/axios'

const categories = reactive({
    name: '',
    list: []
})

function createCategory(){
    axios.post('/categories', {name: categories.name}).then(res => {
        categories.list.push(res.data)
    })

    categories.name = ""
}

axios.get('/categories').then(res => {
    categories.list = res.data
})
</script>