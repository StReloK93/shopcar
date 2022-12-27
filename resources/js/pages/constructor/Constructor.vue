<template>
    <section>
        <HeaderVue></HeaderVue>
        <router-view></router-view>
    </section>
</template>

<script setup lang="ts">
import HeaderVue from './Header.vue';
</script>