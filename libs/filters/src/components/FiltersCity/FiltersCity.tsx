import { AutocompleteProps } from '@toptal/picasso/Autocomplete'
import React, { useCallback } from 'react'
import {
  GoogleCityAutocomplete,
  getLocationCoords
} from '@staff-portal/google-maps'

import { useFiltersContext } from '../Filters/FiltersContext'
import FiltersField from '../Filters/FiltersField'
import { CommonFilterConfig } from '../Filters'

export type FiltersCityProps = Pick<
  AutocompleteProps,
  'width' | 'placeholder' | 'noOptionsText'
> &
  Pick<CommonFilterConfig, 'name' | 'label' | 'labelWidth'>

export interface GoogleCoordsParams {
  display_name: string
  place_id: string
  latitude: number
  longitude: number
}

const FiltersCity = ({
  name,
  label,
  labelWidth,
  placeholder,
  width,
  noOptionsText
}: FiltersCityProps) => {
  const { getFilterValue, setFilterValues } = useFiltersContext()
  const filterValue = getFilterValue<GoogleCoordsParams | undefined>(name)

  const onChange = useCallback(
    async (displayName?: string, placeId?: string) => {
      if (!placeId) {
        setFilterValues({ [name]: undefined })

        return
      }
      try {
        const { latitude, longitude } = await getLocationCoords(placeId)

        setFilterValues({
          [name]: {
            display_name: displayName,
            place_id: placeId,
            latitude,
            longitude
          }
        })
      } catch {
        setFilterValues({ [name]: undefined })
      }
    },
    [name, setFilterValues]
  )

  return (
    <FiltersField label={label} labelWidth={labelWidth} htmlFor={name}>
      <GoogleCityAutocomplete
        data-testid='filter-city'
        defaultValue={filterValue?.display_name || ''}
        onChange={onChange}
        placeholder={placeholder}
        width={width}
        noOptionsText={noOptionsText}
      />
    </FiltersField>
  )
}

export default FiltersCity
