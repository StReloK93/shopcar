<template>
    <li class="my-2">
        <div onmousedown="return false" 
            @click="selectCategory" 
            @dblclick="toggle" 
            :class="{'bg-blue-200': FormData.category_id == category.id}"
            class="cursor-pointer flex items-center justify-between bg-gray-100 w-60"
        >

            <span class="py-0.5 px-2">
                {{ category.name }}
            </span>
            <i 
                v-if="isFolder" 
                :class="{'rotate-180': category.isOpen}" 
                class="mx-2 far fa-angle-down">
            </i>

        </div>
        <ul v-show="category.isOpen" class="px-6" v-if="isFolder">
            <TreeItemFree 
                class="my-2" 
                v-for="categories in category.children_categories" 
                :key="categories.id" 
                :Categories="category.children_categories" 
                :category="categories" 
                :FormData="FormData">
            </TreeItemFree>
        </ul>
    </li>
  </template>
<script setup lang="ts">
import { computed } from 'vue'
var { category , FormData , Categories } = defineProps({category: Object, FormData: Object , Categories: Object})

category.isOpen = false

const isFolder = computed(() => {
  return category.children_categories && category.children_categories.length
})

function selectCategory(){
    FormData.category_id = category.id
}

function toggle() {

    Categories.forEach((childCategory) => {
        if(childCategory.id == category.id){
            childCategory.isOpen = !childCategory.isOpen
        }
        else{
            childCategory.isOpen = false
        }
    })
}
</script>