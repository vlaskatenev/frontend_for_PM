import {PageComponent} from '@core/PageComponent'
import {$} from '@core/Dom'
import {ajaxNot} from '@core/ajax'
import {
  requestUrlToDetailedLog,
} from '@/pages/variables.global'
import {createLog} from '@/pages/HistoryDetailPage/HistoryDetail.log.template';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class CreateHistoryDetailPage extends PageComponent {
  constructor($root, options) {
    super($root, {
      name: 'MainPage',
      listeners: [],
      ...options,
    })
  }

  toHTML() {
    const body = {
      data: ActiveRoute.param
    }
    return `
          <div class="page"></div>
    <script>${ajaxNot({
    body,
    fn: this.addHml('.detailedLog'),
    requestURL: requestUrlToDetailedLog
  })}</script>
`
  }

  addHml(selector) {
    return (data) => {
      console.log('Это функция addHml: ', data)
      const newData = createLog(data)
      console.log(newData)
      const div = $.create('div', selector.slice(1)).html(newData)
      this.$root.find('.page').append(div)
    }
  }
}
