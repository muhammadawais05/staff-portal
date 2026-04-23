import React from 'react'
import { SubSection } from '@staff-portal/ui'
import { RepresentativeFragment } from '@staff-portal/client-representatives'

import Representative from '../Representative'

interface Props {
  representatives: RepresentativeFragment[]
  companyId: string
}

export const Representatives = ({ representatives, companyId }: Props) => (
  <>
    {representatives.map((representative, index, { length }) => (
      <SubSection key={representative.id} last={index === length - 1}>
        <Representative
          representative={representative}
          isSubsidiary={companyId !== representative.client.id}
        />
      </SubSection>
    ))}
  </>
)
