<template>
    <section class="flex">
        <button class="px-3" @click="value--">
            <i class="far fa-angle-left"></i>
        </button>
        <input type="number" ref="inputNumber" v-model="value" class="outline-none w-10 flex-grow text-center">
        <button class="px-3" @click="value++">
            <i class="far fa-angle-right"></i>
        </button>
    </section>
</template>

<script lang="ts">
import type { ICellEditorParams } from "ag-grid-community";
import { ref ,onMounted } from "vue";
type Props = {
  params: ICellEditorParams;
}

export default {
    setup(props: Props) {
        const value = ref(props.params.value)
        const inputNumber = ref()
        onMounted(() => {
            setTimeout(() => inputNumber.value.focus());
        })
        return {value, inputNumber,getValue: () => value.value}
    }
};
</script>