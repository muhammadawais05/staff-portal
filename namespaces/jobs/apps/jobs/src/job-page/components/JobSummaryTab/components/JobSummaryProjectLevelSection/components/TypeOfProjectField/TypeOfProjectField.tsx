import React from 'react'
import {
  CheckSolid16,
  Container,
  ExclamationSolid16,
  TypographyOverflow
} from '@toptal/picasso'
import { JobProjectType, Maybe } from '@staff-portal/graphql/staff'
import { JOB_PROJECT_TYPE_MAPPING } from '@staff-portal/jobs'
import { NO_VALUE } from '@staff-portal/config'

type Props = {
  projectType?: Maybe<JobProjectType>
}

const TypeOfProjectField = ({ projectType }: Props) => {
  return (
    <Container alignItems='center' flex>
      <TypographyOverflow size='medium'>
        {projectType ? JOB_PROJECT_TYPE_MAPPING[projectType] : NO_VALUE}
      </TypographyOverflow>

      <Container left='xsmall' flex>
        {projectType ? (
          <CheckSolid16
            color='green'
            data-testid='TypeOfProjectField-filled-icon'
          />
        ) : (
          <ExclamationSolid16
            color='red'
            data-testid='TypeOfProjectField-not-filled-icon'
          />
        )}
      </Container>
    </Container>
  )
}

export default TypeOfProjectField
