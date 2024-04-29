import { emptyStar, fillStar } from "../../common/elements";
import { getPageData, saveBookmarkOnPageData } from "../../common/storage";

export default function commentStar(hasMarked: boolean) {
    const star = document.createElement("div");
    star.id = "star";
    star.innerHTML = hasMarked ? fillStar : emptyStar;

    star.addEventListener("click", handleStarClick);
    return star;
}

async function handleStarClick(e: MouseEvent) {
    const star = e.target as HTMLDivElement;
    const comment: HTMLDivElement | null = star.closest(".js-timeline-item");
    const pageData = await getPageData();

    if (comment === null || !comment.dataset.gid) {
        return;
    }

    const starWrapper = comment.querySelector("#star") as HTMLDivElement;
    let newBookmark = [...pageData.BOOKMARK, comment.dataset.gid];
    let newStar = fillStar;

    if (pageData.BOOKMARK.includes(comment.dataset.gid)) {
        newBookmark = pageData.BOOKMARK.filter((b) => b !== comment.dataset.gid);
        newStar = emptyStar;
    }

    const result = await saveBookmarkOnPageData(pageData, newBookmark);

    if (result) {
        starWrapper.innerHTML = newStar;
    }
}
