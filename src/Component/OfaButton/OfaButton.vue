<script lang="ts" setup>
import { PropType } from 'vue';
import OfaIcon from '../OfaIcon/OfaIcon.vue';
import { iconList } from '../../Core/iconList';

defineProps({
    /** The category of buttons you want to use. */
    category: {
        type: String as PropType<'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger'>,
        required: false,
        default: 'tertiary',
    },
    /** The text displayed inside the button. */
    innerText: {
        type: String,
        required: false,
    },
    /** The name of the icon. */
    icon: {
        type: String as PropType<(typeof iconList)[number]>,
        required: false,
    },
    /** Disabled the button. */
    disabled: {
        type: Boolean,
        required: false,
    },
});
</script>

<template>
    <button ofa="button" :class="{ [category]: true, 'ofa-icon-only': !innerText }" :disabled="disabled">
        <span>
            <OfaIcon v-if="icon" :name="icon" />

            {{ innerText }}
        </span>
    </button>
</template>

<style lang="scss" scoped>
[ofa='button'] {
    padding: 1px;
    border: solid 1px transparent;
    border-radius: var(--ofa-border-radius);
    outline: none;
    cursor: pointer;
    user-select: none;

    & > span {
        --ofa-icon-size: 1em;

        display: flex;
        align-items: center;
        height: 1.5em;
        padding: 3px 11px;
        gap: 6px;
        border: solid 1px transparent;
        border-radius: inherit;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 1.5em;
        white-space: nowrap;
    }

    &.ofa-icon-only > span {
        padding: 3px 7px;
    }

    &.primary,
    &.secondary,
    &.danger {
        --ofa-icon-color: var(--ofa-color-text-reverse);

        color: var(--ofa-color-text-reverse);

        &:focus-visible > span {
            border-color: var(--ofa-color-background-default);
        }
    }

    &.primary {
        background-color: var(--ofa-color-primary-default);

        &:hover {
            background-color: var(--ofa-color-primary-hover);
        }

        &:active {
            background-color: var(--ofa-color-primary-active);
        }
    }

    &.secondary {
        background-color: var(--ofa-color-secondary-default);

        &:hover {
            background-color: var(--ofa-color-secondary-hover);
        }

        &:active {
            background-color: var(--ofa-color-secondary-active);
        }
    }

    &.danger {
        background-color: var(--ofa-color-danger-default);

        &:hover {
            background-color: var(--ofa-color-danger-hover);
        }

        &:active {
            background-color: var(--ofa-color-danger-active);
        }
    }

    &.ghost,
    &.tertiary {
        --ofa-icon-color: var(--ofa-color-text-primary);

        color: var(--ofa-color-text-primary);

        &:focus-visible > span {
            border-color: var(--ofa-color-primary-default);
        }
    }

    &.ghost {
        background-color: transparent;

        &:hover {
            background-color: var(--ofa-color-tertiary-hover);
        }

        &:active {
            background-color: var(--ofa-color-tertiary-active);
        }
    }

    &.tertiary {
        background-color: var(--ofa-color-tertiary-default);
        border-color: var(--ofa-color-primary-default);

        &:hover {
            background-color: var(--ofa-color-tertiary-hover);
        }

        &:active {
            background-color: var(--ofa-color-tertiary-active);
        }
    }

    &:disabled {
        --ofa-icon-color: var(--ofa-color-text-disabled);

        color: var(--ofa-color-text-disabled);
        background-color: var(--ofa-color-background-disabled);
        border-color: transparent;
        pointer-events: none;
    }
}
</style>
