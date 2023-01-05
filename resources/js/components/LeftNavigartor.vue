<template>
    <nav class="w-32 shadow-sm border-r h-screen p-4">
        <div class="mb-2">
            <router-link class="underline" :to="{name: 'home'}">Home</router-link>
        </div>
        <div class="mb-2">
            <router-link class="underline" :to="{name: 'constructor'}">Constructor</router-link>
        </div>
        <div class="mb-2">
            <router-link class="underline" :to="{name: 'introduction'}">Introduction</router-link>
        </div>
        <!-- <router-link :to="{name: 'reception'}">reception</router-link> -->
    </nav>
</template>
<script setup lang="ts">

</script>

