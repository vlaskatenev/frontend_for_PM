export class Emitter {
  constructor() {
    // объект со слушателями
    this.listeners = {}
  }

  // уведомляем слушателей о событии если они есть
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener => {
      listener(...args)
    })
    return true
  }

  // подписываемся на уведомления
  // добавляем нового слушателя
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    // возвращаем функцию в которой отписываемся от события
    // так делаем каждый раз получается, оставляем
    // слушателя который не равен fn listener !== fn
    return () => {
      this.listeners[event] =
          this.listeners[event].filter(listener => listener !== fn)
    }
  }
}
