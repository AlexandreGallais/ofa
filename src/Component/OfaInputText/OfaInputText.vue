<script lang="ts" setup>
import { PropType } from 'vue';
import OfaIcon from '../OfaIcon/OfaIcon.vue';

defineProps({
    /** Set the input to error mode. */
    error: {
        type: Boolean,
        required: false,
    },
    /** Set the input to readonly mode. */
    readonly: {
        type: Boolean,
        required: false,
    },
    /** Set the input to disabled mode. */
    disabled: {
        type: Boolean,
        required: false,
    },
    /** Input value. */
    value: {
        type: String,
        required: true,
    },
    /** Select the way the value is updated. */
    updateOn: {
        type: String as PropType<'input' | 'change'>,
        required: false,
        default: 'change',
    },
});

const emit = defineEmits([
    /** Update value. */
    'update:value',
]);
</script>

<template>
    <label ofa="input-text" :class="{ error: error }">
        <input
            type="text"
            :readonly="readonly"
            :disabled="disabled"
            :value="value"
            @[updateOn]="(event: Event) => emit('update:value', (event.target as HTMLInputElement).value)"
        />

        <span class="read-only-badge" :title="disabled ? '' : 'readonly'">
            <OfaIcon :name="disabled ? 'danger' : 'eye'" />
        </span>
    </label>
</template>

<style lang="scss" scoped>
@import '../../Core/font';

[ofa='input-text'] {
    --ofa-icon-size: 1em;
    --ofa-icon-color: var(--ofa-color-text-primary);

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
        @include font-l-default;

        width: 100%;
        padding: 3px 11px;
        color: var(--ofa-color-text-default);
        background-color: inherit;
        border: solid 1px;
        border-color: var(--ofa-color-text-reverse);
        border-radius: inherit;
        outline: none;

        &:focus-visible {
            border-color: var(--ofa-color-primary-default);
        }
    }

    & > .read-only-badge {
        display: none;
        justify-content: center;
        align-items: center;
        width: 32px;
        min-width: 32px;
        height: 32px;
        min-height: 32px;
        border-radius: inherit;
        cursor: default;
    }

    &:hover,
    &:focus-within {
        border-color: var(--ofa-color-primary-default);
    }

    &:not(:has(input:read-only)).error {
        border-color: var(--ofa-color-danger-default);
        border-bottom-color: var(--ofa-color-danger-default);

        & > input:focus-within {
            border-color: var(--ofa-color-danger-default);
        }
    }

    &:has(input:read-only) .read-only-badge {
        display: flex;
    }

    &:has(input:disabled) {
        --ofa-icon-color: var(--ofa-color-text-disabled);

        background-color: var(--ofa-color-background-disabled);
        border-color: var(--ofa-color-background-disabled);
        border-bottom-color: var(--ofa-color-background-disabled);

        /* stylelint-disable-next-line no-descending-specificity */
        & > input {
            color: var(--ofa-color-text-disabled);
            border-color: var(--ofa-color-background-disabled);
            cursor: text;
        }
    }
}
</style>
