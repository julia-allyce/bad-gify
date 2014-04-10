var blockByDefault = false,
	gifsHidden = false;

function toggleGifs () {
	var badGifies = document.querySelectorAll('img[src$=".gif"]');

	if(!badGifies.length)
		return;

	if (!gifsHidden) {
		for (var i = 0, ii = badGifies.length; i < ii; ++i) {
		    badGifies[i].style.opacity = 0;
		}
		gifsHidden = true;
	} else {
		for (var i = 0, ii = badGifies.length; i < ii; ++i) {
		    badGifies[i].style.opacity = 1;
		}
		gifsHidden = false;
	}
}

chrome.runtime.onMessage.addListener(function (response) {
 	if (response.message === 'toggleGifs') {
 		toggleGifs();
 	}

 	if (response.message === 'blockByDefault') {
 		blockByDefault = response.results.blockByDefault;
		if (blockByDefault)
			toggleGifs();
 	}
});

chrome.runtime.sendMessage('isBlockedByDefault');