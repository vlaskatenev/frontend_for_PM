import {PageComponent} from '@core/PageComponent'
import {$} from '@core/Dom'
import {navString, requestUrlFromHistory} from '@/pages/variables.global'
import {createTable} from '@/pages/historyPage/history.table.template';
import {ajaxNot} from '@core/ajax'

const MAX_LEN = 16

export class CreateHistoryPage extends PageComponent {
  constructor($root, options) {
    super($root, {
      name: 'MainPage',
      listeners: ['click', 'keydown', 'input'],
      ...options
    })
  }

  toHTML() {
    return `
      <div class="page">
        ${navString}
        <div class="form">
          <input 
            type="date" 
            id="date" 
            name="date" 
            class="input" 
            data-set="input"
          />
          <div class="button">
            <i class="material-icons" data-set="toStart">
            flip_camera_android</i>
          </div>
        </div>
      </div>
`
  }

  addHml() {
    return (data) => {
      this.$root.removeElement('.tableHistory')
      const newData = createTable(data)
      const div = $.create('div', 'tableHistory').html(newData)
      this.$root.find('.page').append(div)
    }
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.set === 'toStart') {
      const text = this.$root.find('[data-set="input"]').text()
      const body = {
        data: text
      }

      ajaxNot({
        body,
        fn: this.addHml(),
        requestURL: requestUrlFromHistory
      })
    }
  }

  // если строка длинее MAX_LEN то вводиться дальше начения не будут
  onInput(event) {
    const $target = $(event.target)
    if ($target.data.set === 'input') {
      const text = $target.text()
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
        ajaxNot(data, this.addHml())
      }
    }
  }
}
