export class Variable {
    static #rootStyle = getComputedStyle(document.documentElement);

    static #getProp = (property: string) => {
        return this.#rootStyle
            .getPropertyValue(property)
            .replace(/^"/su, '')
            .replace(/"$/su, '');
    };

    static #ofaIconUrl?: string;
    static get '--ofa-icon-url'() {
        if (!this.#ofaIconUrl) {
            this.#ofaIconUrl = this.#getProp('--ofa-icon-url');
        }

        return this.#ofaIconUrl;
    }

    static #ofaIconRadius?: string;
    static get '--ofa-icon-radius'() {
        if (!this.#ofaIconRadius) {
            this.#ofaIconRadius = this.#getProp('--ofa-icon-radius');
        }

        return this.#ofaIconRadius;
    }

    static #ofaColorTextDefault?: string;
    static get '--ofa-color-text-default'() {
        if (!this.#ofaColorTextDefault) {
            this.#ofaColorTextDefault = this.#getProp(
                '--ofa-color-text-default',
            );
        }

        return this.#ofaColorTextDefault;
    }

    static #ofaColorTextReverse?: string;
    static get '--ofa-color-text-reverse'() {
        if (!this.#ofaColorTextReverse) {
            this.#ofaColorTextReverse = this.#getProp(
                '--ofa-color-text-reverse',
            );
        }

        return this.#ofaColorTextReverse;
    }

    static #ofaColorTextPrimary?: string;
    static get '--ofa-color-text-primary'() {
        if (!this.#ofaColorTextPrimary) {
            this.#ofaColorTextPrimary = this.#getProp(
                '--ofa-color-text-primary',
            );
        }

        return this.#ofaColorTextPrimary;
    }

    static #ofaColorTextDanger?: string;
    static get '--ofa-color-text-danger'() {
        if (!this.#ofaColorTextDanger) {
            this.#ofaColorTextDanger = this.#getProp('--ofa-color-text-danger');
        }

        return this.#ofaColorTextDanger;
    }

    static #ofaColorTextDisabled?: string;
    static get '--ofa-color-text-disabled'() {
        if (!this.#ofaColorTextDisabled) {
            this.#ofaColorTextDisabled = this.#getProp(
                '--ofa-color-text-disabled',
            );
        }

        return this.#ofaColorTextDisabled;
    }

    static #ofaColorTextPlaceholder?: string;
    static get '--ofa-color-text-placeholder'() {
        if (!this.#ofaColorTextPlaceholder) {
            this.#ofaColorTextPlaceholder = this.#getProp(
                '--ofa-color-text-placeholder',
            );
        }

        return this.#ofaColorTextPlaceholder;
    }
}
