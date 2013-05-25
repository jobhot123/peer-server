// Generated by CoffeeScript 1.6.2
(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.ServerFile = (function(_super) {
    __extends(ServerFile, _super);

    function ServerFile() {
      this.updateFileType = __bind(this.updateFileType, this);      _ref = ServerFile.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ServerFile.prototype.defaults = {
      name: "",
      size: 0,
      contents: "",
      type: "",
      fileType: "",
      isProductionVersion: false,
      isRequired: false,
      dateCreated: null,
      hasBeenEdited: false
    };

    ServerFile.fileTypeEnum = {
      HTML: "HTML",
      CSS: "CSS",
      JS: "JS",
      IMG: "IMG",
      NONE: "NONE"
    };

    ServerFile.prototype.initialize = function() {
      this.on("change:type", this.updateFileType);
      this.updateFileType();
      if (this.get("dateCreated") === null) {
        return this.set("dateCreated", new Date());
      }
    };

    ServerFile.prototype.updateFileType = function() {
      return this.set("fileType", ServerFile.rawTypeToFileType(this.get("type")));
    };

    ServerFile.rawTypeToFileType = function(rawType) {
      if (rawType === "image/jpeg" || rawType === "image/png") {
        return ServerFile.fileTypeEnum.IMG;
      }
      if (rawType === "text/html") {
        return ServerFile.fileTypeEnum.HTML;
      }
      if (rawType === "text/css") {
        return ServerFile.fileTypeEnum.CSS;
      }
      if (rawType === "application/x-javascript") {
        return ServerFile.fileTypeEnum.JS;
      }
    };

    return ServerFile;

  }).call(this, Backbone.Model);

}).call(this);

/*
//@ sourceMappingURL=ServerFile.map
*/
