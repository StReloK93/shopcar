<template>
    <section class="flex">
        <main class="w-64 border-r pr-4">
            <router-link :to="{name: 'categories'}" class="sizes flex justify-between items-center py-1.5 px-2 mb-2">
                <span>Turlar</span>
                <i class="fa-light fa-timeline"></i>
            </router-link>
            <router-link :to="{name: 'sizes'}" class="sizes flex justify-between items-center py-1.5 px-2 mb-2">
                <span>O'lchamlar</span>
                <i class="fa-light fa-cube mr-0.5"></i>
            </router-link>
        </main>
        <router-view class="pl-4 w-[calc(100%-16rem)]"></router-view>
    </section>
</template>

<script setup lang="ts">
</script>