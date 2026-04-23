import React, { useMemo, useCallback, ChangeEvent } from 'react'
import { useQuery } from '@staff-portal/data-layer-service'
import { GridItemField } from '@staff-portal/ui'
import { Form, FormSpy, useForm } from '@toptal/picasso-forms'
import { FormDatePickerWrapper } from '@staff-portal/forms'

import { GetTalentPartnersDocument } from './data/get-talent-partners'
import { TalentUpdateFormValues } from '../../types'
import {
  EMPLOYMENT_START_DATE_TALENT_PARTNER_FIELD,
  TALENT_PARTNER_FIELD
} from '../../config'

const TalentPartnersField = () => {
  // eslint-disable-next-line @miovision/disallow-date/no-new-date
  const maxDate = useMemo(() => new Date(), [])
  const { data, loading } = useQuery(GetTalentPartnersDocument)

  const options = useMemo(() => {
    const defaultOptions = [{ text: 'None', value: '' }]

    const talentPartnersOptions =
      data?.talentPartners?.nodes.map(item => ({
        text: item.fullName,
        value: item.id
      })) || []

    return [...defaultOptions, ...talentPartnersOptions]
  }, [data])

  const { change } = useForm<TalentUpdateFormValues>()

  const onTalentPartnerChange = useCallback(
    (
      event: ChangeEvent<{
        name?: string | undefined
        value: string
      }>
    ) => {
      if (event.target.value === '') {
        change(EMPLOYMENT_START_DATE_TALENT_PARTNER_FIELD, undefined)
      }
    },
    [change]
  )

  if (data?.viewer.permits.assignTalentPartner === false) {
    return null
  }

  return (
    <>
      <GridItemField label='Talent Partner' labelFor={TALENT_PARTNER_FIELD}>
        <Form.Select
          loading={loading}
          id={TALENT_PARTNER_FIELD}
          name={TALENT_PARTNER_FIELD}
          width='full'
          options={options}
          data-testid='talent-partners-field-partner-select'
          onChange={onTalentPartnerChange}
        />
      </GridItemField>
      <FormSpy>
        {({ values }) => {
          return values.talentPartnerId ? (
            <GridItemField
              label='Employment start date with talent partner'
              labelFor={EMPLOYMENT_START_DATE_TALENT_PARTNER_FIELD}
            >
              <FormDatePickerWrapper
                name={EMPLOYMENT_START_DATE_TALENT_PARTNER_FIELD}
                width='full'
                maxDate={maxDate}
                required
                data-testid='talent-partners-field-start-date'
              />
            </GridItemField>
          ) : (
            ''
          )
        }}
      </FormSpy>
    </>
  )
}

export default TalentPartnersField
