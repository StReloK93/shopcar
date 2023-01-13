<template>
    <section class="relative">
        <div>
            Sale
        </div>
        <ListProducts 
            v-if="PageData.listProducts.length"
            @close="PageData.listProducts = []"
            :setProductId="setProductId" 
            :listProducts="PageData.listProducts"
        />
        <main>
            <button @click="setProductId(10)" class="bg-gray-300 px-3 mr-2 rounded-sm shadow-sm">Product 10</button>
            <button @click="setProductId(85)" class="bg-gray-300 px-3 mr-2 rounded-sm shadow-sm">Product 85</button>
            <button @click="setProductId(86)" class="bg-gray-300 px-3 mr-2 rounded-sm shadow-sm">Product 86</button>
            <button @click="setProductId(87)" class="bg-gray-300 px-3 mr-2 rounded-sm shadow-sm">Product 87</button>
            <button @click="setProductId(94)" class="bg-gray-300 px-3 mr-2 rounded-sm shadow-sm">Product 94</button>
        </main>

    </section>
</template>

<script setup lang="ts">
import axios from '../../modules/axios';
import { reactive ,watch, computed  } from 'vue';
import ListProducts from './components/ListProducts.vue'
const PageData = reactive({
    code: "",
    reading: false,
    textInBarcode: null,
    listProducts: [],
})

const textinBarcode = computed(() => PageData.textInBarcode)

watch(textinBarcode , (currentValue) => {
    if(currentValue == null) return
    
    const productId = currentValue.replace('product','');
    const contain = PageData.listProducts.find((product) => product.id == productId)
    
    if(contain) {
        if(contain.count > contain.totalCount) contain.totalCount++
        return
    }
    axios.get(`products/${productId}`).then((res) => {
        res.data.totalCount = 1
        PageData.listProducts.push(res.data)
    })
})



function setProductId(id){
    PageData.textInBarcode = `product${id}`
    setTimeout(() => PageData.textInBarcode = null)
}


document.addEventListener('keypress', event => {
    //usually scanners throw an 'Enter' key at the end of read
    if (event.keyCode === 13) {
        if (PageData.code.length > 6) {


        }
    } 
    else PageData.code += event.key; //while this is not an 'enter' it stores the every key            
    

    //run a timeout of 200ms at the first read and clear everything
    if (!PageData.reading) {
        PageData.reading = true;
        setTimeout(() => {
            PageData.textInBarcode = PageData.code

            setTimeout(() => PageData.textInBarcode = null)
            
            PageData.code = ""
            PageData.reading = false
        }, 200);  //200 works fine for me but you can adjust it
    }
});
</script>