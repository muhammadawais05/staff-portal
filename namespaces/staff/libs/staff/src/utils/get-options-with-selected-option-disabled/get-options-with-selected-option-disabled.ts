import { Option } from '@toptal/picasso/Select'

export const getOptionsWithSelectedOptionDisabled = ({
  options,
  selectedValue
}: {
  options: Option[]
  selectedValue?: number | string
}) =>
  options.map(item => {
    if (item.value !== selectedValue) {
      return item
    }

    return { ...item, disabled: true }
  })
