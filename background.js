chrome.runtime.onInstalled.addListener(({ reason, version }) => {
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    console.log(reason);
  }
});
