import React, { useState } from 'react'
import { Slider, Form, Container } from '@toptal/picasso'
import { useDebouncedCallback } from 'use-debounce'

import {
  CommonFilterConfig,
  SliderRangeFilterConfig,
  useFiltersContext
} from '../Filters'
import * as S from './styles'
import FiltersField from '../Filters/FiltersField'

const DEBOUNCE_LIMIT = 300

export type Props = Pick<
  CommonFilterConfig,
  'name' | 'label' | 'labelWidth' | 'render'
> & {
  options: SliderRangeFilterConfig['options']
}

const FormLabel = Form.Label

const FiltersSliderRange = ({
  name,
  label,
  labelWidth,
  render,
  options: {
    min,
    max,
    minLabel,
    maxLabel,
    step,
    tooltipFormat,
    fromPropertyName,
    tillPropertyName,
    minLabelStyles,
    maxLabelStyles
  }
}: Props) => {
  const { getRangeFilterValues, setRangeFilterValues } = useFiltersContext()
  const { from = min, till = max } = getRangeFilterValues<number>(
    name,
    fromPropertyName,
    tillPropertyName
  )
  const [value, setValue] = useState<number[]>([+from, +till])

  const debouncedCallback = useDebouncedCallback(
    ([newFrom, newTill]: number[]) =>
      setRangeFilterValues<number | undefined>(
        name,
        newFrom !== min ? newFrom : undefined,
        newTill !== max ? newTill : undefined,
        fromPropertyName,
        tillPropertyName
      ),
    DEBOUNCE_LIMIT
  )

  const handleChange = (newValue: number[]) => {
    if (newValue !== value) {
      setValue(newValue)
      debouncedCallback(newValue)
    }
  }

  const slider = (
    <Slider
      css={S.slider}
      value={value}
      min={min}
      max={max}
      step={step}
      tooltip='on'
      tooltipFormat={tooltipFormat}
      onChange={(_, newValue) => handleChange(newValue as number[])}
      disablePortal
      compact
    />
  )

  return (
    <FiltersField
      label={label}
      labelWidth={labelWidth}
      alignItems={render ? 'baseline' : 'flex-end'}
    >
      <Container
        flex
        alignItems='flex-start'
        top='medium'
        css={S.filterFieldContent}
      >
        {render ? (
          <Container left='xsmall' right='xsmall' css={S.sliderWrapper}>
            {render(
              <div css={S.flexNoWrap}>
                <FormLabel css={[S.minLabel, minLabelStyles]}>
                  {minLabel}
                </FormLabel>
                <Container left='xsmall' right='xsmall' css={S.sliderWrapper}>
                  {slider}
                </Container>
                <FormLabel css={[S.maxLabel, maxLabelStyles]}>
                  {maxLabel}
                </FormLabel>
              </div>
            )}
          </Container>
        ) : (
          <>
            <FormLabel css={[S.minLabel, minLabelStyles]}>{minLabel}</FormLabel>
            <Container left='xsmall' right='xsmall' css={S.sliderWrapper}>
              {slider}
            </Container>
            <FormLabel css={[S.maxLabel, maxLabelStyles]}>{maxLabel}</FormLabel>
          </>
        )}
      </Container>
    </FiltersField>
  )
}

export default FiltersSliderRange
