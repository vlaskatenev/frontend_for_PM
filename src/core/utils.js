// Pure functions
// здесь будут вспомогательные небольшие функции,
// которые не будут принадлежать к каким-то классам
// и будут использоваться где их удобно использовать
// принимает строку и делает первую букву заглавной
export function capitalize(string) {
  if (typeof string != 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// из localStorage считывает данные и добавляет
export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}

export function camelTodashCase(str) {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
      .map(key => `${camelTodashCase(key)}: ${styles[key]}`)
      .join(';')
}

export function debounce(fn, wait) {
  let timeout
  return function(...args) {
    const later = () => {
      clearTimeout(timeout)
      // eslint-disable-next-line no-invalid-this
      fn.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
