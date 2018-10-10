# Fold (Web)

FireBase version my bookmarking pet project....

License: [Creative Commons BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/3.0/)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Chrome Extension

Admin: https://chrome.google.com/webstore/developer/dashboard

"More Info" next to the app for the public key. (`"key"` in `manifest.json`)

[Chrome Client 1](https://console.cloud.google.com/apis/credentials?project=foldapp-8df86) for oAuth client ID

## Deploy

```
yarn build && firebase deploy
```

## TODO:
 - Auto populate last used tags on Create screen
 - Save last tag even if not committed with space
 - Don't auto-capitalize tags. "JS" "CSS" etc abbreviations don't work. Have a separate index field to query on?
 
 - Fix service workers. Still not fully sorted: https://github.com/facebook/create-react-app/issues/2440
 actually:
 https://github.com/facebook/create-react-app/issues/3882
 
 
 - Show only available secondary tags in MyTags