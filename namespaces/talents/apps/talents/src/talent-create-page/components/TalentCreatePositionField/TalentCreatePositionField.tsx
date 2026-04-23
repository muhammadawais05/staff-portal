import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { GridItemField } from '@staff-portal/ui'

import { TOPSCREEN_POSITION_ID_FIELD } from '../../config'
import { useGetPositions } from './hooks/get-positions'

const TalentCreatePositionField = () => {
  const { selectOptions, loading } = useGetPositions()

  return (
    <GridItemField
      label='TopScreen position'
      labelFor={TOPSCREEN_POSITION_ID_FIELD}
      required
    >
      <Form.Select
        id={TOPSCREEN_POSITION_ID_FIELD}
        name={TOPSCREEN_POSITION_ID_FIELD}
        loading={loading}
        options={selectOptions}
        width='full'
        required
      />
    </GridItemField>
  )
}

export default TalentCreatePositionField
