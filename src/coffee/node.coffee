"use strict"

class PROJECTION.Node

  position: null
  scale: 0
  rotation: null
  parent: null
  children: null
  matrix: null
  _identity: null


  constructor: (parent = null) ->
    this.parent = parent
    this.children = []
    if parent
      this.parent.children.push(this)
    this.matrix = mat4.create()
    this.position = vec3.create()
    this.rotation = [ 0, 0, 0 ]
    this._identity = mat4.create()


  update: () ->
    mat4.translate(this.matrix, this._parentMatrix(), this.position)

    for child, index in this.children
      if child.parent == this
        child.update()
      else
        this.children[index] = null

    this.children = this.children.filter(
      (child) ->
        return child != null
    )


  _parentMatrix: () ->
    if this.parent != null
      return this.parent.matrix
    else
      return this._identity


  getData2d: (camera) ->
    out = {
      position: null,
      scale: null
    }

    vec = camera.transform(this.position, this._parentMatrix())

    if (vec[2] == 0)
      out.position = [0, 0]
      out.scale = 0
    else
      out.scale = 1/vec[2]
      out.position = [ vec[0]*out.scale, vec[1]*out.scale ]

    return out