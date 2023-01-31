<template>
    <section>
        <h3>
            LORD
        </h3>
    </section>
</template>

<script setup lang="ts">
import axios from './../modules/axios'

axios.get('/shops').then(({data}) => {
    console.log(data);
})
</script>