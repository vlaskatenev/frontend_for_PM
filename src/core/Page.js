export class Page {
  constructor(params) {
    this.params = params
  }

  // создаем страницу
  getRoot() {
    throw new Error('Method "getRoot" should be implemented')
  }

  afterRender() {}

  // при смене страниц этот метод будет их уничтожать
  destroy() {}
}
