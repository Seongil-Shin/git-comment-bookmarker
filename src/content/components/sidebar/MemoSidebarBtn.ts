import { book } from "../../../common/elements";
import MemoPopup from "../popup/MemoPopup";

export default function memoSidebarBtn() {
    const memoPopupBtnDiv = document.createElement("div");
    memoPopupBtnDiv.classList.add("discussion-sidebar-item", "border-top-0", "mt-0");

    const memoPopupBtn = document.createElement("button");
    memoPopupBtn.classList.add("btn-link", "text-bold", "Link--primary", "no-underline");

    const text = document.createElement("strong");
    text.innerHTML = "Show memo";

    memoPopupBtn.innerHTML = book;
    memoPopupBtn.appendChild(text);

    memoPopupBtnDiv.appendChild(memoPopupBtn);
    memoPopupBtnDiv.addEventListener("click", MemoPopup);

    return memoPopupBtnDiv;
}
