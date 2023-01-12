<template>
    <section>
        <div v-for="product in listProducts" class="border-b px-3 py-2 mb-2">
            <main class="font-bold">
                {{ product.product_names.name }} <span class="ml-5 font-normal">Size: {{ product.size.name }}</span>
            </main>

            Price: {{ product.price }}
        </div>
    </section>
</template>

<script setup lang="ts">
const { listProducts } = defineProps(['listProducts'])

</script>