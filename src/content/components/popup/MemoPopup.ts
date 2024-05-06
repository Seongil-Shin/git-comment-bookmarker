import { MEMO_POPUP_ID } from "../../../common/constants";
import { getPageData } from "../../../common/storage";

export default async function MemoPopup() {
    document.body.style.overflow = "hidden";

    document.body.appendChild(dimmed());

    const elem = await popup();
    if (elem === null) {
        return;
    }
    document.body.appendChild(elem);
}

function dimmed() {
    const dimmed = document.createElement("div");
    dimmed.classList.add("Overlay-backdrop--center");

    dimmed.addEventListener("click", () => {
        document.body.style.overflow = "auto";
        dimmed.remove();
        document.getElementById(MEMO_POPUP_ID)?.remove();
    });

    return dimmed;
}

async function popup() {
    const popup = document.createElement("div");
    popup.id = MEMO_POPUP_ID;
    popup.classList.add("popupWrapper");

    const pageData = await getPageData();

    if (Boolean(pageData.MEMO)) {
        return null;
    }

    popup.innerHTML = pageData.MEMO;

    return popup;
}
