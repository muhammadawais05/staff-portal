class Slider {
  constructor(private selector?: string) {}

  get container() {
    return cy.get(`${this.selector}`)
  }

  get thumb() {
    return this.container.find('.MuiSlider-thumb')
  }

  get tooltip() {
    return this.thumb.invoke('attr', 'aria-describedby').then(value => {
      return cy.get(`#${value}`)
    })
  }

  move(direction: 'left' | 'right', steps: number) {
    this.thumb.focus().type(`{${direction}Arrow}`.repeat(steps), { delay: 0 })
  }
}

export default Slider
