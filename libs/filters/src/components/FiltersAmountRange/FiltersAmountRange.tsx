import React, { useState } from 'react'

import AmountRangeInput, {
  AmountRange,
  AmountRangeInputProps
} from '../AmountRangeInput'
import { CommonFilterConfig, useFiltersContext } from '../Filters'
import FiltersField from '../Filters/FiltersField'

type Props = Pick<
  AmountRangeInputProps,
  'min' | 'max' | 'hasError' | 'maxLength'
> &
  Pick<CommonFilterConfig, 'name' | 'label' | 'labelWidth'>

const processAmount = (amount?: string | number) =>
  amount === '' ? undefined : amount

const FiltersAmountRange = ({
  name,
  label,
  labelWidth,
  min,
  max,
  maxLength,
  hasError
}: Props) => {
  const { getRangeFilterValues, setRangeFilterValues } = useFiltersContext()
  const { from = '', till: to = '' } = getRangeFilterValues<string>(name)

  const [amountRange, setAmountRange] = useState<AmountRange | undefined>({
    from,
    to
  })

  const handleInputKeydown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    value: AmountRange
  ) => {
    const key = event.key

    if (key === 'Enter') {
      setAmountRange(value)
      setRangeFilterValues(name, value.from, value.to)
    }
  }

  const handleBlur = (value: AmountRange) => {
    setAmountRange(value)
    setRangeFilterValues(
      name,
      processAmount(value?.from),
      processAmount(value?.to)
    )
  }

  const handleReset = (value: AmountRange) => {
    setAmountRange(value)
    setRangeFilterValues(name, value.from, value.to)
  }

  return (
    <FiltersField label={label || ''} labelWidth={labelWidth}>
      <AmountRangeInput
        min={min}
        max={max}
        maxLength={maxLength}
        name={name}
        hasError={hasError}
        value={amountRange}
        onChange={setAmountRange}
        onBlur={handleBlur}
        onReset={handleReset}
        onKeyDown={handleInputKeydown}
      />
    </FiltersField>
  )
}

export default FiltersAmountRange
