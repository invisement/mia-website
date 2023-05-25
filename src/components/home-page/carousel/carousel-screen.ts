import {css, ReactiveController, ReactiveControllerHost} from 'lit';


export const screenStyles = css`
    #screen {
        height: 85%;
        width: 100%;
    }
`

export class ScreenController implements ReactiveController {
    private host: ReactiveControllerHost

    private initialScale: number = 0
    private translates: number[] = []

    constructor(host: ReactiveControllerHost) {
        (this.host = host).addController(this)
    }

    hostConnected() {
        this.host.images.forEach(img => img.classList.add('invisible'))

        // calculate animation parameters
        this.initialScale = 1 / this.host.images.length
        this.translates = this.horizontalTranslateArray(this.host.images.length)        
    }


    show(i: number) {
        this.host.images[i].classList.remove('invisible')
        this.host.noAnimation || this.animate(i)
    }

    hide(i: number) {
        this.host.images[i].classList.add('invisible')
    }

    animate(i: number) {
        // create an animation that looks like image is taken from its place to big place
        const z = ` scale(${this.initialScale},.2) translate(${this.translates[i]}%, 300%)`
        this.host.images[i].animate([{ transform: z }, {}], {
            duration: this.host.animateTime,
            easing: "ease-in-out"
        })
    }

    // used for translate function on x-axis for small photos based on their order: [-n/2..n/2] + 1/2
    horizontalTranslateArray = (n: number) => Array.from({ length: n }, (_, i) => Math.floor(100 * (i - n / 2) + 50))

}
