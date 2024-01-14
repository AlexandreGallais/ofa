<script lang="ts" setup>
import { PropType, onUpdated, ref } from 'vue';
import OfaButton from '../OfaButton/OfaButton.vue';
import { IconList } from '../../Core/iconList';
import { DomElement } from '../../Core/DomElement';

defineProps({
    /** The category of buttons you want to use. */
    category: {
        type: String as PropType<
            'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger'
        >,
        required: false,
        default: 'tertiary',
    },
    /**
     * The list of buttons.
     */
    buttons: {
        type: Array as PropType<
            {
                /** The text displayed inside the button. */
                innerText?: string;

                /** The name of the icon. */
                icon?: IconList;

                /** Disabled the button. */
                disabled?: boolean;

                /** Callback function when you click on this button. */
                onClick: () => void;
            }[]
        >,
        default: () => [],
    },
});

const menuRef = ref<HTMLDivElement>();
const menuActive = ref(false);

const dropdownDisplay = () => {
    menuActive.value = !menuActive.value;

    if (!menuActive.value) {
        return;
    }

    const closeDropdown = (eventB: MouseEvent) => {
        if (!menuActive.value) {
            window.removeEventListener('click', closeDropdown);
        }

        if (
            (eventB.target as HTMLElement).closest(
                '[ofa=button-split] menu',
            ) !== menuRef.value
        ) {
            menuActive.value = false;
            window.removeEventListener('click', closeDropdown);
        }
    };

    window.addEventListener('click', closeDropdown);
};

const positionTop = ref(false);
const positionLeft = ref(false);

const check = {
    top: false,
    right: false,
    bottom: false,
    left: false,
};

onUpdated(() => {
    if (!menuActive.value) {
        positionTop.value = false;
        positionLeft.value = false;
        check.top = false;
        check.right = false;
        check.bottom = false;
        check.left = false;
    }

    if (!menuRef.value) {
        return;
    }

    const pos = DomElement.getWindowPositions(menuRef.value);

    if (pos.outBottom && !check.bottom) {
        check.bottom = true;
        positionTop.value = true;
    }

    if (pos.outTop && !check.top) {
        check.top = true;
        positionTop.value = false;
    }

    if (pos.outLeft && !check.left) {
        check.left = true;
        positionLeft.value = true;
    }

    if (pos.outRight && !check.right) {
        check.right = true;
        positionLeft.value = false;
    }
});
</script>

<template>
    <div
        ofa="button-split"
        :class="{
            'position-top': positionTop,
            'position-left': positionLeft,
        }"
    >
        <div class="split-wrapper" :class="category">
            <OfaButton
                :category="category"
                :icon="buttons[0].icon"
                :inner-text="buttons[0].innerText"
                :disabled="buttons[0].disabled"
                @click="buttons[0].onClick()"
            />

            <div class="button-split-separator"></div>

            <OfaButton
                :category="category"
                :icon="'chevron-down'"
                @click.stop="dropdownDisplay"
                tabindex="-1"
            />
        </div>

        <menu ref="menuRef" :class="{ active: menuActive }">
            <OfaButton
                v-for="(button, i) in buttons.slice(1, buttons.length)"
                :key="i"
                :category="'ghost'"
                :icon="button.icon"
                :inner-text="button.innerText"
                :disabled="button.disabled"
                @click="
                    menuActive = false;
                    button.onClick();
                "
                tabindex="-1"
            />
        </menu>
    </div>
</template>

<style lang="scss" scoped>
[ofa='button-split'] {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: fit-content;
    user-select: none;

    menu {
        position: fixed;
        display: none;
        flex-direction: column;
        margin: 36px 0 0;
        padding: 0;
        background-color: var(--ofa-color-text-reverse);
        border: solid 1px var(--ofa-color-border-default);
        border-radius: var(--ofa-border-radius);
        overflow: hidden;

        &.active {
            display: flex;
        }

        & > [ofa='button'] {
            --ofa-border-radius: 0;
        }
    }

    & > .split-wrapper {
        display: flex;
        align-items: center;
        border-radius: var(--ofa-border-radius);

        & > [ofa='button']:first-child {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }

        & > [ofa='button']:last-child {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }

        & > .button-split-separator {
            width: 1px;
            height: 24px;
            background-color: var(--ofa-color-background-default);
        }

        &.primary {
            background-color: var(--ofa-color-primary-default);
        }

        &.secondary {
            background-color: var(--ofa-color-secondary-default);
        }

        &.danger {
            background-color: var(--ofa-color-danger-default);
        }

        &.tertiary {
            background-color: var(--ofa-color-tertiary-default);
            outline: solid 1px var(--ofa-color-primary-default);
            outline-offset: -1px;

            & > [ofa='button']:first-child {
                padding-right: 2px;
                border-right: none;
            }

            & > [ofa='button']:last-child {
                padding-left: 2px;
                border-left: none;
            }
        }

        &.ghost > .button-split-separator,
        &.tertiary > .button-split-separator {
            background-color: var(--ofa-color-primary-default);
        }
    }

    &:has(menu.active) .split-wrapper {
        &.primary > [ofa='button']:last-child:deep(span),
        &.secondary > [ofa='button']:last-child:deep(span),
        &.danger > [ofa='button']:last-child:deep(span) {
            border-color: var(--ofa-color-background-default);
        }

        &.ghost > [ofa='button']:last-child:deep(span),
        &.tertiary > [ofa='button']:last-child:deep(span) {
            border-color: var(--ofa-color-primary-default);
        }
    }

    &.position-top {
        flex-direction: column-reverse;

        & > menu {
            margin-bottom: 36px;
        }
    }

    &.position-left {
        align-items: flex-start;
    }
}
</style>
