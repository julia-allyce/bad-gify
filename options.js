function save_options() {
  var blockByDefault = document.getElementById('blockByDefault').checked;
  chrome.storage.sync.set({
    blockByDefault: blockByDefault
  });
}

function restore_options() {
  chrome.storage.sync.get({
    blockByDefault: false
  }, function(items) {
    document.getElementById('blockByDefault').checked = items.blockByDefault;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('blockByDefault').addEventListener('change', save_options);