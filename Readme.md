# YT Time Stamps Bookmark
this is my first project on making a extension for browser.
here we are making a time stamp bookmark for the YouTube in which user can bookmark the time stamp for every videos and can jump back to it where user left off

so basic setup is made here
wrote `manifest.json `

what `manifest` do??
it is simply a blueprint for the browser to that what is the extension about, what permission it going to use, what browser should do to it..

```js
{
  "manifest_version": 3,
  "name": "YT Bookmark",
  "version": "0.1.0",
  "description": "Save and manage timestamps for YouTube videos.",

  "permissions": [
    "storage",
    "tabs"
  ],

  "host_permissions": [
    "https://*.youtube.com/*"
  ],

  "background": {
    "service_worker": "background.js"
  },

  "content_scripts": [
    {
      "matches": [
        "https://*.youtube.com/*"
      ],
      "js": [
        "contentScript.js"
      ]
    }
  ],

  "web_accessible_resources": [
    {
      "resources": [
        "assets/bookmark.png",
        "assets/play.png",
        "assets/delete.png",
        "assets/save.png"
      ],
      "matches": [
        "https://*.youtube.com/*"
      ]
    }
  ],

  "action": {
    "default_icon": {
      "16": "assets/exit.png",
      "24": "assets/exit.png",
      "32": "assets/exit.png"
    },
    "default_title": "YT TimeStamp",
    "default_popup": "popup.html"
  }
}
```

`background.js` -> 

```js
chrome.tabs.onUpdated.addlistener((tabId, tab) => {

	if (tab.url && tab.url.includes("youtube.com/watch")) {
	const queryParameters = tab.url.split("?")[1];
	const urlParameters = new URLSearchParams(queryParameter);
	chrome.tab.sendMessage(tabId, {
	
		type: "NEW",
		videoId: urlParameter.get("v")
		
		});
	}
});
```
`background` is checking the tab if it is switches or not then checking if the `url`is of "youtube.com/watch" 

then getting the unique video code by using split method '?'

then using `sendMessage` we are sending type if the tab is new and videoId to `contentScripts`

```js
// this is a Immediately Invoked Function Expression
(()=>{

	let youtubeLeftControls, youtubePlayer;
	let currentVideo = "";
	chrome.runtime.onMessage.addListener((obj, sender, response) =>
	{
		const {type, value, videoId} = obj; // object destructuring
		
		if(type == "NEW")
		{
			currentVideo = videoId;
			console.log(currentVideo);
			newVideoLoaded();
		}
	
	})

});
```

`contentScript.js` runs inside the YouTube webpage and communicates with the extension's background script.

## What it does

- Listens for messages from `background.js` using `chrome.runtime.onMessage`.
- Checks if the received message is of type `"NEW"`.
- Stores the current YouTube video's ID in `currentVideo`.
- Calls `newVideoLoaded()` whenever a new video is detected.

## Message Format

The background script sends a message like:

```
{
    type: "NEW",
    videoId: "abc123"
}
```

The content script receives it and extracts the values:

```
const { type, videoId } = obj;
```

Then it stores the video ID:

```
currentVideo = videoId;
```

## Communication Flow

```
background.js
     │
     │ sendMessage()
     ▼
contentScript.js
     │
     │ onMessage
     ▼
currentVideo = videoId
     │
     ▼
newVideoLoaded()
```
