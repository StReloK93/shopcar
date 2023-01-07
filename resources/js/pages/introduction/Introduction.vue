<template>
    <section class="bg-gray-100 p-3 shadow">
        <h3 class="font-bold text-xl mb-3 text-gray-600">
            Introduction
        </h3>
        <form @submit.prevent="createProductName" class="w-72">
            <div class="mb-2">
                <label class="text-gray-400 mb-1 inline-block">Product name</label>
                <input 
                    type="text" 
                    v-model="FormData.name"
                    class="border-b border-gray-200 w-full outline-none py-1 px-2" 
                    placeholder="Name"
                >
            </div>
            <div class="mb-2">
                <label class="text-gray-400 mb-1 inline-block">Category name</label>
                <TreeItemFree 
                    v-for="category in PageData.categories" 
                    :Categories="PageData.categories" 
                    :category="category" 
                    :FormData="FormData"
                >
                </TreeItemFree>
            </div>
            <div class="mb-2">
                <label class="text-gray-400 mb-1 inline-block">Size type</label>
                <Select :PageData="PageData" :FormData="FormData"></Select>
            </div>
            <label class="text-gray-400 mb-1 inline-block">Sizes</label>
            <Size :FormData="FormData"></Size>
            <button type="submit" class="px-2 py-0.5 bg-gray-300 rounded-sm w-full shadow active:bg-gray-200">
                Create
            </button>
        </form>
    </section>
</template>

<script setup lang="ts">
import TreeItemFree from './components/TreeItemFree.vue'
import Size from './components/Size.vue'
import Select from './components/Select.vue'
import { reactive } from 'vue'
import axios from '../../modules/axios'

const PageData: any = reactive({
    categories: [],
    sizeNames: [],
})

const FormData: any = reactive({
    name: '',
    category_id: null,
    size_names_id: null,
    sizes: []
})

function createProductName() {
    console.log(FormData);

}
axios.all([axios.get('categories'), axios.get('sizenames')]).then(axios.spread((categories, sizenames) => {
    PageData.categories = categories.data
    PageData.sizeNames = sizenames.data
}));
</script>
<style scoped>
:deep(.selects) {
    --vs-colors--lightest: rgba(60, 60, 60, 0.26);
    --vs-colors--light: rgba(60, 60, 60, 0.5);
    --vs-colors--dark: #333;
    --vs-colors--darkest: rgba(0, 0, 0, 0.15);

    /* Search Input */
    --vs-search-input-color: inherit;
    --vs-search-input-bg: rgb(255, 255, 255);
    --vs-search-input-placeholder-color: #aaa;

    /* Font */
    --vs-font-size: 1rem;
    --vs-line-height: 1.4;

    /* Disabled State */
    --vs-state-disabled-bg: rgb(248, 248, 248);
    --vs-state-disabled-color: var(--vs-colors--light);
    --vs-state-disabled-controls-color: var(--vs-colors--light);
    --vs-state-disabled-cursor: not-allowed;

    /* Borders */
    --vs-border-color: var(--vs-colors--lightest);
    --vs-border-width: 0px;
    --vs-border-style: solid;
    --vs-border-radius: 0px;

    /* Actions: house the component controls */
    --vs-actions-padding: 4px 6px 0 3px;

    /* Component Controls: Clear, Open Indicator */
    --vs-controls-color: var(--vs-colors--light);
    --vs-controls-size: 1;
    --vs-controls--deselect-text-shadow: 0 1px 0 #fff;

    /* Selected */
    --vs-selected-bg: #f0f0f0;
    --vs-selected-color: var(--vs-colors--dark);
    --vs-selected-border-color: var(--vs-border-color);
    --vs-selected-border-style: var(--vs-border-style);
    --vs-selected-border-width: var(--vs-border-width);

    /* Dropdown */
    --vs-dropdown-bg: #fff;
    --vs-dropdown-color: inherit;
    --vs-dropdown-z-index: 1000;
    --vs-dropdown-min-width: 160px;
    --vs-dropdown-max-height: 350px;
    --vs-dropdown-box-shadow: 0px 0px 1px 0px #eee;

    /* Options */
    --vs-dropdown-option-bg: #000;
    --vs-dropdown-option-color: var(--vs-dropdown-color);
    --vs-dropdown-option-padding: 3px 20px;

    /* Active State */
    --vs-dropdown-option--active-bg: #5897fb;
    --vs-dropdown-option--active-color: #fff;

    /* Deselect State */
    --vs-dropdown-option--deselect-bg: #fb5858;
    --vs-dropdown-option--deselect-color: #fff;

    /* Transitions */
    --vs-transition-timing-function: cubic-bezier(1, -0.115, 0.975, 0.855);
    --vs-transition-duration: 150ms;
}
</style>