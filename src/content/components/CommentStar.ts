import { BOOKMARK_STAR_ID } from "../../common/constants";
import { emptyStar, fillStar } from "../../common/elements";
import { getPageData, saveBookmarkOnPageData } from "../../common/storage";

export default function commentStar(hasMarked: boolean) {
    const star = document.createElement("div");
    star.id = BOOKMARK_STAR_ID;
    star.innerHTML = hasMarked ? fillStar : emptyStar;

    star.addEventListener("click", handleStarClick);
    return star;
}

export async function handleStarClick(e: Event) {
    const star = e.target as HTMLDivElement;
    const comment: HTMLDivElement | null = star.closest(".js-timeline-item");
    const pageData = await getPageData();

    if (comment === null || !comment.dataset.gid) {
        return;
    }

    const starWrapper = comment.querySelector(`#${BOOKMARK_STAR_ID}`) as HTMLDivElement;
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
