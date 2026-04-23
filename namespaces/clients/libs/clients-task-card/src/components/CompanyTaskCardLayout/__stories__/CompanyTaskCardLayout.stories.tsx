import React from 'react'
import { Container } from '@toptal/picasso'
import Picasso from '@toptal/picasso-provider'
import { MockedProvider } from '@staff-portal/data-layer-service'
import { TaskWithOptionalMetadata } from '@staff-portal/tasks'

import { companyMock } from '../../../data/company-task-card-fragment/mocks'
import CompanyTaskCardLayout from '../CompanyTaskCardLayout'
import * as S from './styles'

const taskMock = { operations: {} }

export default {
  title: 'CompanyTaskCardLayout'
}

export const CompanyTaskCardLayoutStory = () => {
  const timeZone = 'America/Rankin_Inlet'
  const taskCardTitle = 'Berge, Sanford and Shields'
  const taskCardSubtitle = 'Company'

  return (
    <MockedProvider mocks={[]} addTypename={false}>
      <Picasso>
        <Container padded='medium' css={S.container}>
          <CompanyTaskCardLayout
            loading={false}
            company={companyMock as any} // eslint-disable-line @typescript-eslint/no-explicit-any
            task={taskMock as TaskWithOptionalMetadata}
            timeZone={timeZone}
            taskCardTitle={taskCardTitle}
            taskCardSubtitle={taskCardSubtitle}
          />
        </Container>
      </Picasso>
    </MockedProvider>
  )
}
