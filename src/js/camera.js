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
    this._createMatrices();
  }

  Camera.prototype._createMatrices = function() {
    this.projectionMatrix = mat4.create();
    mat4.perspective(this.projectionMatrix, this.fieldOfView, this.aspectRatio, this.zNear, this.zFar);
    this.modelViewMatrix = mat4.create();
    return mat4.lookAt(this.modelViewMatrix, [0, 0, 1], [0, 0, 0], [0, 1, 0]);
  };

  Camera.prototype.transform = function(vec) {
    var outVec, tmpVec;
    outVec = vec3.create();
    tmpVec = vec3.create();
    vec3.transformMat4(tmpVec, vec, this.modelViewMatrix);
    vec3.transformMat4(outVec, tmpVec, this.projectionMatrix);
    return outVec;
  };

  return Camera;

})();
