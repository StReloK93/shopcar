<template>
    <section>
        <div class="mb-4 flex justify-between items-center">
            <h3 class="text-gray-600 flex items-center">
                <i class="fa-light fa-timeline text-pink-500 mr-3 text-xl"></i> Turlar
            </h3>
            <button @click="createCategory" class="px-4 py-0.5 bg-gray-100 text-pink-500 border-b border-pink-500 shadow hover:bg-gray-50 active:bg-pink-100">
                <i class="fa-light fa-rectangle-history-circle-plus"></i>
            </button>
        </div>
        <ul v-if="categories.children_categories.length">
            <TreeItem v-for="category in categories.children_categories" :key="category.id" :category="category" @delete="deleteCategory"></TreeItem>
        </ul>
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