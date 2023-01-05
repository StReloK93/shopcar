<template>
    <section>
        <form @submit.prevent="createProductName" class="w-60">
            <div>
                <input type="text" v-model="FormData.name" class="border-b border-gray-200 w-full outline-none py-0.5 px-2" placeholder="name">
            </div>
            <div>
                <ul v-if="PageData.categories.length">
                    <TreeItemFree v-for="category in PageData.categories" :key="category.id" :Categories="PageData.categories" :category="category" :FormData="FormData"></TreeItemFree>
                </ul>
            </div>
            <div>
                <v-select :options="PageData.sizeNames" :reduce="sizeNames => sizeNames.id" v-model="FormData.size_names_id" label="name"></v-select>
                <!-- <select v-if="PageData.categories.length" v-model="FormData.size_names_id" class="border-b border-gray-200 w-full outline-none p-0.5">
                    <option value="" disabled selected>Tanlang</option>
                    <option v-for="sizeName in PageData.sizeNames" :value="sizeName.id">{{ sizeName.name }}</option>
                </select> -->
            </div>
            <button type="submit" class="px-2 py-0.5 bg-gray-200 mt-1 rounded-sm w-full shadow-sm active:bg-gray-300">
                Create
            </button>
        </form>
    </section>
</template>

<script setup lang="ts">
import TreeItemFree from '../../components/TreeItemFree.vue'
import vSelect from 'vue-select'
import { reactive } from 'vue'
import axios from '../../modules/axios'
import 'vue-select/dist/vue-select.css'

const PageData:any = reactive({
    categories: [],
    sizeNames: []
})

const FormData = reactive({
    name: '',
    category_id: null,
    size_names_id: null,
})

function createProductName(){
    console.log(FormData);
    
}

axios.get('categories').then((res) => PageData.categories = res.data)
axios.get('sizenames').then((res) => PageData.sizeNames = res.data)


</script>

<style scoped>
* {-webkit-tap-highlight-color: rgba(0, 0, 0, 0)}
</style>