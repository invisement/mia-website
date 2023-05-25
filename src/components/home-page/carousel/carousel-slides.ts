import {css, ReactiveControllerHost} from 'lit';


export const slidesStyle = css`
    #slide-film {
        display: flex;   
        height: 15%;
    }

    .slide {
        position: relative;
        flex-grow: 1;
        flex-basis: 0;
        border: thin solid gray;
    }

    .opaque {
        opacity: .2;
    }

    .caption {
        position: absolute;
        top: .5em;
        left: .5em;
        line-height: 1;
        color: var(--highlight-color);
        font-size: larger;
        font-weight: bold;
    }
`

export class SlidesController {
    private host

    constructor(host: ReactiveControllerHost) {
        (this.host = host).addController(this)
    }

    hide(i) {
        this.host.clones[i].classList.remove('opaque')
        this.host.captions[i].classList.add('invisible')
    }

    show(i) {
        this.host.clones[i].classList.add('opaque')
        this.host.captions[i].classList.remove('invisible')
    }

}