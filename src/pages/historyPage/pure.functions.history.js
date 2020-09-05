export function choiceObject(objectFromServer, row) {
  return objectFromServer.data[row]
}

export function toNameKey(index, object) {
  try {
    const keys = [
      'computerName',
      'status',
      'button',
      'date'
    ]
    const key = keys[index]
    if (index > keys.length - 1) {
      throw new Error()
    }
    return object[key]
  } catch (e) {
    throw new Error(`index is not in array keys: ${e}`)
  }
}
