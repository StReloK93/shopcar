<template>
    <section class="h-screen flex">
        <LeftNavigartorVue></LeftNavigartorVue>
        <main class="p-4 flex-grow">
            <Router-view></Router-view>
        </main>
    </section>
</template>

<script setup lang="ts">
import LeftNavigartorVue from './LeftNavigartor.vue';
</script>