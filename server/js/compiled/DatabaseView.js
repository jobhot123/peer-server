// Generated by CoffeeScript 1.6.3
(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.DatabaseView = (function(_super) {
    __extends(DatabaseView, _super);

    function DatabaseView() {
      this.runQuery = __bind(this.runQuery, this);
      this.render = __bind(this.render, this);
      _ref = DatabaseView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    DatabaseView.prototype.el = "#database-view";

    DatabaseView.prototype.events = {
      "click .run-query": "runQuery"
    };

    DatabaseView.prototype.initialize = function(options) {
      this.userDatabase = options.userDatabase;
      this.tmplUserDatabase = Handlebars.templates["user-database"];
      this.userDatabase.on("initLocalStorage", this.render);
      return this.render();
    };

    DatabaseView.prototype.render = function() {
      var fileContents, json;
      json = this.userDatabase.toString(true);
      $(this.el).html(this.tmplUserDatabase({
        json: json
      }));
      this.queryEditor = this.$(".query-editor");
      this.output = this.$(".output");
      hljs.highlightBlock(this.output[0], false, false);
      fileContents = this.queryEditor;
      this.aceEditor = ace.edit(fileContents[0]);
      this.aceEditor.setTheme("ace/theme/tomorrow_night_eighties");
      this.aceEditor.setFontSize("12px");
      this.aceEditor.getSession().setMode("ace/mode/javascript");
      return this;
    };

    DatabaseView.prototype.runQuery = function() {
      var json, query, result;
      query = this.aceEditor.getValue();
      if (!/return/.test(query)) {
        query += "return database().get();";
      }
      result = this.userDatabase.runQuery(query);
      json = JSON.stringify(result, null, 4);
      this.output.text(json);
      return hljs.highlightBlock(this.output[0], false, false);
    };

    return DatabaseView;

  })(Backbone.View);

}).call(this);
