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
