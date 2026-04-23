import React, { useEffect } from 'react'
import { useField, useForm } from '@toptal/picasso-forms'
import { ReferrerInput } from '@staff-portal/facilities'

import { NoteFormAnswerBuilderType } from '../../../../types'
import { useGetReferer } from './data'

const NoteFormReferrer = ({
  index,
  required = false,
  placeholder,
  disabled
}: NoteFormAnswerBuilderType) => {
  const { change } = useForm()
  const {
    input: { value: referrerTerm }
  } = useField('referrer')

  const {
    input: { value: referrerId }
  } = useField(`answers[${index}].value`)

  const { referrer, getReferrer, loading } = useGetReferer({
    onCompleted: () => {
      if (!referrerTerm) {
        change('referrer', referrer?.fullName)
      }
    }
  })

  useEffect(() => {
    if (!referrerTerm && referrerId) {
      getReferrer(referrerId)
    }
  }, [getReferrer, referrerId, referrerTerm])

  const handleSelect = (id?: string) => {
    change(`answers[${index}].value`, id)
  }

  return (
    <ReferrerInput
      name='referrer'
      loading={loading}
      required={required}
      placeholder={placeholder}
      onSelect={handleSelect}
      onReset={() => handleSelect()}
      disabled={disabled}
    />
  )
}

export default NoteFormReferrer
