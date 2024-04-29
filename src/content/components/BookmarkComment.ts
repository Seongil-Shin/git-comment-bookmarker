import { getPageData } from "../../common/storage";
import { getLocalStorage } from "../../common/utils";

export default async function bookmarkComment() {
    document.body.style.overflow = "hidden";

    document.body.appendChild(dimmed());

    const elem = await popup();
    document.body.appendChild(elem);
}

function dimmed() {
    const dimmed = document.createElement("div");
    dimmed.id = "git-comment-enhancer-dimmed";
    dimmed.classList.add("Overlay-backdrop--center");

    dimmed.addEventListener("click", () => {
        document.body.style.overflow = "auto";
        dimmed.remove();
        document.getElementById("git-comment-enhancer-popup")?.remove();
    });

    return dimmed;
}

async function popup() {
    const popup = document.createElement("div");
    popup.id = "git-comment-enhancer-popup";
    popup.classList.add("popupWrapper");

    const pageData = await getPageData();
    pageData.BOOKMARK.forEach((bookmark: string) => {
        const markedComment = document.querySelector(`div[data-gid='${bookmark}']`);

        if (markedComment === null) {
            return;
        }

        const copiedComment = markedComment.cloneNode(true);

        popup.appendChild(copiedComment);
    });

    return popup;
}
