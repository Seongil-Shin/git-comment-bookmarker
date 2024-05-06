import bookmarkSidebarBtn from "../components/sidebar/BookmarkSidebarBtn";

export default function initMenu() {
    const sideBar = document.querySelector(".Layout-sidebar");
    if (sideBar === null) {
        return false;
    }

    sideBar.insertBefore(bookmarkSidebarBtn(), sideBar.lastChild);
    // sideBar.insertBefore(memoSidebarBtn(), sideBar.lastChild);

    return true;
}
