var CQueue = function() {
    var _queue = [],
        _message = 'Romantic Web Test';

    this.queue = function(newVal) {
        if (typeof newVal != "undefined")
            _queue = newVal;
        return _queue;
    };

    this.message = function(newVal) {
        if (typeof newVal != "undefined")
            _message = newVal;
        return _message;
    };
};

CQueue.prototype.addClientToQueue = function(client){
    this.queue().push(client);
    return this;
};

CQueue.prototype.removeClientFromQueue = function(client){
    this.queue().splice(this.queue().indexOf(client), 1);
    return this;
};

CQueue.prototype.registerMethods = function() {
    Array.prototype.divideIntoParts = function(n) {
        var len = this.length, out = [], i = 0;
        while (i < len) {
            var size = Math.ceil((len - i) / n--);
            out.push(this.slice(i, i += size));
        }
        return out;
    };
};

CQueue.prototype.divideMessageIntoParts = function(count) {
    return this.message().split(' ').divideIntoParts(count);
};

CQueue.prototype.broadcastMessages = function(emittorName) {
    var messageQueue = this.divideMessageIntoParts(this.queue().length);

    for (var i = 0; i < this.queue().length; i++){
        this.queue()[i].emit(emittorName, {
            message: messageQueue[i].join(' ')
        });
    }
};

module.exports = CQueue;