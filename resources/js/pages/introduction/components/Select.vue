<template>
    <vSelect class="selects mb-2" :options="PageData.sizeNames" @update:modelValue="update"
        :reduce="sizeNames => sizeNames.id" v-model="FormData.size_names_id" label="name" placeholder="Tanlang">
    </vSelect>
</template>

<script setup lang="ts">
const { FormData, PageData } = defineProps(['FormData', 'PageData'])
function update(selected) {
    FormData.products = []
    if (selected == null) return
    const { sizes } = PageData.sizeNames.find(sizeName => sizeName.id == selected)

    sizes.forEach((size: any) => {
        FormData.products.push({
            id: size.id,
            name: size.name,
            count: 0,
        })
    });
}
</script>