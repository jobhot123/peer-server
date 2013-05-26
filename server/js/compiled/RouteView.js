// Generated by CoffeeScript 1.6.2
(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.RouteView = (function(_super) {
    __extends(RouteView, _super);

    function RouteView() {
      this.renderValidationResult = __bind(this.renderValidationResult, this);
      this.eventNameChange = __bind(this.eventNameChange, this);
      this.eventPathChange = __bind(this.eventPathChange, this);
      this.updateContents = __bind(this.updateContents, this);
      this.createEditor = __bind(this.createEditor, this);
      this.renderFunctionSignature = __bind(this.renderFunctionSignature, this);
      this.adjustHeights = __bind(this.adjustHeights, this);
      this.render = __bind(this.render, this);
      this.paramNamesToString = __bind(this.paramNamesToString, this);      _ref = RouteView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    RouteView.prototype.initialize = function(options) {
      this.tmplRoute = Handlebars.compile($("#route-template").html());
      this.tmplFunctionSignature = Handlebars.compile($("#route-function-signature-template").html());
      this.model.on("change", this.renderValidationResult);
      return this.model.on("change:paramNames", this.renderFunctionSignature);
    };

    RouteView.prototype.events = {
      "keyup .path": "eventPathChange",
      "keyup .name": "eventNameChange"
    };

    RouteView.prototype.paramNamesToString = function(paramNames) {
      if (paramNames.length === 0) {
        return "params";
      }
      return paramNames.join(", ") + ", params";
    };

    RouteView.prototype.render = function() {
      var $el;

      $el = $(this.el);
      $el.html(this.tmplRoute({
        name: this.model.get("name"),
        path: this.model.get("routePath"),
        functionParams: this.paramNamesToString([])
      }));
      this.code = this.$(".code");
      this.path = this.$(".path");
      this.functionSignature = this.$(".function-signature");
      this.aceEditor = this.createEditor(this.code);
      this.aceEditor.getSession().setValue(this.model.get("routeCode"));
      this.aceEditor.on("change", this.updateContents);
      this.renderFunctionSignature();
      this.name.tipsy({
        fallback: "Invalid name",
        trigger: "manual"
      });
      this.path.tipsy({
        fallback: "Invalid route path",
        trigger: "manual"
      });
      return this;
    };

    RouteView.prototype.adjustHeights = function() {
      var $el, codeHeight, padding;

      $el = $(this.el);
      this.$(".function").outerHeight($el.height() - this.$(".route-path").outerHeight(true));
      padding = this.$(".function").innerHeight() - this.$(".function").height();
      codeHeight = this.$(".function").height() - padding;
      codeHeight -= this.functionSignature.outerHeight(true);
      codeHeight -= this.$(".function-close").outerHeight(true);
      codeHeight -= this.$(".route-help").outerHeight(true);
      return this.code.outerHeight(codeHeight);
    };

    RouteView.prototype.renderFunctionSignature = function() {
      this.functionSignature.html(this.tmplFunctionSignature({
        name: this.model.get("name"),
        parameterString: this.paramNamesToString(this.model.get("paramNames"))
      }));
      return this.name = this.$(".name");
    };

    RouteView.prototype.createEditor = function(elem) {
      var editor;

      editor = ace.edit(elem[0]);
      editor.setTheme("ace/theme/tomorrow_night_eighties");
      editor.setFontSize("12px");
      editor.getSession().setMode("ace/mode/javascript");
      return editor;
    };

    RouteView.prototype.updateContents = function() {
      return this.model.save("routeCode", this.aceEditor.getValue());
    };

    RouteView.prototype.eventPathChange = function(event) {
      var target;

      target = $(event.currentTarget);
      return this.model.save("routePath", target.val());
    };

    RouteView.prototype.eventNameChange = function(event) {
      var target;

      target = $(event.currentTarget);
      return this.model.save("name", target.val());
    };

    RouteView.prototype.renderValidationResult = function(model, error) {
      this.model.isValid();
      error = this.model.validationError;
      if (error && error.name) {
        this.name.tipsy("show");
      } else {
        this.name.tipsy("hide");
      }
      if (error && error.routePath) {
        return this.path.tipsy("show");
      } else {
        return this.path.tipsy("hide");
      }
    };

    return RouteView;

  })(Backbone.View);

}).call(this);

/*
//@ sourceMappingURL=RouteView.map
*/
