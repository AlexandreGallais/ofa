export class DomElement {
    static getWindowPositions = (element: HTMLElement) => {
        const { top, right, bottom, left } = element.getBoundingClientRect();

        return {
            offsetTop: top,
            offsetRight: right ? window.innerWidth - right : 0,
            offsetbottom: bottom ? window.innerHeight - bottom : 0,
            offsetLeft: left,
            outTop: top < 0,
            outRight: window.innerWidth - right < 0,
            outBottom: window.innerHeight - bottom < 0,
            outLeft: left < 0,
        };
    };
}
