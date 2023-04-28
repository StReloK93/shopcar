<template>
    <section class="flex">
        <input ref="inputNumber" type="number" v-model="value" class="outline-none w-10 flex-grow text-center">
    </section>
</template>

<script lang="ts">
import type { ICellEditorParams } from "ag-grid-community";
import { ref, onMounted } from "vue";
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
        return { value, inputNumber, getValue: () => value.value }
    }
};
</script>