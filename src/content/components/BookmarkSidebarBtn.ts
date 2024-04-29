import { fillStar } from "../../common/elements";
import bookmarkComment from "./BookmarkComment";

export default function bookmarkSidebarBtn() {
    const bookmarkPopupBtnDiv = document.createElement("div");
    bookmarkPopupBtnDiv.classList.add("discussion-sidebar-item");

    const bookmarkPopupBtn = document.createElement("button");
    bookmarkPopupBtn.classList.add("btn-link", "text-bold", "Link--primary", "no-underline");

    const text = document.createElement("strong");
    text.innerHTML = "Show marked comments";

    bookmarkPopupBtn.innerHTML = fillStar;
    bookmarkPopupBtn.appendChild(text);

    bookmarkPopupBtnDiv.appendChild(bookmarkPopupBtn);
    bookmarkPopupBtnDiv.addEventListener("click", handleClickBtn);

    return bookmarkPopupBtnDiv;
}

function handleClickBtn() {
    bookmarkComment();
}
