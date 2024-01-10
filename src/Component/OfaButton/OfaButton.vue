<script lang="ts" setup>
import { PropType } from 'vue';
import OfaIcon from '../OfaIcon/OfaIcon.vue';
import { IconList } from '../../Core/iconList';

defineProps({
    /** The category of buttons you want to use. */
    category: {
        type: String as PropType<
            'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger'
        >,
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
        type: String as PropType<IconList>,
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
    <button
        ofa="button"
        :class="{ [category]: true, 'ofa-icon-only': !innerText }"
        :disabled="disabled"
    >
        <span>
            <OfaIcon v-if="icon" :name="icon" />

            {{ innerText }}
        </span>
    </button>
</template>

<style lang="scss" scoped>
[ofa='button'] {
    padding: 1px;
    border: solid 1px;
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
        border: solid 1px;
        border-color: inherit;
        border-radius: inherit;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 16px;
        font-weight: 400;
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

        &:focus-visible > span {
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
        --ofa-icon-color: var(--ofa-color-text-primary);

        color: var(--ofa-color-text-default);
        background-color: var(--ofa-color-ghost-default);
        border-color: var(--ofa-color-primary-default);

        /* stylelint-disable-next-line no-descending-specificity */
        & > span {
            border-color: var(--ofa-color-ghost-default);
        }

        &:hover {
            background-color: var(--ofa-color-ghost-hover);
            border-color: var(--ofa-color-primary-default);

            & > span {
                border-color: var(--ofa-color-ghost-hover);
            }
        }

        &:active {
            background-color: var(--ofa-color-ghost-active);
            border-color: var(--ofa-color-primary-default);

            & > span {
                border-color: var(--ofa-color-ghost-active);
            }
        }

        &:focus-visible > span {
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

    &:disabled {
        --ofa-icon-color: var(--ofa-color-text-disabled);

        color: var(--ofa-color-text-disabled);
        background-color: var(--ofa-color-background-disabled);
        border-color: var(--ofa-color-background-disabled);
        pointer-events: none;

        /* stylelint-disable-next-line no-descending-specificity */
        & > span {
            border-color: var(--ofa-color-background-disabled);
        }
    }
}
</style>
