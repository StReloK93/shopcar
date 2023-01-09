<template>
    <section class="h-screen flex p-4">
        <section v-if="$state.products">
          {{ $state.products }}
        </section>
        <HeaderVue class="w-32"></HeaderVue>
        <Router-view class="flex-grow"></Router-view>
    </section>
</template>

<script setup lang="ts">
import HeaderVue from './Header.vue'
import { useProductsStore } from '../store/ProductPrint';
const { $state } = useProductsStore()
</script>
<style>
@page {
  margin: 0mm 0mm 0mm 0mm;
}

.male {
  box-sizing: border-box;
  height: 29.5mm;
  width: 40mm;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

@media print {
  .print{
    display: block;
  }

  .noprint{
    display: none;
  }
}
</style>