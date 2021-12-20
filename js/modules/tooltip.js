export default class Tooltip {
  constructor(tooltips) {
    this.tooltips = document.querySelectorAll(tooltips)

    //Bind do objeto da classe aos callbacks
    this.onMouseLeave = this.onMouseLeave.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseOver = this.onMouseOver.bind(this)
  }

  //move a tooltip com base na posição do mouse
  //acho que ta funcionando, eu acho :D
  onMouseMove(event) {
    this.tooltipBox.style.top = `${event.pageY + 20}px`
    if (event.pageX + 240 > window.innerWidth) {
      this.tooltipBox.style.left = `${event.pageX - 190}px`
    } else {
      this.tooltipBox.style.left = `${event.pageX + 20}px`
    }
  }

  //Remove a tootltip e os eventos de mouseMove e mouseLeave
  onMouseLeave({ currentTarget }) {
    this.tooltipBox.remove()
    currentTarget.removeEventListener('mouseleave', this.onMouseLeave)
    currentTarget.removeEventListener('mousemove', this.onMouseMove)
  }

  //Cria a tooltipbox
  criarTooltipBox(element) {
    const tooltipBox = document.createElement('div')
    const text = element.getAttribute('aria-label')
    tooltipBox.classList.add('tooltip')
    tooltipBox.innerText = text
    document.body.appendChild(tooltipBox)
    this.tooltipBox = tooltipBox
  }
  //Cria a tooltip e adiciona os eventos de
  //mouseMove e mouseLeav ao target
  onMouseOver({ currentTarget }) {
    //Cria a tooltip box
    this.criarTooltipBox(currentTarget)
    currentTarget.addEventListener('mousemove', this.onMouseMove)
    currentTarget.addEventListener('mouseleave', this.onMouseLeave)
  }
  //Adiciona os eventos de mouseOver a cada tooltip
  addTooltipEvent() {
    this.tooltips.forEach(item => {
      item.addEventListener('mouseover', this.onMouseOver)
    })
  }
  init() {
    if (this.tooltips.length) {
      this.addTooltipEvent()
    }
    return this
  }
}
