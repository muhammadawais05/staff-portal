import React from 'react'
import { DetailedList, SubSection } from '@staff-portal/ui'
import { CompanyStatus, ClientCardMatchers } from '@staff-portal/clients'

import { TasksByClientClientFragment } from '../../data/get-clients-names-and-total-count/get-clients-names-and-total-count.staff.gql.types'

type Props = {
  client: TasksByClientClientFragment
}

export const ClientListTaskCardDetails = ({ client }: Props) => {
  const { claimer, investigations, cumulativeStatus, matchers } = client

  return (
    <SubSection title='Details'>
      <DetailedList labelColumnWidth={11}>
        <DetailedList.Row>
          <DetailedList.Item label='Status'>
            <CompanyStatus
              cumulativeStatus={cumulativeStatus}
              investigations={investigations}
            />
          </DetailedList.Item>
        </DetailedList.Row>
        <DetailedList.Row>
          <DetailedList.Item label='Claimers'>
            <ClientCardMatchers
              matchers={matchers?.edges}
              prependValues={[
                {
                  fullName: claimer?.fullName,
                  url: claimer?.webResource.url,
                  key: 'claimer'
                }
              ]}
            />
          </DetailedList.Item>
        </DetailedList.Row>
      </DetailedList>
    </SubSection>
  )
}
