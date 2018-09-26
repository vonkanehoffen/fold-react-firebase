/**
 * Fold.im
 * Scrape the page description from the DOM and send it back to the extension.
 */

var description =
  document.head.querySelector('meta[name="description"]') ||
  document.head.querySelector('meta[name="twitter:description"]') ||
  document.head.querySelector('meta[name="og:description"]')

chrome.runtime.sendMessage({
  scrape: {
    description: description && description.content,
  }
});
