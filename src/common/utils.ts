export async function saveLocalStorage(key: string, value: any) {
    // @ts-ignore
    return chrome.storage?.local
        ?.set({
            [key]: value,
        })
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
}

export async function getLocalStorage(key: string) {
    // @ts-ignore
    return chrome.storage?.local.get(key);
}
