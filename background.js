const api = typeof browser !== "undefined" ? browser : chrome;

api.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url) {

        const url = new URL(tab.url); // full url
 
        // check if url is of yt video
        if (url.hostname.includes("youtube.com") &&
            url.pathname === "/watch") {

            const videoId = url.searchParams.get("v");

            console.log(":-) YouTube video ID:", videoId);

            if (videoId) {
                api.tabs.sendMessage(tabId, {
                    type: "NEW",
                    videoId: videoId
                }).then(() => {
                    console.log(":-) Message sent successfully");
                }).catch((error) => {
                    console.log(":-( Message failed:", error);
                });
            }
        }
    }
});