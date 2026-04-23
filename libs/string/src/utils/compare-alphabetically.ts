const compareAlphabetically = (first: string, second: string) => {
  if (first < second) {
    return -1
  }

  if (first > second) {
    return 1
  }

  return 0
}

export default compareAlphabetically
