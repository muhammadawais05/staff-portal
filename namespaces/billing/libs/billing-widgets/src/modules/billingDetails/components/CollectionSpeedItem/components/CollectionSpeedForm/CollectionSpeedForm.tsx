import React, { ChangeEvent, useCallback } from 'react'
import { Form, useForm } from '@toptal/picasso-forms'
import { ClientCollectionSpeed } from '@staff-portal/graphql/staff'
import { LoaderOverlay } from '@staff-portal/ui'

import { collectionSpeedSelectionOptions } from '../../utils'

interface Props {
  submitting: boolean
  initialValue?: ClientCollectionSpeed
}
const displayName = 'CollectionSpeedForm'

const CollectionSpeedForm = ({ submitting, initialValue }: Props) => {
  const form = useForm()

  const handleOnChange = useCallback(
    (
      event: ChangeEvent<{
        value: string
      }>
    ) => {
      const { value } = event.target

      if (value !== initialValue) {
        form.submit()
      }
    },
    [initialValue, form]
  )

  return (
    <LoaderOverlay loading={submitting}>
      <Form.Select
        data-testid={`${displayName}-collectionSpeed-select`}
        disabled={submitting}
        loading={submitting}
        name='collectionSpeed'
        onChange={handleOnChange}
        options={collectionSpeedSelectionOptions}
        width='auto'
      />
    </LoaderOverlay>
  )
}

CollectionSpeedForm.displayName = displayName

export default CollectionSpeedForm
