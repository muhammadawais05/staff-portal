const isEqual = <T>(itemA: T, itemB: T) => itemA === itemB

export const toggle = <T>(
  draft: T[],
  item: T,
  predicate: (a: T, b: T) => boolean = isEqual
) => {
  const index = draft.findIndex(current => predicate(current, item))

  if (index >= 0) {
    draft.splice(index, 1)
  } else {
    draft.push(item)
  }

  return draft
}
