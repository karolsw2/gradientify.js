/*
 * Gradientify.js
 * ------------
 * Version : 3.0.0
 * Author  : Karol Świerczek (@karolsw2)
 */

;(function () {
  'use strict'

  var gf
  var presets = []

  function Gradientify () {
    if (typeof this === `undefined` || Object.getPrototypeOf(this) !== Gradientify.prototype) {
      return new Gradientify()
    }
    gf = this
    return gf
  }

  Gradientify.prototype.create = function (target, gradients, interval) {
    let elements
    elements = createGradientElements(gradients, interval, target)
    appendElementsOnTarget(elements, target)
    initialiseInterval(elements, interval)
  }

  Gradientify.prototype.load = function (target, hash, interval) {
    let elements, gradients
    loadPresetsJSON((presets) => {
      presets.find(preset => {
        if (preset.id === hash) {
          interval = preset.interval
          gradients = preset.gradients
        }
      })
      elements = createGradientElements(gradients, interval, target)
      appendElementsOnTarget(elements, target)
      initialiseInterval(elements, interval)
    })
  }

  function loadPresetsJSON (callback) {
    if (presets.length === 0) {
      let xobj = new XMLHttpRequest()
      xobj.overrideMimeType('application/json')
      xobj.open('GET', 'https://rawgit.com/karolsw2/gradientify.js/master/build/presets.json', true)
      xobj.onreadystatechange = function () {
        if (xobj.readyState === 4 && xobj.status === 200) {
          presets = JSON.parse(xobj.responseText)
          callback(presets)
        }
      }
      xobj.send(null)
    } else {
      callback(presets)
    }
  }

  function appendElementsOnTarget (elements, target) {
    elements.map(element => {
      target.appendChild(element)
    })
  }

  function createGradientElements (gradients, interval, target) {
    return gradients.map((gradient, index) => {
      let gradientElement = document.createElement(`div`)

      Object.assign(gradientElement.style, {
        backgroundImage: gradient,
        opacity: (index === 0) ? 1 : 0,
        transitionDuration: `${interval / 1000}s`,
        zIndex: target === document.body ? -999 : 2
      })

      gradientElement.classList.add(`gradientify-gradient`)

      return gradientElement
    })
  }

  function initialiseInterval (elements, interval) {
    setInterval(() => {
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].style.opacity === `1`) {
          elements[i].style.opacity = 0
          elements[++i % elements.length].style.opacity = 1
        }
      }
    }, interval + 40)
  }

  window.Gradientify = Gradientify
})()
