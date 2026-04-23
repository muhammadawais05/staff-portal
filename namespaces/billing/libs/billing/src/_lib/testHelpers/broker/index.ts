export const placeholder = (eventName?: any, handler?: any) => {
  /* eslint-disable-next-line no-console */
  console.log('broker not loaded', eventName, handler)
}

export const brokerMock = {
  _configure: placeholder,
  _unload: placeholder,
  emit: placeholder,
  emitter: placeholder,
  listen: placeholder,
  publish: placeholder,
  receiver: placeholder,
  showAlert: placeholder,
  showNotice: placeholder,
  showWarning: placeholder,
  unsubscribe: placeholder
}
