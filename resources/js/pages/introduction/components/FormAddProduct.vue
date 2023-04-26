<template>
    <form @submit.prevent="createProductName" class="w-60">
        <div class="mb-2 flex justify-between text-gray-400">
            <button
                @click="qrCodeStore.setQrcode(false)"
                :class="{'bg-pink-500 text-white': qrCodeStore.getQrcode == false }"
                type="button"
                class="bg-gray-100 hover:opacity-60 active:bg-pink-500 active:text-white w-7 shadow-sm rounded-sm">
                <i class="fa-sharp fa-light fa-qrcode"></i>
            </button>
            <button
                @click="qrCodeStore.setQrcode(true)"
                :class="{'bg-pink-500 text-white': qrCodeStore.getQrcode }"
                type="button"
                class="bg-gray-100 hover:opacity-60 active:bg-pink-500 active:text-white w-7 shadow-sm rounded-sm">
                <i class="fa-light fa-barcode-read"></i>
            </button>
        </div>
        <section @click="setSelectCategory(false)" v-if="PageData.selectCategory" class="full-absolute items-start z-[100] p-8">
            <main @click.stop class="bg-white min-w-[630px] w-[900px] max-h-full border-t-2 border-pink-500 px-4 py-3 relative">
                <button @click="setSelectCategory(false)" type="button" class="absolute top-0 right-0 hover:bg-gray-100">
                    <i class="far fa-times py-3 px-4 text-red-600"></i>
                </button>
                <h3 class="font-bold text-xl mb-2 text-gray-600">
                    Mahsulot turini tanlang
                </h3>
                <TreeItemFree v-for="category in PageData.categories" :Categories="PageData.categories" :category="category"
                    :PageData="PageData">
                </TreeItemFree>
            </main>
        </section>

        <div class="mb-2 cursor-pointer">
            <label class="text-gray-400 mb-1 flex-between-center">
                <span>Mahsulot turi</span>
            </label>
            <main @click="setSelectCategory(true)">
                <div v-if="PageData.category_name" class="text-input rounde-sm bg-pink-500 text-white">
                    <span class="font-semibold">{{ PageData.category_name }}</span>
                </div>
                <div v-else class="text-input px-0 flex-between-center">
                    Tanlang
                    <i class="fas fa-exclamation text-red-500 mr-0.5"></i>
                </div>
            </main>
        </div>
        <div class="mb-2">
            <label class="text-gray-400 mb-1 flex-between-center">
                <span>Mahsulot nomi</span>
                <Validate :FormData="FormData" keyname="name" :inputType="'string'"></Validate>
            </label>
            <input type="text" v-model="FormData.name" class="text-input" placeholder="Mahsulot nomi" :disabled="CategoryIsNull">
        </div>
        <div class="mb-2">
            <label class="text-gray-400 mb-1 flex-between-center">
                <span>Tan narxi</span>
                <Validate :FormData="FormData" keyname="original_price" :inputType="'number'"></Validate>
            </label>
            <input type="number" v-model="FormData.original_price" class="text-input" placeholder="Tan narxi" :disabled="CategoryIsNull">
        </div>
        <div class="mb-2">
            <label class="text-gray-400 mb-1 flex-between-center">
                <span>Sotiladigan narxi</span>
                <Validate :FormData="FormData" keyname="price" :inputType="'number'"></Validate>
            </label>
            <input type="number" v-model="FormData.price" class="text-input" placeholder="Sotiladigan narxi" :disabled="CategoryIsNull">
        </div>
        <div class="mb-2">
            <label class="text-gray-400 mb-1 flex-between-center">
                <span>O'lcham turi</span>
                <Validate :FormData="FormData" keyname="size_names_id" :inputType="'nullable'"></Validate>
            </label>
            <VueSelect :PageData="PageData" :FormData="FormData" :disabled="CategoryIsNull" />
        </div>
        <label class="text-gray-400 mb-1 flex-between-center">
            <span>O'lchamlar</span>
            <Validate :FormData="FormData" keyname="sizes" :value="sizesCount" :inputType="'array'"></Validate>
        </label>
        <Size class="-mx-4 px-4" :FormData="FormData"></Size>
        <button
            :class="{ '!bg-gray-200': CategoryIsNull, '!bg-pink-500 text-white': FormComplete && CategoryIsNull == false }"
            :disabled="CategoryIsNull" type="submit"
            class="px-2 py-0.5 bg-gray-300 rounded-sm w-full shadow active:bg-gray-200">
            Kiritish
        </button>
        <div v-if="needFormComplete" class="text-rose-500 text-center mt-2">
            Malumotlar to'liq kiritilmagan
        </div>
    </form>
</template>

<script setup lang="ts">
import { reactive, computed, ref , watch} from 'vue'
import { useProductStore } from '@/store/useProductStore'
import { useQrCodeStore } from '@/store/useQrCodeStore'
import TreeItemFree from './TreeItemFree.vue'
import Validate from './Validate.vue'
import VueSelect from './Select.vue'
import Size from './Size.vue'
const store = useProductStore()
const qrCodeStore = useQrCodeStore()

const emit = defineEmits(['create-product'])

// Component Variables
const PageData = reactive({
    categories: [],
    sizeNames: [],
    selectCategory: false,
    category_id: null,
    category_name: null,
})

function setSelectCategory(boolean){
    PageData.selectCategory = boolean
}

axios.all([axios.get('categories'),axios.get('sizenames')]).then(axios.spread((categories, sizenames) => {
    PageData.categories = categories.data
    PageData.sizeNames = sizenames.data
}))

const initialForm = {
    name: '',
    original_price: '',
    price: '',
    size_names_id: null,
    products: [],
    category_id: null,
}

const needFormComplete = ref(false)
const FormData = reactive({ ...initialForm })

watch(() => PageData.category_id, (current) => {
    PageData.selectCategory = false
})

function createProductName() {
    if (FormComplete.value == false) {
        needFormComplete.value = true
        return setTimeout(() => needFormComplete.value = false, 3000);
    }
    FormData.category_id = PageData.category_id
    axios.post('/productnames', FormData).then(({ data }) => {
        Object.assign(FormData, initialForm)
        emit('create-product', data)

        if(qrCodeStore.getQrcode){
            store.productName = null
            setTimeout(() => store.productName = data)
        }
        else{
            store.productQrName = null
            setTimeout(() => store.productQrName = data)
        }
    })
}


// all inputs completed
const FormComplete = computed(() => FormData.name.trim() != "" && FormData.original_price != "" && FormData.price != "" && FormData.size_names_id != null && sizesCount.value != 0)

const CategoryIsNull = computed(() => PageData.category_id == null)
const sizesCount = computed(() => {
    if (FormData.products.length == 0) return 0
    else return FormData.products.reduce((current, size) => current + +size.count, 0)
})
</script>