import Page from "./page.js"

export default new (class extends Page {
    show() {
        console.log("starred page!");
    }
})();