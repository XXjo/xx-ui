/*
 * @Description: 
 * @Version: 1.0
 * @Autor: XuXiaoling
 * @Date: 2021-05-25 10:50:08
 * @LastEditors: XuXiaoling
 * @LastEditTime: 2021-05-25 14:38:39
 */
const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            position: relative;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            border: 1px solid var(--themeColor, rgb(0, 0, 0, 0.2));
            border-radius: 0.25em;
            font-size: 14px;
            padding: 0.25em 0.75em;
            color: var(--fontColor, rgb(0, 0, 0, 0.2));
            user-select: none;
        }

        :host(:not([disabled]):active) {
            opacity: 0.8;
        }

        :host([disabled]) {
            cursor: not-allowed;
        }

        :host([disabled]) .btn {
            pointer-events: none;
            opacity: 0.5;
        }
        
        :host([type='primary']) {
            color: #ffffff;
            background: var(--themeColor, #42b983);
            border: 1px solid var(--themeColor, #42b983);
        }

        :host([type='danger']) {
            color: #ffffff;
            background: var(--dangerColor, #ff7875);
            border: 1px solid var(--dangerColor, #ff7875);;
        }

        :host([type='primary'][plain]) {
            color: var(--themeColor, #42b983);
            background: rgb(66, 185, 131, 0.2);
            border: 1px solid var(--themeColor, #42b983);
        }

        :host([type='danger'][plain]) {
            color: var(--themeColor, #ff7875);
            background: rgb(255, 120, 117, 0.2);
            border: 1px solid var(--themeColor, #ff7875);
        }

        .btn {
            position: absolute;
            width: 100%;
            height: 100%;
            background: none;
            border: none;
            
        }
    </style>
    <button class='btn'></button><slot></slot>
`;
class XXButton extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$btn = this._shadowRoot.querySelector('.btn');
    }

    static get observedAttributes() {
        return ['disabled', 'type', 'plain'];
    }
    get disabled() {
        let disabled = this.getAttribute('disabled');
        if(disabled === '' || disabled === 'true') {
            return true;
        }
        else {
            return false;
        }
    }

    set disabled(value) {
        if(value === '' || value === true) {
            this.setAttribute('disabled', 'true');
        }
        else {
            this.setAttribute('disabled', 'false');
        }
    }

    get type() {
        return this.getAttribute('type');
    }

    set type(value) {
        this.setAttribute('type', value);
    }

    get plain() {
        let plain = this.getAttribute('plain');
        if(plain === '' || plain === 'true') {
            return true;
        }
        else {
            return false;
        }
    }

    set plain(value) {
        if(value === '' || value === true) {
            this.setAttribute('plain', 'true');
        }
        else {
            this.setAttribute('plain', 'false');
        }
    }

    attributChangedCallback(name, oldValue, newValue) {
        if(name == 'disabled') {
            if(this[name] === true) {
                this.$btn.disabled = true;
            }
            else {
                this.$btn.disabled = false;
            }
        }
    }

}

window.customElements.define('xx-button', XXButton);