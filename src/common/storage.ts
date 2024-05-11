import { STORAGE_KEY } from "./constants";
import { IPageData } from "./type";
import { getLocalStorage, saveLocalStorage } from "./utils";

export async function getPageData() {
    const key = location.pathname;
    const value = await getLocalStorage(key);
    let pageData = null;
    if (value[key] === undefined) {
        pageData = {
            [STORAGE_KEY.BOOKMARK]: [],
            [STORAGE_KEY.MEMO]: "",
        };
    } else {
        pageData = value[key];
    }

    return pageData as IPageData;
}

export async function saveBookmarkOnPageData(pageData: IPageData, newBookmark: Array<string>) {
    const key = location.pathname;
    return saveLocalStorage(key, {
        ...pageData,
        [STORAGE_KEY.BOOKMARK]: newBookmark,
    });
}
