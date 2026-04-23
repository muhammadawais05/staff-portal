export const parseRawTemplate = (rawTemplate: string) => {
  // eslint-disable-next-line no-useless-escape
  const regexp = /---\nsubject: \"\"\n---\n\n/gm

  return rawTemplate.replace(regexp, '')
}
