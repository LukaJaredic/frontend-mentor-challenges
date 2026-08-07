import { BaseElement } from "./base-element";

export class FormSidebar extends BaseElement {
  render() {
    return `
      <aside class="step-indicator">
        <ol aria-label="Form progress">
          <li aria-current="step" aria-label="Step 1 - Your info">
            <span class="step-indicator__content">
              <span class="step-indicator__count">Step 1</span>
              <span class="step-indicator__title">Your info</span>
            </span>
          </li>
          <li aria-label="Step 2 - Select plan">
            <span class="step-indicator__content">
              <span class="step-indicator__count">Step 2</span>
              <span class="step-indicator__title">Select plan</span>
            </span>
          </li>
          <li aria-label="Step 3 - Add-ons">
            <span class="step-indicator__content">
              <span class="step-indicator__count">Step 3</span>
              <span class="step-indicator__title">Add-ons</span>
            </span>
          </li>
          <li aria-label="Step 4 - Summary">
            <span class="step-indicator__content">
              <span class="step-indicator__count">Step 4</span>
              <span class="step-indicator__title">Summary</span>
            </span>
          </li>
        </ol>
      </aside>
    `;
  }
}

customElements.define("form-sidebar", FormSidebar);
