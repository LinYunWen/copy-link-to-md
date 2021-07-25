const COPY_TITLE = 'title';
const COPY_SELECTION = 'selection';
const items = [
  {
    id: COPY_TITLE,
    title: "Copy Page Title and Url",
    contexts: ["page"],
  },
  {
    id: COPY_SELECTION,
    title: "Copy Selection and Url",
    contexts: ["selection"],
  }
]

for (let item of items) {
  chrome.contextMenus.create(item);
}

chrome.contextMenus.onClicked.addListener(handleClickCM);

function handleClickCM(info, tab) {
  chrome.tabs.sendMessage(tab.id,
    {
      from: "copy_link_to_md",
      isTitle: info.menuItemId === COPY_TITLE
    }
  );
}

