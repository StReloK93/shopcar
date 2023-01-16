<template>
    <section class="flex">
        <main class="w-60 flex justify-between">
            <form @submit.prevent="createProductName" class="w-full">
                <h3 class="font-bold text-xl mb-2 text-gray-600">
                    Category
                </h3>
                <!-- <TreeItemFree v-for="category in PageData.categories" :Categories="PageData.categories"
                    :category="category" :FormData="FormData">
                </TreeItemFree> -->

                <div class="mb-2">
                    <label class="text-gray-400 mb-1 flex justify-between items-center">
                        <span>Product name</span>
                        <Validate :FormData="FormData" keyname="name" :inputType="'string'"></Validate>
                    </label>
                    <input type="text" v-model="FormData.name"
                        class="text-input" placeholder="Product name"
                        :disabled="CategoryIsNull">
                </div>
                <div class="mb-2">
                    <label class="text-gray-400 mb-1 flex justify-between items-center">
                        <span>Original price</span>
                        <Validate :FormData="FormData" keyname="original_price" :inputType="'number'"></Validate>
                    </label>
                    <input type="number" v-model="FormData.original_price"
                        class="text-input" placeholder="Original price"
                        :disabled="CategoryIsNull">
                </div>
                <div class="mb-2">
                    <label class="text-gray-400 mb-1 flex justify-between items-center">
                        <span>Price</span>
                        <Validate :FormData="FormData" keyname="price" :inputType="'number'"></Validate>
                    </label>
                    <input type="number" v-model="FormData.price"
                        class="text-input" placeholder="Price"
                        :disabled="CategoryIsNull">
                </div>
                <div class="mb-2">
                    <label class="text-gray-400 mb-1 flex justify-between items-center">
                        <span>Size type</span>
                        <Validate :FormData="FormData" keyname="size_names_id" :inputType="'nullable'"></Validate>
                    </label>
                    <VueSelect :PageData="PageData" :FormData="FormData" :disabled="CategoryIsNull" />
                </div>
                <label class="text-gray-400 mb-1 flex justify-between items-center">
                    <span>Sizes</span>
                    <Validate :FormData="FormData" keyname="sizes" :value="sizesCount" :inputType="'array'"></Validate>
                </label>
                <Size :FormData="FormData"></Size>
                <button
                    :class="{ '!bg-gray-200': CategoryIsNull, '!bg-pink-500 text-white': FormComplete && CategoryIsNull == false }"
                    :disabled="CategoryIsNull" type="submit"
                    class="px-2 py-0.5 bg-gray-300 rounded-sm w-full shadow active:bg-gray-200">
                    Create
                </button>
                <div v-if="needFormComplete" class="text-rose-500 text-center mt-2">
                    It is necessary to fill in all the fields!!
                </div>
            </form>
            <!-- <Preview :PageData="PageData" :FormData="FormData" :sizesCount="sizesCount"></Preview> -->
        </main>
        <ProductNames class="ml-3 border-l border-gray-300 pl-3 " @grid-ready="(gridApi) => childGridApi = gridApi" :PageData="PageData"></ProductNames>
    </section>
</template>

<script setup lang="ts">
// import Preview from './components/PreviewIntro.vue'
import ProductNames from '@/components/Product/ProductNames.vue'
import { useProductStore } from '../../store/useProductStore'
import { reactive, computed, ref } from 'vue'
import TreeItemFree from './components/TreeItemFree.vue'
import Validate from './components/Validate.vue'
import VueSelect from './components/Select.vue'
import Size from './components/Size.vue'

const childGridApi = ref(null)
const store = useProductStore()

const needFormComplete = ref(false)

// Component Variables
const PageData = reactive({ 
    categories: [],
    sizeNames: [],
    productNames: [] 
})


const initialForm = {
    name: '',
    original_price: '',
    price: '',
    category_id: null,
    category_name: null,
    size_names_id: null,
    products: []
}

// formdata for axios
const FormData = reactive({...initialForm})

function createProductName() {
    if (FormComplete.value == false) {
        needFormComplete.value = true
        return setTimeout(() => needFormComplete.value = false, 3000);
    }
    axios.post('/productnames', FormData).then((res) => {
        // reset
        Object.assign(FormData, initialForm)

        childGridApi.value.applyTransaction({add: [res.data],addIndex: 0})

        store.productName = null
        setTimeout(() => store.productName = res.data)
    })
}


axios.all([
    axios.get('categories'),
    axios.get('sizenames'),
    axios.get('productnames')
])
.then(axios.spread((categories, sizenames, productnames) => {
    PageData.categories = categories.data
    PageData.sizeNames = sizenames.data
    PageData.productNames = productnames.data
}));


// all inputs completed
const FormComplete = computed(() => FormData.name.trim() != "" && FormData.original_price != "" && FormData.price != "" && FormData.size_names_id != null && sizesCount.value != 0)

const CategoryIsNull = computed(() => FormData.category_id == null)
const sizesCount = computed(() => {
    if (FormData.products.length == 0) return 0
    else return FormData.products.reduce((current, size) => current + +size.count, 0)
})
</script>
<style scoped src="../../assets/selected.css"></style>