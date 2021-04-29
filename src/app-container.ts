import { LitElement, html, customElement, property, css } from "lit-element";
import '@material/mwc-textarea'
import '@material/mwc-slider'
import '@material/mwc-button'
import 'vanilla-colorful'
import html2canvas from 'html2canvas'

@customElement('app-container')
class AppContainer extends LitElement {
  @property()
  text = 'enter text';
  @property({type:Number})
  fontSize = 35;
  @property()
  backgroundColor = '#424242';
  @property()
  fontColor = '#ffffff';

  static styles = css`
  :host {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  #square {
    width: 640px;
    height: 640px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 32px;
    box-sizing: border-box;
    font-family: 'Nanum Myeongjo';
  }
  mwc-textarea {
    margin: 20px 0;
  }
  `

  render () {
    return html`
    <style>
      #square {
        font-size: ${this.fontSize}px;
        background-color: ${this.backgroundColor};
        color: ${this.fontColor};
      }
    </style>
    <div style="display:flex;background-color:grey">
      <div id="square">${this.text}</div>
      <div style="display:flex;flex-direction:column">
        <hex-color-picker
          style="margin:20px;"
          color="${this.backgroundColor}"
          @color-changed="${e => this.backgroundColor = e.detail.value}"></hex-color-picker>

        <hex-color-picker
          style="margin:20px;"
          color="${this.fontColor}"
          @color-changed="${e => this.fontColor = e.detail.value}"></hex-color-picker>
      </div>
    </div>

    <mwc-textarea label="text" outlined style="width:100%"
      rows="20"
      @keyup="${e => this.text = e.target.value}"></mwc-textarea>

    <mwc-slider min="5" max="100" step="1" pin markers style="width:640px"
      value="${this.fontSize}" @input="${e => this.fontSize = e.target.value}"></mwc-slider>
    <div>font-size: ${this.fontSize}px</div>

    <mwc-button raised label="save"
      @click="${_ => this.save()}"></mwc-button>
    `
  }

  async save() {
    await html2canvas(this.shadowRoot!.querySelector<HTMLElement>('#square')!);
  }
}


window.html2canvas = html2canvas;