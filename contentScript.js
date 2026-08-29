// this is a Immediately Invoked Function Expression
(()=>{
    const api = typeof browser !== "undefined" ? browser : chrome;
    let youtubeLeftControls, youtubePlayer;
    let currentVideo = "";

    api.runtime.onMessage.addListener((obj, sender, response) =>
    {
        const {type, value, videoId} = obj; // object destructuring 

        if(type == "NEW")
        {
            currentVideo = videoId;
            console.log(currentVideo);
            newVideoLoaded();
        }
    })
    const newVideoLoaded = () =>
    {
        const bookmarkBtnExist = document.getElementsByClassName("bookmark-btn")[0];

        if(!bookmarkBtnExist)
        {
            const bookmarkBtn = document.createElement("img");

            bookmarkBtn.src = api.runtime.getURL("assets/bookmark.png");
            bookmarkBtn.className = "ytp-button" + "bookmark-btn";
            bookmarkBtn.title = "click to bookmark current time stamp";

            youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
            youtubePlayer = document.getElementsByClassName("video-stream")[0];

            youtubeLeftControls.appendChild(bookmarkBtn);
        }
    }
});