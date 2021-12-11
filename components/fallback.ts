import { CustomTagName } from '../constants'

export class FallbackElement extends HTMLElement {
  static tagName = CustomTagName.FALL_BACK

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'closed' })
    const styleTemplate = `
.fallback {
  color: #d9d9d9;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10vmin;
  height: 10vmin;
  overflow: hidden;
  line-height: 10vmin;
}

.fallback::after {
  width: 1vmin;
  height: 100%;
  display: block;
  content: '';
  background-color: #f0f2f5;
  position: absolute;
  top: 0;
  transform: skew(35deg);
  animation: 2s ease-in-out 0s infinite sport ;
}

.fallback::before {
  width: 1vmin;
  height: 100%;
  display: block;
  content: '';
  background-color: #f0f2f5;
  position: absolute;
  top: 0;
  transform: skew(35deg);
  animation: 1s ease-in-out 0s infinite alternate sport2 ;
}

@keyframes sport {
  from {
    margin-left: 0;
  }
  to {
    margin-left: 100%;
  }
}

@keyframes sport2 {
  from {
    margin-left: 20px;
  }
  to {
    margin-left: calc(100% + 20px);
  }
}
`
    const template = document.createElement('div')
    template.addEventListener('click', () => console.log('click click click'))
    template.classList.add('fallback')
    const style = document.createElement('style')
    style.innerText = styleTemplate
    template.append(style)
    template.append(this.getAttribute('text') || document.title)

    shadow.append(template)
  }
}
