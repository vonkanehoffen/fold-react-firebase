const config = {
  firebase: {
    apiKey: "AIzaSyAcRXDgG5ILo4L8NoF_ZtSaV9_e6jNacw0",
    authDomain: "foldapp-8df86.firebaseapp.com",
    databaseURL: "https://foldapp-8df86.firebaseio.com",
    projectId: "foldapp-8df86",
    storageBucket: "",
    messagingSenderId: "825457505870"
  },
  /*global chrome */
  isChromeExt: typeof chrome !== "undefined" && !!chrome.identity,
}

export default config