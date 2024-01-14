<script lang="ts" setup>
import OfaIcon from '../OfaIcon/OfaIcon.vue';

defineProps({
    /** Set the input to read-only mode. */
    readonly: {
        type: Boolean,
        required: false,
    },
});
</script>

<template>
    <label ofa="input-text">
        <input type="text" :readonly="readonly" />

        <span class="read-only-badge" title="read-only">
            <OfaIcon name="eye" />
        </span>
    </label>
</template>

<style lang="scss" scoped>
[ofa='input-text'] {
    display: flex;
    width: fit-content;
    padding: 1px;
    gap: 1px;
    background-color: var(--ofa-color-text-reverse);
    border: solid 1px;
    border-color: var(--ofa-color-text-reverse);
    border-bottom-color: var(--ofa-color-primary-default);
    border-radius: var(--ofa-border-radius);
    cursor: text;
    user-select: none;

    & > input {
        width: 100%;
        padding: 3px 11px;
        color: var(--ofa-color-text-default);
        background-color: inherit;
        border: solid 1px;
        border-color: var(--ofa-color-text-reverse);
        border-radius: inherit;
        outline: none;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 1.5em;

        &:focus-visible {
            border-color: var(--ofa-color-primary-default);
        }
    }

    & > .read-only-badge {
        --ofa-icon-color: var(--ofa-color-primary-default);
        --ofa-icon-size: 16px;

        display: none;
        justify-content: center;
        align-items: center;
        width: 32px;
        min-width: 32px;
        height: 32px;
        min-height: 32px;
        border-radius: inherit;
    }

    &:hover,
    &:focus-within {
        border-color: var(--ofa-color-primary-default);
    }

    &:has(input:read-only) .read-only-badge {
        display: flex;
    }
}
</style>
