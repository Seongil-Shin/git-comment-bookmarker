import initComment from "./comment";

export default function initLoadMore() {
    const loadMoreBtn = document.querySelector("#js-progressive-timeline-item-container .discussion-item-header div");

    if (loadMoreBtn === null) {
        return;
    }

    loadMoreBtn.addEventListener("click", onClickLoadMore);
}

function onClickLoadMore(e: Event) {
    const target = e.target as HTMLElement;
    const closestTimelineContainer = target.closest("#js-progressive-timeline-item-container");
    const intervalId = setInterval(() => {
        const comments = closestTimelineContainer?.querySelectorAll<HTMLDivElement>(":scope > div.js-timeline-item");
        if (comments === undefined || comments.length === 0) {
            return;
        }
        clearInterval(intervalId);
        initComment(comments);
        initLoadMore();
    }, 500);
}
