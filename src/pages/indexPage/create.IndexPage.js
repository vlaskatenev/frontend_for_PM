import {PageComponent} from '@core/PageComponent'
import {$} from '@core/Dom'
import {ajaxNot} from '@core/ajax'
import {
  navString, requestUrlFromRunningProcess,
} from '@/pages/variables.global'
import {createTable} from '@/pages/historyPage/history.table.template'
import {createTamplateSoft} from '@/pages/indexPage/index.soft.template'
import {
  objectForCheckbox,
  objectForManually,
} from '@/pages/indexPage/pure.functions.index'


export class CreateIndexPage extends PageComponent {
  constructor($root, options) {
    super($root, {
      name: 'MainPage',
      listeners: ['click', 'keydown', 'input'],
      ...options,
    })
  }

  toHTML() {
    return `
          <div class="page">
        ${navString}
        <div class="form">
            <div class="input" 
                 contenteditable="true"
                 spellcheck="false"
                 data-set="input"
                 >
            </div>
            <div class="button">
                <i class="material-icons" data-set="toStart">
                flip_camera_android</i>
            </div>
        </div>
    </div>
    <script>${ajaxNot({
    body: '',
    fn: this.addHml('.tableHistory'),
    requestURL: requestUrlFromRunningProcess
  })}</script>
`
  }

  addHml(selector) {
    return (data) => {
      this.$root.removeElement(selector)
      const newData = createTable(data)
      const div = $.create('div', selector.slice(1)).html(newData)
      this.$root.find('.page').append(div)
    }
  }

  addHmlSoftCheckbox(selector) {
    return (data) => {
      this.$root.removeElement(selector)
      const newData = createTamplateSoft(data)
      const div = $.create('div', selector.slice(1)).html(newData)
      this.$root.find('.form').after(div)
    }
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.set === 'toStart') {
      const text = this.$root.find('[data-set="input"]').text()
      const body = {
        compName: text
      }
      ajaxNot(objectForManually(body, this))
    }
    if ($target.data.sub === 'submit') {
      const checkSoft = this.$root.findChecked('.checkboxClass')
      const compName = $target.data.comp
      const body = {
        data: [checkSoft, compName]
      }
      ajaxNot(objectForCheckbox(body))
    }
  }

  // если строка длинее MAX_LEN то вводиться дальше начения не будут
  onInput(event) {
    const $target = $(event.target)
    if ($target.data.set === 'input') {
      const text = $target.text()
      const MAX_LEN = 16;
      if (text.length > MAX_LEN) {
        $target.$el.innerHTML = text.slice(0, MAX_LEN)
      }
    }
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      const $target = this.$root.find('[data-set="input"]')
      if ($target.data.set === 'input') {
        const text = $target.text()
        const data = {
          compName: text
        }
        ajaxNot(data)
      }
    }
  }
}
