export async function saveLocalStorage(key: string, value: any) {
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
    return chrome.storage?.local.get(key);
}
