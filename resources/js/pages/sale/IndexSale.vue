<template>
    <section>
        Sale
        <ListProducts v-if="PageData.listProducts.length" :listProducts="PageData.listProducts"></ListProducts>
    </section>
</template>

<script setup lang="ts">
import axios from '../../modules/axios';
import { reactive ,watch, computed  } from 'vue';
import ListProducts from './components/ListProducts.vue'
const PageData = reactive({
    code: "",
    reading: false,
    textInBarcode: '',
    listProducts: [],
})

const textinBarcode = computed(() => PageData.textInBarcode)

watch(textinBarcode , (currentValue) => {
    const productId = currentValue.replace('product','');
    console.log(productId)
    axios.get(`products/${productId}`).then((res) => {
        console.log(res.data);
        PageData.listProducts.push(res.data)
    })
})





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
            
            PageData.code = "";
            PageData.reading = false;
        }, 200);  //200 works fine for me but you can adjust it
    }
});
</script>