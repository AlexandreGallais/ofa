<script lang="ts" setup>
import { ref } from 'vue';
import OfaPickerDate from '../Component/OfaPickerDate/OfaPickerDate.vue';
import OfaInputText from '../Component/OfaInputText/OfaInputText.vue';

const t = ref<Date>(new Date('2000-8-31'));
const tasf = ref('Hello');
</script>

<template>
    {{ t }}
    {{ tasf }}
    <form action="">
        <OfaInputText v-model:value="tasf" :update-on="'change'" />
        <OfaPickerDate v-model:date="t" />
        <input type="submit" value="sdgsdg" />
    </form>
</template>
