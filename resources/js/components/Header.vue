<template>
    <nav class="p-4 ">
        <div class="mr-4">
            <router-link class="underline" :to="{name: 'sale'}">Sale</router-link>
        </div>
        <div class="mr-4">
            <router-link class="underline" :to="{name: 'introduction'}">Introduction</router-link>
        </div>
        <div class="mr-4">
            <router-link class="underline" :to="{name: 'constructor'}">Constructor</router-link>
        </div>
    </nav>
</template>

