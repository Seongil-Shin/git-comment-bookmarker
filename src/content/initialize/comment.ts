import { getPageData } from "../../common/storage";
import commentStar from "../components/CommentStar";

export default async function initComment() {
    const pageData = await getPageData();
    const comments = document.querySelectorAll(".js-timeline-item") as NodeListOf<HTMLDivElement>;

    comments.forEach((item) => {
        const header = item.querySelector(".timeline-comment-header");
        if (!header || !item.dataset.gid) {
            return;
        }

        const star = commentStar(Boolean(pageData?.BOOKMARK.includes(item.dataset.gid)));
        header.insertBefore(star, header.lastElementChild);
    });
}
