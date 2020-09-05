
function toLog(key, index) {
  return `
    <p>${key}</p>
  `
}

function toInstallStatus(progNameObject, installStatus) {
  const keys = Object.keys(installStatus)
  const toHtmlTag = []
  for (let key = 0; key < keys.length; key++) {
    toHtmlTag.push(
        `<p>${progNameObject[keys[key]]}: ${installStatus[keys[key]]}</p>`
    )
  }
  return toHtmlTag.join('')
}

export function createLog(dataFromServer) {
  const dataArray = dataFromServer.data
  const compName = dataArray[0].computername
  const logArray = dataArray[1].events_array
  const dateStart = dataArray[0].date_start
  const installTime = dataArray[0].install_time
  const installStatus = dataArray[0].status
  const progNameObject = dataArray[2].prog_name_dict

  const log = logArray.map(toLog)
  log.unshift(toInstallStatus(progNameObject, installStatus))
  log.unshift(`<p class="nameLogBlock">История установки</p>
                          <p>Время установки: ${installTime}</p>
                          <p>Старт установки: ${dateStart}</p>
                          <p>Имя компьютера: ${compName}</p>
                        `)
  return log.join('')
}
