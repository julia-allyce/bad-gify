var badGifies = document.querySelectorAll('img[src$=".gif"]'),
    removedGifs = [];

for (var i = 0, ii = badGifies.length; i < ii; ++i) {
    removedGifs.push(badGifies[i]);
    badGifies[i].remove();
}