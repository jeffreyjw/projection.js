"use strict";
PROJECTION.Camera = (function() {
  Camera.prototype.fieldOfView = null;

  Camera.prototype.aspectRatio = null;

  Camera.prototype.zNear = null;

  Camera.prototype.zFar = null;

  Camera.prototype.projectionMatrix = null;

  Camera.prototype.modelViewMatrix = null;

  function Camera(fieldOfView, aspectRatio, zNear, zFar) {
    this.fieldOfView = fieldOfView;
    this.aspectRatio = aspectRatio;
    this.zNear = zNear;
    this.zFar = zFar;
  }

  Camera.prototype._createMatrices = function() {
    this.projectionMatrix = mat4.create();
    mat4.perspective(this.fieldOfView, this.aspectRatio, this.zNear, this.zFar, this.projectionMatrix);
    this.modelViewMatrix = mat4.create();
    return mat4.lookAt([0, 0, 1], [0, 0, 0], [0, 1, 0], this.modelViewMatrix);
  };

  return Camera;

})();
