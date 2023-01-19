<template>
    <nav class="text-xl border-b border-pink-300 bg-white text-gray-600 shadow">
        <main class="flex-between-center container mx-auto px-6">
            <router-link to="/" class="font-light text-pink-500"><i class="fa fa-claw-marks mr-2"></i> Ruzzifer</router-link>
            <aside class="flex text-2xl leading-none">
                <router-link class="border-y-2 border-transparent px-3 py-4 block" :to="{ name: 'sale' }">
                    <i class="fal fa-shopping-bag"></i>
                </router-link>
                <router-link class="border-y-2 border-transparent px-3 py-4 block mx-2" :to="{ name: 'introduction' }">
                    <i class="fal fa-scroll-old"></i>
                </router-link>
                <router-link class="border-y-2 border-transparent px-3 py-4 block" :to="{ name: 'constructor' }">
                    <i class="fal fa-cog"></i>
                </router-link>
            </aside>
        </main>
    </nav>
</template>