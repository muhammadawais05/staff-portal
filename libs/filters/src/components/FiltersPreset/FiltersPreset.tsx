import React, { ChangeEvent, Fragment } from 'react'
import { Grid, Form, Radio, TypographyOverflow } from '@toptal/picasso'

import {
  CommonFilterConfig,
  PresetFilterConfig,
  useFiltersContext
} from '../Filters'

type Props = Omit<PresetFilterConfig, 'type'> &
  Pick<CommonFilterConfig, 'name' | 'label'>

const DEFAULT_PRESET = '__default'

const defaultOption = {
  label: 'Default',
  key: DEFAULT_PRESET
}

const FiltersPreset = ({ name, label: filterLabel, options }: Props) => {
  const { clearFilterValue, getFilterValue, resetFilterValues } =
    useFiltersContext()

  const currentPreset =
    getFilterValue<string | undefined>(name) || DEFAULT_PRESET

  const handleChange = (_: ChangeEvent<{}>, preset: string) => {
    if (preset === DEFAULT_PRESET) {
      // currently, only preset will be dropped (same behavior as at Platform)
      // you can possibly call `resetFilterValues({})` to drop all filters instead
      clearFilterValue(name)

      return
    }

    const selectedPreset = options.find(option => option.key === preset)

    if (!selectedPreset) {
      return
    }

    resetFilterValues({
      [name]: preset,
      ...selectedPreset.values.reduce((acc, { filter, value }) => {
        acc[filter] = value

        return acc
      }, {} as Record<string, string | string[]>)
    })
  }

  return (
    <Fragment key={name}>
      <Form.Label>{filterLabel}</Form.Label>
      <Radio.Group name={name} value={currentPreset} onChange={handleChange}>
        <Grid spacing={16}>
          {[defaultOption, ...options].map(
            ({ label: optionLabel, key: value }) => (
              <Grid.Item key={String(value)} large='auto'>
                <Radio
                  label={<TypographyOverflow>{optionLabel}</TypographyOverflow>}
                  titleCase={false}
                  value={value}
                />
              </Grid.Item>
            )
          )}
        </Grid>
      </Radio.Group>
    </Fragment>
  )
}

export default FiltersPreset
