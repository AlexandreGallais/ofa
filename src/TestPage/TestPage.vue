<script lang="ts" setup>
import { ref } from 'vue';
import OfaPickerDate from '../Component/OfaPickerDate/OfaPickerDate.vue';

const t = ref(new Date());
</script>

<template>
    {{ t }}
    <OfaPickerDate v-model:date="t" />
</template>
