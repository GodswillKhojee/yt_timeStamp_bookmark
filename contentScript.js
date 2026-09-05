(() => {

    const api = typeof browser !== "undefined" ? browser : chrome;
    let currentVideo = "";
    console.log(":-) Content script loaded!");
    api.runtime.onMessage.addListener((obj) => {
        const { type, videoId } = obj;
        console.log(":-) Message received:", obj);
        if (type === "NEW") {

            currentVideo = videoId;
            console.log("Current video:", currentVideo);
            newVideoLoaded();
        }
    });

    const newVideoLoaded = () => {

        const youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
        if (!youtubeLeftControls) {
            console.log(":-( YouTube controls not found");
            return;
        }

        const bookmarkBtnExist = document.getElementsByClassName("bookmark-btn")[0];

        if (!bookmarkBtnExist) {
            const bookmarkBtn = document.createElement("img")
            bookmarkBtn.src = api.runtime.getURL("assets/bookmark.png")
            bookmarkBtn.className = "ytp-button " + "bookmark-btn"
            bookmarkBtn.title = "Click to bookmark current timestamp"
            youtubeLeftControls.appendChild(bookmarkBtn);
        }
    };

    newVideoLoaded();

})();