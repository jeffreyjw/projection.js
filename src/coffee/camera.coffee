"use strict"

class PROJECTION.Camera

  fieldOfView: null
  aspectRatio: null
  zNear: null
  zFar: null

  projectionMatrix: null
  viewMatrix: null

  constructor: (fieldOfView, aspectRatio, zNear, zFar) ->
    this.fieldOfView = fieldOfView
    this.aspectRatio = aspectRatio
    this.zNear = zNear
    this.zFar = zFar

    this._createMatrices()

  _createMatrices: () ->
    this.projectionMatrix = mat4.create();
    mat4.perspective(this.projectionMatrix, this.fieldOfView, this.aspectRatio, this.zNear, this.zFar)

    this.viewMatrix = mat4.create()
    mat4.lookAt(this.viewMatrix, [0, 0, 1], [0, 0, 0], [0, 1, 0])

  transform: (vec, modelMatrix) ->
    outVec = vec3.create()
    vec3.transformMat4(outVec, vec, modelMatrix)
    vec3.transformMat4(outVec, outVec, this.viewMatrix)
    vec3.transformMat4(outVec, outVec, this.projectionMatrix)

    return outVec



