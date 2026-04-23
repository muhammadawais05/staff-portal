const multilineText = (
  text: string,
  options?: { blankLines: boolean }
): string[] => {
  const lines = text
    .trim()
    .replace(/\n{4,}/g, '\n\n\n')
    .split(/\n/)

  return options?.blankLines
    ? lines.some(Boolean)
      ? lines
      : []
    : lines.filter(content => content.trim().length > 0)
}

export { multilineText }
