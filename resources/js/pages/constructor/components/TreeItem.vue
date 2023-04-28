<template>
    <li class="my-2">
        <form class="flex" @submit.prevent="updateCategory(category)">
            <div @click="toggle" :class="{'cursor-pointer': isFolder && category.disabled}" class="select-none flex items-center justify-between border-b bg-gray-50 shadow-sm flex-grow px-2 py-0.5">
                <input 
                    :class="{'!border-pink-600 shadow-inner':category.disabled == false , 'cursor-pointer': isFolder && category.disabled }" 
                    type="text" v-model="category.name" 
                    class="border-b border-transparent outline-none py-0.5 px-2 text-gray-600 disabled:!text-gray-500 disabled:select-none" 
                    :disabled="category.disabled"
                >
                <i v-if="isFolder" :class="{'rotate-180': isOpen, 'text-gray-300': category.disabled == false}" class="mx-2 far fa-angle-down"></i>
            </div>
            <main class="ml-3">
                <button v-if="category.disabled"
                    @click="category.disabled = !category.disabled" type="button"
                    class="mini-button mr-4 h-full text-cyan-500 border-cyan-500"
                >
                    <i class="fa-regular fa-pen-nib"></i>
                </button>
                <button v-else  type="submit" class="mini-button h-full text-cyan-500 border-cyan-500">
                    <i class="fa-regular fa-floppy-disk"></i>
                </button>
                <button
                    @click="addSubCategories(category)"
                    :class="{'mr-4': isFolder == false}"
                    class="mini-button h-full text-pink-500 border-pink-500"
                >
                    <i class="fa-light fa-rectangle-history-circle-plus"></i>
                </button>
                <button v-if="isFolder == false" @click="$emit('delete', category)" type="button" class="mini-button h-full text-red-500 border-red-500">
                    <i class="fas fa-times relative left-px"></i>
                </button>
            </main>
        </form>

      <ul v-show="isOpen" class="pl-6 my-3 pb-4" v-if="isFolder">
        <TreeItem class="my-2" v-for="categories in category.children_categories" :key="categories.id" :category="categories" @delete="deleteCategory"></TreeItem>
      </ul>
    </li>
  </template>
<script setup lang="ts">
import { ref, computed } from 'vue'
var { category } = defineProps({category: Object})

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

function updateCategory(category){
    if(category.name == category.oldname) return category.disabled = true
    axios.put(`/categories/${category.id}` , {name: category.name}).then(() => {
        category.disabled = true
        category.oldname = category.name
    })
}

function deleteCategory(selectedcategory){
    if(selectedcategory.children_categories.length != 0) return
    axios.delete(`/categories/${selectedcategory.id}`).then(res => {
        category.children_categories = category.children_categories.filter((categ) => categ.id != selectedcategory.id)
    })
}

function addSubCategories(category){
    axios.post('/categories/sub', category).then((res) => {
        category.children_categories.push(res.data)
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