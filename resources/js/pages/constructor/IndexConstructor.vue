<template>
    <section class="flex">
        <ConstructorHeader></ConstructorHeader>
        <router-view class="pl-4"></router-view>
    </section>
</template>

<script setup lang="ts">
import ConstructorHeader from './components/Header.vue';
</script>