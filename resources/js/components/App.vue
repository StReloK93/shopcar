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