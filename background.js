browser.pageAction.onClicked.addListener((tab) => {
  browser.tabs.sendMessage(tab.id, { tabId: tab.id });
});

browser.runtime.onMessage.addListener(({ enabled, tabId }) => {
  const path = enabled ? 'icons/icon_enabled.svg' : 'icons/icon_disabled.svg';

  browser.pageAction.setIcon({ tabId, path });
});