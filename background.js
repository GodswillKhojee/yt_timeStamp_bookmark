const api = typeof browser !== "undefined" ? browser : chrome;

api.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("youtube.com/watch")) {
        // const queryParameters = tab.url.split("?")[1];
        // const urlParameters = new URLSearchParams(queryParameter);
        const url = new URL(tab.url);

        api.tabs.sendMessage(tabId, {
            type: "NEW",
            videoId: url.searchParams.get("v"),
            // videoId: urlParameter.get("v")
        });
    }
});