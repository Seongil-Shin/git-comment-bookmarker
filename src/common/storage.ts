import { STORAGE_KEY } from "./constants";
import { IPageData } from "./type";
import { getLocalStorage, saveLocalStorage } from "./utils";

export async function getPageData() {
    const value = await getLocalStorage(location.href);
    let pageData = value[location.href];
    if (value[location.href] === undefined) {
        pageData = {
            [STORAGE_KEY.BOOKMARK]: [],
            [STORAGE_KEY.MEMO]: "",
        };
    }

    return pageData as IPageData;
}

export async function saveBookmarkOnPageData(pageData: IPageData, newBookmark: Array<string>) {
    return saveLocalStorage(location.href, {
        ...pageData,
        [STORAGE_KEY.BOOKMARK]: newBookmark,
    });
}
