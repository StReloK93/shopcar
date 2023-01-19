<template>
    <section class="flex flex-col">
        <main class="flex items-center pt-1 pb-2 border-b">
            <router-link :to="{name: 'categories'}" class="mr-4"><i class="fa-light fa-rectangle-history"></i> Turlar</router-link>
            <router-link :to="{name: 'sizes'}" class="mr-4"><i class="fa-light fa-ruler-triangle"></i> O'lchamlar</router-link>
        </main>
        <router-view class="flex-grow"></router-view>
    </section>
</template>

<script setup lang="ts">
import ConstructorHeader from './components/Header.vue';
</script>