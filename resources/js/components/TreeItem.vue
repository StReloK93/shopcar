<template>
    <li class="my-2">
        <form class="flex items-center" @submit.prevent="updateCategory(category)">
            <div @click="toggle" class="flex items-center justify-between bg-gray-100 w-80">
                <input :class="{'!border-teal-600 shadow-inner':category.disabled == false }" type="text" v-model="category.name" class="border-b border-transparent outline-none py-0.5 px-2" :disabled="category.disabled">
                <i v-if="isFolder" :class="{'rotate-180': isOpen, 'text-gray-300': category.disabled == false}" class="mx-2 far fa-angle-down"></i>
            </div>
            <main class="ml-3">
                <button v-if="category.disabled" @click="category.disabled = !category.disabled" type="button" class="text-teal-500 bg-gray-100 px-2 py-0.5 rounded-sm">
                    <i class="fas fa-marker "></i>
                </button>
                <button v-else  type="submit" class="text-teal-500 bg-gray-100 px-2 py-0.5 rounded-sm">
                    <i class="fas fa-save"></i>
                </button>
                <button @click="deleteCategory(category)" type="button" class="text-red-500 bg-gray-100 px-2 py-0.5 rounded-sm mx-2">
                    <i class="fas fa-trash"></i>
                </button>
                <button @click="addSubCategories(category)" class="bg-gray-100 px-2 py-0.5 rounded-sm text-teal-600">
                    <i class="far fa-layer-plus "></i>
                </button>
            </main>
        </form>

      <ul v-show="isOpen" class="px-4" v-if="isFolder">
        <TreeItem class="my-2" v-for="categories in category.children_categories" :key="categories.id" :category="categories"></TreeItem>
      </ul>
    </li>
  </template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import axios from '../modules/axios'

const { category, categories } = defineProps({category: Object, categories: Object})
category.disabled = true
category.oldname = category.name
const isOpen = ref(false)

const isFolder = computed(() => {
  return category.children_categories && category.children_categories.length
})

function toggle() {
    if(category.disabled == false) return
    isOpen.value = !isOpen.value
}

function changeType() {
  if (!isFolder.value) {
    category.children_categories = []
    isOpen.value = true
  }
}

function updateCategory(category){
    if(category.name == category.oldname) return category.disabled = true
    axios.put(`/categories/${category.id}` , {name: category.name}).then(() => {
        category.disabled = true
        category.oldname = category.name
    })
}

function deleteCategory(category){

    console.log(category);
    
    axios.delete(`/categories/${category.id}`).then(res => {
        categories.list = categories.list.filter(categ => categ.id != category.id)
    })
}

function addSubCategories(category){
    axios.post('/categories/sub', category).then(() => {
        category.children_categories.push({ name: category.name })
        isOpen.value = true
    })
}
</script>

<style scoped>
input:disabled {
    background-color: inherit;
    color: inherit;
}

</style>