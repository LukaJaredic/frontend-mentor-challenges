export class BaseElement extends HTMLElement {
  connectedCallback() {
    this.innerHTML = this.render();
  }

  render() {
    return "";
  }
}
