<template>
    <section class="mb-2">
        <div onmousedown="return false" @click="toggle"
            :class="{'!bg-pink-500 text-white': FormData.category_id == category.id, '!bg-gray-200':isFolder}"
            class="cursor-pointer flex items-center justify-between bg-gray-100  border-b py-1">
            <span class="px-2">
                {{ category.name }}
            </span>
            <i v-if="isFolder" :class="{ 'rotate-180': category.isOpen }" class="mx-2 far fa-angle-down">
            </i>

        </div>
        <ul v-show="category.isOpen" class="pl-6" v-if="isFolder">
            <TreeItemFree class="my-2" v-for="categories in category.children_categories" :key="categories.id"
                :Categories="category.children_categories" :category="categories" :FormData="FormData">
            </TreeItemFree>
        </ul>
    </section>
</template>
<script setup lang="ts">
import { computed } from 'vue'
var { category, FormData, Categories } = defineProps({ category: Object, FormData: Object, Categories: Object })

category.isOpen = false

const isFolder = computed(() => {
    return category.children_categories && category.children_categories.length
})

function toggle() {
    if(isFolder.value){
        Categories.forEach((childCategory) => {
            if (childCategory.id == category.id) {
                childCategory.isOpen = !childCategory.isOpen
            }
            else {
                childCategory.isOpen = false
            }
        })
    }
    else{
        if(FormData.category_id == category.id) return FormData.category_id = null, FormData.category_name = null

        FormData.category_id = category.id
        FormData.category_name = category.name
    }

}
</script>