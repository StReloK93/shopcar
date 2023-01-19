<template>
    <section>
        <ul v-if="categories.children_categories.length">
            <TreeItem v-for="category in categories.children_categories" :key="category.id" :category="category" @delete="deleteCategory"></TreeItem>
        </ul>
        <form @submit.prevent="createCategory">
            <button class="px-4 py-1.5 bg-pink-500 text-white shadow rounded-sm active:bg-gray-300 active:shadow-sm flex items-center">
                Kiritish <i class="ml-4 fa-light fa-rectangle-history-circle-plus"></i>
            </button>
        </form>
    </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import TreeItem from '@/components/TreeItem.vue';

const categories = reactive({
    children_categories: []
})

function createCategory(){
    axios.post('/categories', {name: 'category'}).then(res => {
        categories.children_categories.push(res.data)
    })
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