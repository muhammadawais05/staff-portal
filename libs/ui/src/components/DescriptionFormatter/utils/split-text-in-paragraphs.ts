const splitInParagraphs = (text: string) =>
  text.split(/\n/).map(paragraph => paragraph)

export const splitTextInParagraphs = (text: string) =>
  text
    .replace(/\r\n?/g, '\n')
    .split(/\n\n+/)
    .map(block => splitInParagraphs(block))
