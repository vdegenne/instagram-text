import { LitElement, html, css } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js'
import '@material/mwc-textarea'
import '@material/mwc-slider'
import '@material/mwc-button'
import 'vanilla-colorful'
import html2canvas from 'html2canvas'

@customElement('app-container')
export class AppContainer extends LitElement {
  @state()
  private content = 'enter text';
  @property({type:Number})
  fontSize = 35;
  @state()
  backgroundColor = '#424242';
  @state()
  fontColor = '#ffffff';

  @query('#square') square!: HTMLDivElement;

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
    text-align: center;
    padding: 32px;
    box-sizing: border-box;
    font-family: 'Nanum Myeongjo';
    white-space: break-spaces;
    line-height: 58px;
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
      <div id="square">${unsafeHTML(this.content)}</div>
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

    <mwc-textarea label="text" style="width:100%"
      rows="6"
      @keyup="${e => { this.content = e.target.value }}"></mwc-textarea>

    <mwc-slider min="5" max="100" step="1" pin markers style="width:640px"
      value="${this.fontSize}" @input="${e => this.fontSize = e.target.value}"></mwc-slider>
    <div>font-size: ${this.fontSize}px</div>

    <mwc-button raised label="save"
      @click="${() => this.save()}"></mwc-button>
    `
  }

  async save() {
    const canvas = await html2canvas(this.square);
    // const dataURL = canvas.toDataURL()
    const img = document.createElement('a')
    img.href = canvas.toDataURL()
    img.download = `instagram-img-${Date.now()}`
    img.click()
    // console.log(canvas.toDataURL())
  }
}