export const getFirstMessage = (messages: string | string[]) =>
  Array.isArray(messages) ? messages[0] : messages
