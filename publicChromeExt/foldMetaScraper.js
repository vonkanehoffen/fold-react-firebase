document.body.style.backgroundColor="green"


var desc = document.head.querySelector('meta[name="twitter:description"]').content;
console.log('meta scraed:', desc)
// var port = chrome.runtime.connect();

chrome.runtime.sendMessage({description: desc}, function(response) {
  // console.log(response.farewell);
});
// port.postMessage({ type: "FROM_PAGE", text: "Hello from the webpage!" }, "*");