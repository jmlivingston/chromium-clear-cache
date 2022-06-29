chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.includes('chrome://')) {
    const url = new URL(tab.url).origin
    chrome.browsingData.remove(
      {
        origins: [url],
      },
      {
        appcache: true,
        cache: true,
        cacheStorage: true,
        cookies: true,
        indexedDB: true,
        localStorage: true,
        serviceWorkers: true,
        webSQL: true,
      },
      () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, { url })
        })
      }
    )

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => {
        chrome.runtime.onMessage.addListener(() => location.reload())
      },
    })
  }
})
