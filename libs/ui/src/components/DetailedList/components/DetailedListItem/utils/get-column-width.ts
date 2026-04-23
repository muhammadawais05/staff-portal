interface GetColumnWidth {
  labelWidth?: number
  isFullWidthLabel?: boolean
  hasHalfWidthItems?: boolean
}

const getColumnWidth = ({
  labelWidth,
  isFullWidthLabel = false,
  hasHalfWidthItems = false
}: GetColumnWidth) => {
  if (isFullWidthLabel || !labelWidth) {
    return {
      adjustedLabelWidth: '100%',
      adjustedValueWidth: '100%'
    }
  }

  if (hasHalfWidthItems || !labelWidth) {
    return {
      adjustedLabelWidth: '50%',
      adjustedValueWidth: '50%'
    }
  }

  return {
    adjustedLabelWidth: `${labelWidth}rem`,
    adjustedValueWidth: `calc(100% - ${labelWidth}rem)`
  }
}

export default getColumnWidth
