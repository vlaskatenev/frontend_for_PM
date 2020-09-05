
export function ajaxNot({body, fn = false, requestURL}) {
  sendRequest('POST', requestURL, body)
      .then(data => {
        fn ? fn(data) : null
      })
      .then(err => console.log(err))
}

function sendRequest(method, url, body=null) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.responseType = 'json'
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization',
        'Token 6845ceea30ebdfd038a0e45324c90d4003803ea8')

    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response)
      } else {
        resolve(xhr.response)
      }
    }
    xhr.onerror = () => {
      reject(xhr.response)
    }
    xhr.send(JSON.stringify(body))
  })
}
