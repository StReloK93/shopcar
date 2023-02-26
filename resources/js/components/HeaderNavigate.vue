<template>
    <nav class="text-xl border-b border-pink-300 bg-white text-gray-600 shadow">
        <main v-if="auth.user.active" class="flex-between-center container mx-auto px-6">
            <router-link to="/" class="text-pink-500"><i class="fa fa-claw-marks mr-2"></i>{{ auth.user.active.name }}</router-link>
            <aside class="flex text-2xl leading-none">
                <router-link class="border-y-2 border-transparent px-3 py-4 block" :to="{ name: 'sale' }">
                    <i class="fa-light fa-cart-circle-arrow-up"></i>
                </router-link>
                <router-link class="border-y-2 border-transparent px-3 py-4 block mx-2" :to="{ name: 'introduction' }">
                    <i class="fa-light fa-laptop-arrow-down"></i>
                </router-link>
                <router-link class="border-y-2 border-transparent px-3 py-4 block" :to="{ name: 'constructor' }">
                    <i class="fa-light fa-screwdriver-wrench"></i>
                </router-link>
                <router-link class="border-y-2 border-transparent px-3 py-4 block" :to="{ name: 'shops' }">
                    <i class="fa-light fa-tags"></i>
                </router-link>

                <button class="border-y-2 border-transparent px-3 py-4 block" @click="auth.logout">
                    <i class="fa-light fa-arrow-right-from-bracket"></i>
                </button>
            </aside>
        </main>
        <main v-else class="flex-between-center container mx-auto px-6 py-4">
            Do'kon tanlang
        </main>
    </nav>
</template>
<script lang="ts" setup>
import { useAuthStore } from '@/store/useAuthStore'
const auth = useAuthStore()
</script>