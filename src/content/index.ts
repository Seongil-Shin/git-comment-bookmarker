import initComment from "./initialize/comment";
import initMenu from "./initialize/menu";
import initLoadMore from "./initialize/loadMore";

import "./index.css";

async function initialize() {
    initComment();
    initMenu();
    initLoadMore();
}

initialize();
