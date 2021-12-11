import { CustomTagName } from '../constants'

const maskStyle = `
  width: 100vw;
  height: 100vh;
  background: #00000073;
  position: fixed;
  top: 0;
  left: 0;
  display: block;
  z-index: 2000;
`

const closeStyle = `
  z-index: 2999;
  position: fixed;
  right: 5vw;
  top: 5vh;
  font-size: 16px;
  cursor: pointer;
  color: #fff;
`

const previewImageStyle = `
  z-index: 2999;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%)
`

function tagCreator(tagName: 'div' | 'img', src: string, innerText = '') {
  const tag = document.createElement(tagName)
  switch(tagName) {
    case 'img':
      (tag as HTMLImageElement).src = src
      return tag
    case 'div':
      tag.innerText = innerText
      return tag
    default:
      return tag
  }
}

export class ImgPreviewElement extends HTMLElement {
  #shadow = this.attachShadow({ mode: 'closed' })
  #content = document.createElement('div')
  currentImage = document.createElement('img')
  mask = document.createElement('div')
  previewImage = document.createElement('img')
  close = document.createElement('div')
  #isOpen = false
  #src = ''

  static tagName = CustomTagName.IMG_PREVIEW

  constructor() {
    super()
  }

  connectedCallback() {
    this.#src = this.getAttribute('src')!
    this.#appendChildren()
    this.#handleOpenChange()
    this.#transformAttrs()
    this.#shadow.appendChild(this.#content)
  }

  #appendChildren() {
    const tagConfigs = [
      ['img', 'currentImage'],
      ['div', 'mask'],
      ['img', 'previewImage'],
      ['div', 'close', '关闭']
    ] as const
    tagConfigs.forEach(([tagName, ref, text]) => {
      const tag = tagCreator(tagName, this.#src, text)
      this.#content.append((this[ref] as HTMLElement) = tag!)
    })
    this.#addEvent()
  }

  #closeEvent() {
    this.#isOpen = false
    this.#handleOpenChange()
  }

  #openEvent() {
    this.#isOpen = true
    this.#handleOpenChange()
  }

  #addEvent() {
    this.close.addEventListener('click', () => this.#closeEvent())
    this.currentImage.addEventListener('click', () => this.#openEvent())
  }

  #handleOpenChange() {
    const open = this.#isOpen

    if (open) {
      this.mask.setAttribute('style', maskStyle)
      this.close.setAttribute('style', closeStyle)
      this.previewImage.setAttribute('style', previewImageStyle)
    } else {
      this.currentImage.setAttribute('style', 'cursor: pointer; max-width: 200px; max-height: 100px;')
      this.mask.setAttribute('style', 'display: none;')
      this.close.setAttribute('style', 'display: none;')
      this.previewImage.setAttribute('style', 'display: none;')
    }
  }

  #transformAttrs() {
    const attrNames = this.getAttributeNames() || []
    attrNames.forEach(attr => {
      this.currentImage.setAttribute(attr, this.getAttribute(attr)!)
    })
  }
}
