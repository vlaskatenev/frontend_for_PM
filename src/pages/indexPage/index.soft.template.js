
function toCheckboxSoft({key, index, object}) {
  const programmId = object.data[1].prog_id[index]
  const programName = object.data[0].dict[programmId]
  return `
    <p><input type="checkbox" name="programm"
     data-value="${programmId}"
     class="checkboxClass"
     >
      ${programName}
     </p>
  `
}

function withObject(object) {
  return function(key, index) {
    return {
      key, index, object: object,
    }
  }
}

export function createTamplateSoft(request) {
  const dataFromServer = request
  const rowsCount = dataFromServer.data[1].prog_id.length
  const compName = dataFromServer.data[2].comp_name1

  // создание ячеек и строк
  // for (let row = 0; row < rowsCount; row++) {
  const cells = new Array(rowsCount)
      .fill('')
      .map(withObject(dataFromServer))
      .map(toCheckboxSoft)
  cells.unshift(`<p class="nameSoftBlock">
                        Выбери программу для установки на ${compName}
                      </p>`)
  cells.push(`<p>
              <input 
                type="submit" 
                value="Отправить" 
                data-comp="${compName}"
                data-sub="submit"
              >
              </p>`)
  return cells.join('')
}
