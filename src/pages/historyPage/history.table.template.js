import {
  choiceObject,
  toNameKey
} from '@/pages/historyPage/pure.functions.history'
import {caption} from '@/pages/historyPage/variables.history'


function withObject(object) {
  return function(row, index) {
    return {
      row, index, object: object,
    }
  }
}

function toCell({row, index, object}) {
  const i = index
  const objectNew = choiceObject(object, row)
  const id = objectNew.id
  console.log(objectNew)
  const data = index === 2
    ? `<a href="#detaillog/${id}">Посмотреть лог</a>`
    : toNameKey(i, objectNew)
  return `<td data-row="${row}" data-col="${i}">
      ${data}
     </td>
  `
}

function createRow(content) {
  return `
    <tr>
      ${content}
    </tr>
  `
}

export function createTable(request) {
  const dataFromServer = request
  const colsCount = 4
  const rowsCount = dataFromServer.data.length
  const rows = []

  // создание ячеек и строк
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill(row)
        .map(withObject(dataFromServer))
        .map(toCell)
        .join('')
    rows.push(createRow(cells))
  }
  rows.unshift(caption)
  rows.unshift('<table>')
  rows.push('</table>')
  return rows.join('')
}
