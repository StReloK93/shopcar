<template>
    <nav class="shadow-sm border-b p-4 flex">
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

