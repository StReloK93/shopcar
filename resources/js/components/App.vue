<template>
    <section class="h-screen flex flex-col">
        <HeaderVue></HeaderVue>
        <main class="p-4 flex-grow">
            <Router-view></Router-view>
        </main>
    </section>
</template>

<script setup lang="ts">
import HeaderVue from './Header.vue';
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

@media print {
  .print{
    display: block;
  }

  .noprint{
    display: none;
  }
}
</style>