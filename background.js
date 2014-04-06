chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.sendMessage(tab.id, {message: 'toggleGifs'});
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	if (message === 'isBlockedByDefault') {
		var storage = chrome.storage.sync;

		storage.get('blockByDefault', function (results) {
			chrome.tabs.sendMessage(sender.tab.id, { 
				message: 'blockByDefault',
				results: results
			});
		});
	}
})