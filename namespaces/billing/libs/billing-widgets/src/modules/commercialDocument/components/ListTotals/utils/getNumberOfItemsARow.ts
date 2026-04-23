const getNumberOfItemsARow = ({ has9Items }: { has9Items: boolean }) => {
  if (has9Items) {
    return {
      smallScreen: 3,
      largeScreen: 5
    }
  }

  return {
    smallScreen: 4,
    largeScreen: 4
  }
}

export default getNumberOfItemsARow
