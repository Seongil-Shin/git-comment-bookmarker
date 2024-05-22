import { BOOKMARK_POPUP_SIDEBAR_BTN_ID } from "../../../common/constants";
import { fillStar } from "../../../common/elements";
import BookmarkCommentPopup from "../popup/BookmarkCommentPopup";

export default function bookmarkSidebarBtn() {
    const oldBtn = document.getElementById(BOOKMARK_POPUP_SIDEBAR_BTN_ID);
    if (oldBtn) {
        oldBtn.querySelector("button")?.addEventListener("click", BookmarkCommentPopup);
        return null;
    }

    const bookmarkPopupBtnDiv = document.createElement("div");
    bookmarkPopupBtnDiv.id = BOOKMARK_POPUP_SIDEBAR_BTN_ID;
    bookmarkPopupBtnDiv.classList.add("discussion-sidebar-item");

    const bookmarkPopupBtn = document.createElement("button");
    bookmarkPopupBtn.classList.add("btn-link", "text-bold", "Link--primary", "no-underline");

    const text = document.createElement("strong");
    text.innerHTML = "Show marked comments";

    bookmarkPopupBtn.innerHTML = fillStar;
    bookmarkPopupBtn.appendChild(text);
    bookmarkPopupBtn.addEventListener("click", BookmarkCommentPopup);

    bookmarkPopupBtnDiv.appendChild(bookmarkPopupBtn);

    return bookmarkPopupBtnDiv;
}
