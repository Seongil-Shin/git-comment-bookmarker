import { STORAGE_KEY } from "./constants";

export interface IPageData {
    [STORAGE_KEY.BOOKMARK]: Array<string>;
    [STORAGE_KEY.MEMO]: string;
}
