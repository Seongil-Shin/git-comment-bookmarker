import initComment from "./initialize/comment";
import initMenu from "./initialize/menu";

import "./index.css";

async function initialize() {
    initComment();
    initMenu();
}

initialize();
