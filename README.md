
## Main Components
Our main components are written in Web Component to be browser native, lightweight and fast, future-proof, and isolated. We use Lit V2 as a helper library.
- page-router

    Used for client side routing especially in index.html page but can be used everywhere. It exposes a function `gotoPage` in `store.ts`.

    Listens to window.popstate and loads the proper component. 

    - routing to a page from another page:
        ```ts
        import {gotoPage} from store.ts
        // the rest
        <some-tag @click={() => gotoPage("/path-to/desired-page")}
        ```

    - adding a new page:

        add an entry to routes varibale in page-router.ts. 
        

    - restrict a page to specific authorizaion level (have to sig in)

        you can enforce visitors to login to an appropriate level (customer, broker, etc) before viewing a page (if they have not loggen in already).
        Add an entry to routeAuthorication variable in page-router.ts

        Look at the type definition for Routes. It is from a path to a function, which accept parameters and returns html template.
        It is from a path to an Authorization like "/path-to/broker-specific-page": "broker"
    

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