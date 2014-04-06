function save_options() {
  var blockByDefault = document.getElementById('blockByDefault').checked;
  chrome.storage.sync.set({
    blockByDefault: blockByDefault
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
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
document.getElementById('save').addEventListener('click', save_options);