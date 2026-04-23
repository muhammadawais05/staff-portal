export const trimMultipleLineBreaks = (text: string) =>
  text.replace(/[\n\r]+/g, '\n')
