import {
  requestUrlForStartInstall,
  requestUrlFromManually,
} from '@/pages/variables.global';

export function objectForManually(body, context) {
  return {
    body,
    fn: context.addHmlSoftCheckbox('.soft'),
    requestURL: requestUrlFromManually
  }
}

export function objectForCheckbox(body) {
  return {
    body,
    requestURL: requestUrlForStartInstall
  }
}

export function dataFromServer(dataFromServer, i) {
  return dataFromServer.data[i]
}

