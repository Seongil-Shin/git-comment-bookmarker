import bookmarkSidebarBtn from "../components/BookmarkSidebarBtn";

export default function initMenu() {
    const sideBar = document.querySelector(".Layout-sidebar");

    sideBar?.insertBefore(bookmarkSidebarBtn(), sideBar.lastChild);
}
