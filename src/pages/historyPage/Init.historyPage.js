import {Page} from '@core/Page'
import {FullPage} from '@core/FullPage'
import {createStore} from '@core/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {storage} from '@core/utils'
import {initialState} from '@/redux/initialState'
import {CreateHistoryPage} from '@/pages/historyPage/create.historyPage';

export class InitHistoryPage extends Page {
  getRoot() {
    const store = createStore(rootReducer, initialState)

    store.subscribe(state => {
      storage('excel-state', state)
    })

    this.excel = new FullPage({
      components: [CreateHistoryPage],
      store,
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}
