export default class Gradientify {
  public target: HTMLElement | HTMLElement[]
  public gradients: string[]
  public fadeInterval: number // In miliseconds

  private gradientElements: HTMLElement[]
  private interval: number // setInterval type (yes, it's a number. lol)

  constructor (
    target: HTMLElement | HTMLElement[],
    gradients: string[],
    fadeInterval: number
  ) {
    this.target = target
    this.gradients = gradients
    this.fadeInterval = fadeInterval
    this.createGradientElements()
    this.appendGradients()
    this.startAnimation()
  }

  /*
    This guy beneath is responsible for creating
    divs with gradient backgrounds, which are going
    to be appended to the target element(s) 👩🏻‍🔬
  */
  private createGradientElements () {
    this.gradientElements = this.gradients.map((gradient, index) => {
      let element = document.createElement('div')
      Object.assign(element.style, {
        position: 'absolute',
        height: '100%',
        width: '100%',
        opacity: index === 0 ? 1:0,
        top: 0,
        left: 0,
        transitionTimingFunction: 'linear',
        backgroundImage: gradient,
        transitionDuration: `${this.fadeInterval / 1000}s`,
      })
      return element
    })
  }

  // Time to append our gradients! 🧚‍♀️
  private appendGradients () {
    if (this.target instanceof Array) {
      // Multiple targets
      this.target.forEach(target => {
        if (target.style.position !== 'absolute') {
          target.style.position = 'relative'
        }
        this.gradientElements.forEach(element => {
          target.appendChild(element)
        })
      })
    } else {
      // One target
      let target = this.target as HTMLElement
      if (target.style.position !== 'absolute') {
        target.style.position = 'relative'
      }
      this.gradientElements.forEach(element => {
        target.appendChild(element)
      })
    }
  }

  /*
    Here lies the whole magic of this library:
    Every X seconds we set the opacity of the next
    gradient element to 1, and a CSS transition does the rest. Yay!
    *uncomfortably complex computations grinning in the background*
  */
  public startAnimation () {
    this.interval = setInterval(() => {
      for (let [index, element] of this.gradientElements.entries()) {
        if (element.style.opacity === '1') {
          element.style.opacity = '0'
          let nextElement = this.gradientElements[++index % this.gradientElements.length]
          nextElement.style.opacity = '1'
          break
        }
      }
    }, this.fadeInterval)
  }

  // Fairly straightforward
  public stopAnimation () {
    clearInterval(this.interval)
  }
}
