importScripts("lunr.min.js");

addEventListener('message', function (e) {
    var index = lunr(function () {
        this.field('title', {boost: 10})
        this.field('body')
        this.ref('id')

        e.data.forEach(function (doc) {
            this.add(doc)
        }, this);
    });

    self.postMessage(JSON.stringify(index));
});
