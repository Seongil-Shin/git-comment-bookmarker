import bookmarkSidebarBtn from "../components/sidebar/BookmarkSidebarBtn";

export default function initMenu() {
    const sideBar = document.querySelector(".Layout-sidebar");
    if (sideBar === null) {
        return false;
    }

    const sideBarBtn = bookmarkSidebarBtn();
    if (sideBarBtn !== null) {
        sideBar.insertBefore(sideBarBtn, sideBar.lastChild);
    }
    // sideBar.insertBefore(memoSidebarBtn(), sideBar.lastChild);

    return true;
}
