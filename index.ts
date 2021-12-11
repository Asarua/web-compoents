export * from './components'

export function registerWebComponent(
  components: Array<CustomElementConstructor & { tagName: string }> = []
) {
  components.forEach(component => {
    if (!window.customElements.get(component.tagName)) {
      window.customElements.define(component.tagName, component)
    }
  })
}
