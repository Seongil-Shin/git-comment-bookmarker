import { getPageData } from "../../common/storage";

let everyHideComment: HTMLDivElement[] = [];

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
    let shouldLoadMoreComment = false;
    pageData.BOOKMARK.forEach((bookmark: string) => {
        const markedComment = document.querySelector(`div[data-gid='${bookmark}']`);

        if (markedComment === null) {
            shouldLoadMoreComment = true;
            return;
        }

        const copiedComment = markedComment.cloneNode(true);

        popup.appendChild(copiedComment);
    });

    if (shouldLoadMoreComment) {
        fetchAdditionalComment();
    }

    return popup;
}

async function fetchAdditionalComment() {
    const pageData = await getPageData();
    const firstLoadBtn = document.querySelector<HTMLFormElement>("#js-progressive-timeline-item-container > form");
    if (firstLoadBtn === null) {
        return;
    }

    everyHideComment = everyHideComment.length > 0 ? everyHideComment : await loadMoreComment(firstLoadBtn.action);

    const popup = document.getElementById("git-comment-enhancer-popup");
    if (popup === null) {
        return;
    }

    const newComments: HTMLDivElement[] = [];
    popup.querySelectorAll<HTMLDivElement>(".js-timeline-item")?.forEach((item) => newComments.push(item));

    pageData.BOOKMARK.forEach((bookmark: string) => {
        const markedComment = everyHideComment.find((item) => item.dataset.gid === bookmark);

        if (markedComment === undefined) {
            return;
        }

        const copiedComment = markedComment.cloneNode(true) as HTMLDivElement;
        newComments.push(copiedComment);
    });

    newComments.sort((a, b) => ((a.dataset.gid as string) > (b.dataset.gid as string) ? 1 : -1));
    popup.innerHTML = "";
    newComments.forEach((comment) => popup.appendChild(comment));
}

function loadMoreComment(action: string): Promise<HTMLDivElement[]> {
    console.log("load more comment");
    return fetch(action)
        .then((res) => {
            return res.text();
        })
        .then(async (text) => {
            let parser = new DOMParser();
            let doc = parser.parseFromString(text, "text/html");

            const comments: HTMLDivElement[] = [];
            doc.querySelectorAll<HTMLDivElement>("div.js-timeline-item")?.forEach((item) => comments.push(item));

            const newLoadMoreBtn = doc.querySelector<HTMLFormElement>("#js-progressive-timeline-item-container > form");

            if (newLoadMoreBtn === null) {
                return comments;
            }

            const newComments = await loadMoreComment(newLoadMoreBtn.action);

            return comments.concat(newComments).flat(2);
        })
        .then((value) => value)
        .catch(() => {
            return [] as HTMLDivElement[];
        });
}
