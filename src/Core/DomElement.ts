export class DomElement {
    static getWindowPositions = (element: HTMLElement) => {
        const { top, right, bottom, left } = element.getBoundingClientRect();

        return {
            offsetTop: top,
            // If right = 0 set toRight to 0
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            offsetRight: right ? window.innerWidth - right : 0,
            // If bottom = 0 set toBottom to 0
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            offsetbottom: bottom ? window.innerHeight - bottom : 0,
            offsetLeft: left,
            // If less than 0, it means that the element is out of the window.
            /* eslint-disable @typescript-eslint/no-magic-numbers */
            outTop: top < 0,
            outRight: window.innerWidth - right < 0,
            outBottom: window.innerHeight - bottom < 0,
            outLeft: left < 0,
            /* eslint-enable @typescript-eslint/no-magic-numbers */
        };
    };
}
