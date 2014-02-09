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

  _createMatrices: () ->
    this.projectionMatrix = mat4.create();
    mat4.perspective(this.fieldOfView, this.aspectRatio, this.zNear, this.zFar, this.projectionMatrix)

    this.modelViewMatrix = mat4.create()
    mat4.lookAt([0, 0, 1], [0, 0, 0], [0, 1, 0], this.modelViewMatrix)




