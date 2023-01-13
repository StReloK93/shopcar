<template>
    <section class="relative">
        <div>
            Sale
        </div>
        <ListProducts 
            v-if="PageData.listProducts.length"
            @close="closeListProducts"
            :setProductId="setProductId" 
            :listProducts="PageData.listProducts"
        />
    </section>
</template>

<script setup lang="ts">
import axios from '../../modules/axios'
import { reactive , watch , computed  } from 'vue'
import ListProducts from './components/ListProducts.vue'
const PageData = reactive({
    code: "",
    reading: false,
    textInBarcode: null,
    listProducts: [],
    blocker: true,
})

const textinBarcode = computed(() => PageData.textInBarcode)

watch(textinBarcode , (currentValue) => {
    if(currentValue == null) return
    
    if(PageData.blocker){
        
        PageData.blocker = false
        // textdan IDni ajratib olamiz
        const productId = currentValue.replace('product','')
        const product = PageData.listProducts.find(product => product.id == productId)

        // Agar bor bo'lsa
        if(product) {
            if(product.count > product.totalCount) product.totalCount++
            return PageData.blocker = true
        }



        // yangi tovar bolsa
        axios.get(`products/${productId}`).then((res) => {
            PageData.blocker = true
            res.data.totalCount = 1
            PageData.listProducts.push(res.data)
        })
    }
})


function closeListProducts(){
    PageData.listProducts = []
    PageData.blocker = true
}


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
    else PageData.code += event.key //while this is not an 'enter' it stores the every key            
    

    //run a timeout of 200ms at the first read and clear everything
    if (!PageData.reading) {
        PageData.reading = true
        setTimeout(() => {
            PageData.textInBarcode = PageData.code

            setTimeout(() => PageData.textInBarcode = null)
            
            PageData.code = ""
            PageData.reading = false
        }, 100)  //200 works fine for me but you can adjust it
    }
})
</script>