chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.from !== "copy_link_to_md") return;

  let data = "";
  let url = window.location.href;
  if (request.isTitle) {
    data = `[${document.title}](${url})`;
  } else {
    data = `[${window.getSelection().toString().trim()}](${url})`;
  }

  const selectionRange = request.isTitle ? null : saveSelection();
  copyToClipboard(data);
  restoreSelection(selectionRange);
});

function copyToClipboard(data) {
  // https://stackoverflow.com/questions/3436102/copy-to-clipboard-in-chrome-extension
  const copyEle = document.createElement('textarea');
  copyEle.textContent = data;
  document.body.appendChild(copyEle);
  copyEle.select();
  document.execCommand('copy');
  document.body.removeChild(copyEle);
}

// because do select() on textarea will remove the original selected text
// therefore, save and restore DOM text selection, by dantaex
// https://gist.github.com/dantaex/543e721be845c18d2f92652c0ebe06aa
function saveSelection() {
  if (window.getSelection) {
      const selected = window.getSelection();
      if (selected.getRangeAt) {
          return selected.getRangeAt(0);
      }
  }
  return null;
}

function restoreSelection(range) {
  if (range && window.getSelection) {
    const selected = window.getSelection();
    selected.removeAllRanges();
    selected.addRange(range);
  }
}
