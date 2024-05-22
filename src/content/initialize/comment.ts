import { BOOKMARK_STAR_ID } from "../../common/constants";
import { getPageData } from "../../common/storage";
import commentStar, { handleStarClick } from "../components/CommentStar";

export default async function initComment(commentProp?: NodeListOf<HTMLDivElement>) {
    const pageData = await getPageData();
    const comments = commentProp
        ? commentProp
        : (document.querySelectorAll(".js-timeline-item") as NodeListOf<HTMLDivElement>);

    comments.forEach((item) => {
        const header = item.querySelector(".timeline-comment-header");

        if (!header || !item.dataset.gid) {
            return;
        }

        const star = header.querySelector(`#${BOOKMARK_STAR_ID}`);
        if (star) {
            star.addEventListener("click", handleStarClick);
            return;
        }
        const newStar = commentStar(Boolean(pageData?.BOOKMARK.includes(item.dataset.gid)));
        header.insertBefore(newStar, header.lastElementChild);
    });
}
