import { STORAGE_KEY } from "../common/constants";
import { IPageData } from "../common/type";
import { getLocalStorage, saveLocalStorage } from "../common/utils";
import { emptyStar, fillStar } from "./elements";

const comments = document.querySelectorAll(".js-timeline-item") as NodeListOf<HTMLDivElement>;

let pageData: IPageData | null = null;
async function initialize() {
    const value = await getLocalStorage(location.href);
    if (value[location.href] === undefined) {
        return {
            [STORAGE_KEY.BOOKMARK]: [],
            [STORAGE_KEY.MEMO]: "",
        };
    }
    pageData = value[location.href];
    initComment();
}
initialize();

function initComment() {
    comments.forEach((item) => {
        const header = item.querySelector(".timeline-comment-header");
        if (!header || !item.dataset.gid) {
            return;
        }

        const star = document.createElement("div");
        star.id = "star";
        star.innerHTML = pageData?.BOOKMARK.includes(item.dataset.gid) ? fillStar : emptyStar;

        star.addEventListener("click", handleStarClick);

        header.insertBefore(star, header.lastElementChild);
    });
}

async function handleStarClick(e: MouseEvent) {
    const star = e.target as HTMLDivElement;
    const comment: HTMLDivElement | null = star.closest(".js-timeline-item");

    if (comment === null || pageData === null || !comment.dataset.gid) {
        return;
    }

    const starWrapper = comment.querySelector("#star") as HTMLDivElement;
    let newBookmark = [...pageData.BOOKMARK, comment.dataset.gid];
    let newStar = fillStar;

    if (pageData.BOOKMARK.includes(comment.dataset.gid)) {
        newBookmark = pageData.BOOKMARK.filter((b) => b !== comment.dataset.gid);
        newStar = emptyStar;
    }

    const result = await saveLocalStorage(location.href, {
        ...pageData,
        [STORAGE_KEY.BOOKMARK]: newBookmark,
    });

    if (result) {
        starWrapper.innerHTML = newStar;
        pageData = { ...pageData, [STORAGE_KEY.BOOKMARK]: newBookmark };
    }
}
