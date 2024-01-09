<script lang="ts" setup>
import { PropType } from 'vue';
import { Variable } from '../../Core/Variable';
import { IconList } from '../../Core/iconList';

defineProps({
    /** The name of the icon. */
    name: {
        type: String as PropType<IconList>,
        required: true,
    },
    /** The size of the icon. */
    size: {
        type: String,
        required: false,
    },
    /** The color of the icon. */
    color: {
        type: String,
        required: false,
    },
});
</script>

<template>
    <div
        ofa="icon"
        :style="{
            '--ofa-icon-color': color,
            '--ofa-icon-size': size,
            'mask-image': `url(${Variable['--ofa-icon-url']}/${name}-${Variable['--ofa-icon-radius']}.svg)`,
        }"
    ></div>
</template>

<style lang="scss" scoped>
[ofa='icon'] {
    width: var(--ofa-icon-size);
    min-width: var(--ofa-icon-size);
    max-width: var(--ofa-icon-size);
    height: var(--ofa-icon-size);
    min-height: var(--ofa-icon-size);
    max-height: var(--ofa-icon-size);
    background-color: var(--ofa-icon-color);
    mask-size: var(--ofa-icon-size);
}
</style>
