<template>
    <section>
        Sale
        <svg id="barcode" class="w-32"></svg>
    </section>
</template>

<script setup lang="ts">
import axios from '../../modules/axios'
import JsBarcode from 'JsBarcode'
import { onMounted } from 'vue';

axios.get('productnames').then((res) => {
    console.log(res.data);
    
})

onMounted(() => {
    JsBarcode("#barcode", "1234", {
        width: 1.5,
        height: 50,
        displayValue: false
    });
})
</script>