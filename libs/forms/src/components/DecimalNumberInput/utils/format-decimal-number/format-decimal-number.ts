const formatIntegerPart = (value: string) => {
  if (!value || !Number(value)) {
    return '0'
  }

  return Number(value).toString()
}

export const formatDecimalNumber = (value: string) => {
  if (!value || (value !== '.' && isNaN(Number(value)))) {
    return ''
  }

  const splitArray = value.split('.')

  if (splitArray.length === 1) {
    return `${formatIntegerPart(splitArray[0])}.00`
  }

  let [integer, fraction] = splitArray

  integer = formatIntegerPart(integer)
  fraction = `${fraction}00`.substr(0, 2)

  return `${integer}.${fraction}`
}
