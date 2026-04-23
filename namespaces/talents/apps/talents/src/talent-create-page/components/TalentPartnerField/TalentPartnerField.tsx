import React from 'react'
import { GridItemField } from '@staff-portal/ui'
import { Form } from '@toptal/picasso-forms'

import { useGetTalentPartners } from './data/get-talent-partners'
import { TALENT_PARTNER_FIELD } from '../../config'

interface Props {
  assignTalentPartnerPermit?: boolean
}

const TalentPartnerField = ({ assignTalentPartnerPermit }: Props) => {
  const { options, loading } = useGetTalentPartners()

  if (!assignTalentPartnerPermit) {
    return null
  }

  return (
    <GridItemField label='Talent Partner' labelFor={TALENT_PARTNER_FIELD}>
      <Form.Select
        loading={loading}
        id={TALENT_PARTNER_FIELD}
        name={TALENT_PARTNER_FIELD}
        width='full'
        options={options}
        data-testid='talent-partners-field-partner-select'
      />
    </GridItemField>
  )
}

export default TalentPartnerField
