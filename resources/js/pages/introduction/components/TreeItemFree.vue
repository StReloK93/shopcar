<template>
    <section class="mb-2">
        <div 
            onmousedown="return false" 
            @click="toggle"
            :class="{'!bg-pink-500 text-white': PageData.category_id == category.id, 'border-pink-600': isFolder == false}"
            class="cursor-pointer flex-between-center py-1 w-full bg-gray-100  border-l-2"
        >
            <span class="px-2">{{ category.name }}</span>
            <i v-if="isFolder" :class="{ 'rotate-180': category.isOpen }" class="mx-2 far fa-angle-down"></i>
        </div>
        <ul v-show="category.isOpen" class="pl-6" v-if="isFolder">
            <TreeItemFree class="my-2" v-for="categories in category.children_categories" :key="categories.id"
                :Categories="category.children_categories" :category="categories" :PageData="PageData">
            </TreeItemFree>
        </ul>
    </section>
</template>
<script setup lang="ts">
import { computed } from 'vue'
var { category, PageData, Categories } = defineProps({ category: Object, PageData: Object, Categories: Object })

category.isOpen = false

const isFolder = computed(() => category.children_categories && category.children_categories.length)

function toggle() {
    if(isFolder.value){
        Categories.forEach((childCategory) => {
            if (childCategory.id == category.id) childCategory.isOpen = !childCategory.isOpen
            else childCategory.isOpen = false
        })
    }
    else{
        if(PageData.category_id == category.id) return PageData.category_id = null, PageData.category_name = null

        PageData.category_id = category.id
        PageData.category_name = category.name
    }
}
</script>