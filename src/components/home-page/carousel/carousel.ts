/*
    Simple Carousel. When you click, it stops autoplay. Each click makes it go forward in pictures.
*/

import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { ScreenController, screenStyles } from './carousel-screen';
import { SlidesController, slidesStyle } from './carousel-slides'
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

//type Timer = ReturnType<typeof setInterval>


export class ViseCarousel extends LitElement {
    private screen = new ScreenController(this)
    private slides = new SlidesController(this)

    render() {
        return html`
            <!--div id="container"-->
                <div id="screen" 
                    @click="${this.screenClick}" 
                >
                    ${this.images}
                </div>
                
                <div id="slide-film">
                    ${this.clones.map((img, i) => html`
                        <div class="slide" @click=${() => this.slideClick(i)}>
                            ${img}
                            <div class="caption invisible">${html`${unsafeHTML(img.getAttribute('caption'))}`}</div>
                        </div>
                    `)}
                </div>
            <!--/div-->
        `
    }

    static styles = [screenStyles, slidesStyle, css`
        #container {
            display: flex;
            flex-direction: column;
            height: inherit;
            overflow: hidden;
            box-shadow: 5px 5px 10px 5px gray;
            border-radius: var(--border-radius);
            background-color: lightgray;
            cursor: pointer;
        }
        .invisible {
            display: none;
        }

        img {
            object-fit: cover;
            width:100%;
            height: 100%;
        }
    `]


    @property()
    noAutoplay = false;

    @property()
    noAnimation = false;

    @property()
    animateTime = 500; // milliseconds

    @property()
    playTime = 6000; // milliseconds

    length = 0;
    selected = 0;

    private images: HTMLImageElement[]
    private clones

    private autoplayId = 0; // use zero for no autoplay


    constructor() {
        super()

        // calculate useful variables for animation and references
        this.images = Array.from(this.querySelectorAll('img'))
        this.clones = Array.from(this.images.map(img => img.cloneNode(true)))

        this.length = this.images.length

        this.updateComplete.then(() => { //because they depend on properties, so wait for render to get them.
            this.captions = this.shadowRoot!.querySelectorAll('.caption')


            //this.screen.show(0)

            this.play(0)
        })

    }

    showSlide(i: number) {
        this.screen.hide(this.selected)
        this.slides.hide(this.selected)

        this.selected = i

        this.screen.show(this.selected)
        this.slides.show(this.selected)
    }

    //change picture and schedule keep changing the pictures
    play(start = this.increase()) {
        if (this.noAutoplay) return

        this.showSlide(start)
        this.autoplayId = setInterval(() => {
            this.showSlide(this.increase())
        }, this.playTime)
    }

    pause() {
        if (!this.autoplayId) return

        clearInterval(this.autoplayId)

        this.autoplayId = 0
    }

    increase = (i = this.selected, step = 1) => (i + step) % this.length

    screenClick() {
        // toggle play and pause
        this.autoplayId ? this.pause() : this.play()
    }

    slideClick(i: number) {
        this.pause()
        this.showSlide(i)
    }

}
customElements.define('vise-carousel', ViseCarousel);

