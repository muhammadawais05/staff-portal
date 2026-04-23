export const getItemsAsPairs = <Items>(items: Items[]) => {
  const leftGroup = items.slice(0, Math.ceil(items.length / 2))
  const rightGroup = items.slice(Math.ceil(items.length / 2))

  const pairs = leftGroup.map((leftItem, index) => {
    return [leftItem, rightGroup[index]]
  }, [])

  return pairs
}
