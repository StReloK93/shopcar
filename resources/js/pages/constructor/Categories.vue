<template>
    <section>
        <h2 class="flex justify-between mb-3">
            <span>
                Categories
            </span>
        </h2>
        <form @submit.prevent="createCategory" class="flex mb-3">
            <input v-model="categories.name" class="border-b outline-none flex-grow p-2" required>
            <button type="submit" class="bg-gray-200 px-2">+ Add</button>
        </form>
        <ul v-if="categories.children_categories.length">
            <TreeItem v-for="category in categories.children_categories" :key="category.id" :category="category" @delete="deleteCategory"></TreeItem>
        </ul>
    </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import TreeItem from '@/components/TreeItem.vue';
import axios from '../../modules/axios'

const categories = reactive({
    name: '',
    children_categories: []
})

function createCategory(){
    axios.post('/categories', {name: categories.name}).then(res => {
        categories.children_categories.push(res.data)
    })

    categories.name = ""
}

function deleteCategory(category){
    axios.delete(`/categories/${category.id}`).then(() => {
        categories.children_categories = categories.children_categories.filter((categ) => categ.id != category.id)
    })
}


axios.get('/categories').then(res => {
    categories.children_categories = res.data
})
</script>