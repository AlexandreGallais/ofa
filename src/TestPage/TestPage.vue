<script lang="ts" setup>
import { ref } from 'vue';
import OfaPickerDate from '../Component/OfaPickerDate/OfaPickerDate.vue';

const t = ref<Date>(new Date('2000-8-31'));
</script>

<template>
    {{ t }}
    <OfaPickerDate v-model:date="t" />
</template>
