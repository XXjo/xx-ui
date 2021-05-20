/*
 * @Description: switch按钮
 * @Version: 1.0
 * @Autor: XuXiaoling
 * @Date: 2021-05-19 16:36:45
 * @LastEditors: XuXiaoling
 * @LastEditTime: 2021-05-20 16:56:20
 */
const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            display: inline-block;
        }

        :host([disabled]) {
            cursor: not-allowed;
        }

        :host([disabled]) label {
            pointer-events: none;
            opacity: 0.5;
        }

        #switch {
            display: none;
        }

        label {
            display: flex;
            width: 2.4em;
            height: 1.2em;
            background-color: #eeeeee;
            border-radius: 1.2em;
            cursor: pointer;
            user-select: none; /* 不允许用户选中，可防止复制转载等 */
            transition: background-color 0.3s; /* transition：渐变设置 */
        }

        /*::before ::after 默认插入的是行内元素 */
        label::before {
            content: '';
            flex: 0;
            transition: flex 0.3s cubic-bezier(.12, .4, .29, 1.46);
        }

        label::after {
            content: '';
            display: inline-block;
            width: 0.4em;
            height: 0.4em;
            border: 0.4em solid #ffffff;
            border-radius: 0.8em;
            transition: padding 0.3s;
        }

        label:active::after {
            padding: 0 0.2em;
        }

        #switch:checked + label {
            background-color: var(--themColor, #42b983);
        }

        #switch:checked + label::before {
            flex: 1;
        }
    </style>
    <input type='checkbox' id='switch'></input>
    <label for='switch'></label>
`

class XXSwitch extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$input = this._shadowRoot.querySelector('input');
    }

    static get observedAttributes() {
        return ['checked', 'disabled'];
    }

    get checked() {
        let checked = this.getAttribute('checked');
        if(checked === '' || checked === 'true') {
            return true;
        }
        else {
            return false;
        }
    }

    set checked(value) {
        if(value === '' || value === true) {
            this.setAttribute('checked', 'true');
        }
        else {
            this.setAttribute('checked', 'false');
        }
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
    

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === 'checked') {
            if(this[name] === true) {
                this.$input.checked = true;
            }
            else {
                this.$input.checked = false;
            }
        }

        if(name === 'disabled') {
            if(this[name] === true) {
                this.$input.disabled = true;
            }
            else {
                this.$input.disabled = false;
            }
        }
    }

    connectedCallback() {
        this.$input.addEventListener('change', () => {
            this.checked = this.$input.checked;
            this.dispatchEvent(new CustomEvent('change', {
                detail: {
                    checked: this.checked
                }
            }))
        })
    }
    
}

window.customElements.define('xx-switch', XXSwitch);