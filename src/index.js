import './scss/index.scss'
import {Router} from '@core/routes/Router'
import {InitIndexPage} from '@/pages/indexPage/Init.IndexPage'
import {InitHistoryPage} from '@/pages/historyPage/Init.historyPage'
import {
  InitHistoryDetailPage
} from '@/pages/HistoryDetailPage/Init.HistoryDetailPage'

new Router('#app', {
  index: InitIndexPage,
  history: InitHistoryPage,
  detaillog: InitHistoryDetailPage
})

