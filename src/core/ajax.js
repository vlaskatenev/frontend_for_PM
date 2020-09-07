import {tokenString} from '@/autorization.data'

export function ajaxNot({body, fn = false, requestURL}) {
  fetch(requestURL, {
    method: 'POST',
    headers: {
      "Authorization": tokenString,
      "Content-Type": 'application/json',
    },
    body: JSON.stringify(body),
  })
      .then(response => response.json())
      .then(data => {
            fn ? fn(data) : null
      })
      .catch(error => console.log('Error with ajaxNot function: ', error))
}
