import {$} from "@core/Dom"
import {ActiveRoute} from "@core/routes/ActiveRoute";

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router')
    }

    this.$placeholder = $(selector)
    this.routes = routes
    // page содаем чтгобы потом применять к нему метод destroy()
    this.page = null
    this.changePageHandler = this.changePageHandler.bind(this)

    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  // изменяем содержимое страницы на другую страницу
  changePageHandler() {
    if (this.page) {
      this.page.destroy()
    }
    // clear - создаем html с пустой строкой
    this.$placeholder.clear()
    const Page = ActiveRoute.path.includes('history')
      ? this.routes.history
      : (ActiveRoute.path.includes('detaillog')
          ? this.routes.detaillog
          : this.routes.index)

    this.page = new Page(ActiveRoute.param)
    // сдесь будет добавляться код из ActiveRoute и формировать страницу
    this.$placeholder.append(this.page.getRoot())
    this.page.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
