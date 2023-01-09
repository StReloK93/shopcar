<template>
    <i v-if="inputType == 'string' && FormData[keyname].trim() != ''" class="fal fa-check text-teal-600"></i>
    <i v-else-if="inputType == 'number' && FormData[keyname] != ''" class="fal fa-check text-teal-600"></i>
    <i v-else-if="inputType == 'nullable' && FormData[keyname] != null" class="fal fa-check text-teal-600"></i>
    <i v-else-if="inputType == 'array' && value != 0" class="fal fa-check text-teal-600"></i>
    <i v-else class="fas fa-circle text-red-600 text-[8px]"></i>
</template>

<script setup lang="ts">
const { FormData , keyname, inputType , value } = defineProps(['FormData', 'keyname', 'inputType', 'value'])
</script>