

### commons/style/shared.ts
- To have a consistent and desired look all over the website, import from "/components/style/shared.ts"
    - example: /components/index/header/user-header.ts
    - Reason: the global css can not penetrate into web components, so we need to expelicitely add them to each component by importing them
    - exception: :root variables penetrate everywhere so no need to import them. Just import global.css in index.html

    ```js
    import {header, commonCSS} from "/commons/style/shared.ts"
    class ThisComponent extends Lit {
        static styles = [header, commonCSS, css`
            /* component specific css */
        `]
        // the rest
    }
    ```

### commons/style/theme-*.css
Components inherit Color, font, and --variables (inheritable properties) which makes the theme of the website. We put these theming properties (color,font, --variables) in theme-*.css file and import it in index.html

### header
Our website uses a sticky header. This header behaves like a handy tool box for the user.
For each user category, the header is different: user-header, broker-header, guest-header, etc.
- To change the header type: `dispatchEvent(new CustomEvent("header", details=${user-type}))`


### open source free icon sources:
- https://heroicons.com/
- 


## Technical Debts and YAGNI Bugs
- When typing url (.../broker-home)
    - expected behavior: to restrict us and ask us to sign in as a broker
        - Refer to "page-router.ts" logic: some pages are restricted and needs proper authorization level
    - seen bevaior: shows the page
    - It behaves correct when usign goToPage function from store (internal links)
    - Risk: Low, sensitive data is in db and static files are not sensitive
    - Intuition: at the beginning page-router is not connected and there is no listener