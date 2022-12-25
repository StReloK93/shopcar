<template>
    <section class="h-screen flex">
        <LeftNavigartorVue></LeftNavigartorVue>
        <main class="p-4 flex-grow">
            <Router-view></Router-view>
        </main>
    </section>
    <!-- <HeaderVue></HeaderVue> -->
</template>

<script setup lang="ts">
import HeaderVue from './Header.vue'
import LeftNavigartorVue from './LeftNavigartor.vue';
</script>