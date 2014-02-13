"use strict"

class PROJECTION.Node

  position: null
  scale: 0
  parent: null
  children: null
  matrix: null

  constructor: (parent = null) ->
    this.parent = parent
    this.children = []
    if parent
      this.parent.children.push(this)
    this.matrix = mat4.create()
    this.position = vec3.create()

  update: () ->
    if (this.parent != null)
      mat4.translate(this.matrix, this.parent.matrix, this.position)
    else
      mat4.translate(this.matrix, mat4.create(), this.position)

    for child in this.children
      # TODO: check if child.parent == this and remove from array if not
      child.update()

  getData2d: (camera) ->
    out = {
      position: null,
      scale: null
    }

    vec = null
    if this.parent != null
      vec = camera.transform(this.position, this.parent.matrix)
    else
      vec = camera.transform(this.position, mat4.create())

    if (vec[2] == 0)
      out.position = [0, 0]
      out.scale = 0
    else
      out.scale = 1/vec[2]
      out.position = [ vec[0]*out.scale, vec[1]*out.scale ]

    return out