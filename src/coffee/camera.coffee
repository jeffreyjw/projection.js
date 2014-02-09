"use strict"

class PROJECTION.Camera

  fieldOfView: null
  aspectRatio: null
  zNear: null
  zFar: null

  projectionMatrix: null
  modelViewMatrix: null

  constructor: (fieldOfView, aspectRatio, zNear, zFar) ->
    this.fieldOfView = fieldOfView
    this.aspectRatio = aspectRatio
    this.zNear = zNear
    this.zFar = zFar

    this._createMatrices()

  _createMatrices: () ->
    this.projectionMatrix = mat4.create();
    mat4.perspective(this.projectionMatrix, this.fieldOfView, this.aspectRatio, this.zNear, this.zFar)

    this.modelViewMatrix = mat4.create()
    mat4.lookAt(this.modelViewMatrix, [0, 0, 1], [0, 0, 0], [0, 1, 0])

  transform: (vec) ->
    outVec = vec3.create()
    tmpVec = vec3.create()
    vec3.transformMat4(tmpVec, vec, this.modelViewMatrix)
    vec3.transformMat4(outVec, tmpVec, this.projectionMatrix)

    return outVec



