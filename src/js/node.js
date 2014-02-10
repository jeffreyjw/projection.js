"use strict";
PROJECTION.Node = (function() {
  Node.prototype.position = null;

  Node.prototype.scale = 0;

  Node.prototype.parent = null;

  Node.prototype.children = null;

  Node.prototype.matrix = null;

  function Node(parent) {
    if (parent == null) {
      parent = null;
    }
    this.parent = parent;
    this.children = [];
    if (parent) {
      this.parent.children.push(this);
    }
    this.matrix = mat4.create();
    this.position = vec3.create();
  }

  Node.prototype.update = function() {
    var child, _i, _len, _ref, _results;
    if (this.parent !== null) {
      mat4.translate(this.matrix, this.parent.matrix, this.position);
    } else {
      mat4.translate(this.matrix, mat4.create(), this.position);
    }
    _ref = this.children;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      _results.push(child.update());
    }
    return _results;
  };

  Node.prototype.getData2d = function(camera) {
    var out, vec;
    out = {
      position: null,
      scale: null
    };
    vec = null;
    if (this.parent !== null) {
      vec = camera.transform(this.position, this.parent.matrix);
    } else {
      vec = camera.transform(this.position, mat4.create());
    }
    if (vec[2] === 0) {
      out.position = [0, 0];
      out.scale = 0;
    } else {
      out.scale = -1 / vec[2];
      out.position = [vec[0] * out.scale, vec[1] * out.scale];
    }
    return out;
  };

  return Node;

})();
