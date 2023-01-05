<template>
    <section>
        <main class="w-96">
            <h2 class="flex justify-between mb-3">
                <span>
                    Categories
                </span>
            </h2>
        </main>
        <ul v-if="categories.children_categories.length">
            <TreeItem v-for="category in categories.children_categories" :key="category.id" :category="category" @delete="deleteCategory"></TreeItem>
        </ul>
        <form @submit.prevent="createCategory">
            <button class="px-2 py-1 bg-gray-200 shadow rounded-sm active:bg-gray-300 active:shadow-sm flex items-center">
                New Category <i class="fal fa-plus-circle ml-3 relative top-[2px]"></i>
            </button>
        </form>
    </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import TreeItem from '@/components/TreeItem.vue';
import axios from '../../modules/axios'

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