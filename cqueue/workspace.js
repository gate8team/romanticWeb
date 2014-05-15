var CQueue = require('./cqueue'),
    FlakeIdGen = require('flake-idgen'),
    generator = new FlakeIdGen(),
    util = require('util');

var Workspace = function (){
    Workspace.super_.apply(this, arguments);
    var _workspaceId = generator.next();

    this.workspaceId = function(){
      return _workspaceId;
    };
};

util.inherits(Workspace, CQueue);

module.exports = Workspace;