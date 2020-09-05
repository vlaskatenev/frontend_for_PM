import {Page} from '@core/Page'
import {FullPage} from '@core/FullPage'
import {CreateIndexPage} from '@/pages/indexPage/create.IndexPage'
import {createStore} from '@core/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {storage} from '@core/utils'
import {initialState} from '@/redux/initialState'

export class InitIndexPage extends Page {
  getRoot() {
    console.log('this.params', this.params)
    const store = createStore(rootReducer, initialState)

    store.subscribe(state => {
      storage('excel-state', state)
    })

    this.excel = new FullPage({
      components: [CreateIndexPage],
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
