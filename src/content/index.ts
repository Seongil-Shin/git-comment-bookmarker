import initComment from "./initialize/comment";
import initMenu from "./initialize/menu";
import initLoadMore from "./initialize/loadMore";

import "./index.css";

function testUrl() {
    if (/^https:\/\/[^\/]+\/[^\/]+\/[^\/]+\/issues\/[^\/]*$/.test(location.href)) {
        return true;
    }

    return false;
}

async function initialize() {
    if (!testUrl()) {
        return;
    }

    const id = setInterval(() => {
        const hasMenu = initMenu();
        if (!hasMenu) {
            return;
        }

        clearInterval(id);

        initComment();
        initLoadMore();
    }, 100);
}

let lastUrl = location.href;
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        initialize();
    }
}).observe(document, { subtree: true, childList: true });

initialize();
