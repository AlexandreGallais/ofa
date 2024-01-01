<script lang="ts" setup>
import { PropType } from 'vue';

defineProps({
    /** The category of buttons you want to use. */
    category: {
        type: String as PropType<
            'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger'
        >,
        required: true,
    },
    /** The text displayed inside the button. */
    innerText: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <button :class="category">
        <span>{{ innerText }}</span>
    </button>
</template>

<style lang="scss" scoped>
button {
    display: block;
    box-sizing: border-box;
    padding: 1px;
    border: solid 1px;
    border-radius: var(--ofa-border-radius);
    outline: none;
    cursor: pointer;

    span {
        display: block;
        box-sizing: border-box;
        padding: 3px 11px;
        border: solid 1px;
        border-color: inherit;
        border-radius: inherit;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 1.5em;
    }

    &.primary,
    &.secondary,
    &.danger {
        color: var(--ofa-color-text-reverse);
        background-color: var(--ofa-color-primary-default);
        border-color: var(--ofa-color-primary-default);

        &:hover {
            background-color: var(--ofa-color-primary-hover);
            border-color: var(--ofa-color-primary-hover);
        }

        &:active {
            background-color: var(--ofa-color-primary-active);
            border-color: var(--ofa-color-primary-active);
        }

        &:focus-visible span {
            border-color: var(--ofa-color-background-default);
        }
    }

    /* stylelint-disable-next-line no-descending-specificity */
    &.secondary {
        background-color: var(--ofa-color-secondary-default);
        border-color: var(--ofa-color-secondary-default);

        &:hover {
            background-color: var(--ofa-color-secondary-hover);
            border-color: var(--ofa-color-secondary-hover);
        }

        &:active {
            background-color: var(--ofa-color-secondary-active);
            border-color: var(--ofa-color-secondary-active);
        }
    }

    /* stylelint-disable-next-line no-descending-specificity */
    &.danger {
        background-color: var(--ofa-color-danger-default);
        border-color: var(--ofa-color-danger-default);

        &:hover {
            background-color: var(--ofa-color-danger-hover);
            border-color: var(--ofa-color-danger-hover);
        }

        &:active {
            background-color: var(--ofa-color-danger-active);
            border-color: var(--ofa-color-danger-active);
        }
    }

    &.tertiary,
    &.ghost {
        color: var(--ofa-color-text-default);
        background-color: var(--ofa-color-ghost-default);
        border-color: var(--ofa-color-primary-default);

        /* stylelint-disable-next-line no-descending-specificity */
        span {
            border-color: var(--ofa-color-ghost-default);
        }

        &:hover {
            background-color: var(--ofa-color-ghost-hover);
            border-color: var(--ofa-color-primary-default);

            span {
                border-color: var(--ofa-color-ghost-hover);
            }
        }

        &:active {
            background-color: var(--ofa-color-ghost-active);
            border-color: var(--ofa-color-primary-default);

            span {
                border-color: var(--ofa-color-ghost-active);
            }
        }

        &:focus-visible span {
            border-color: var(--ofa-color-primary-default);
        }
    }

    /* stylelint-disable-next-line no-descending-specificity */
    &.ghost {
        border-color: var(--ofa-color-ghost-default);

        &:hover {
            border-color: var(--ofa-color-ghost-hover);
        }

        &:active {
            border-color: var(--ofa-color-ghost-active);
        }
    }
}
</style>
