import React from 'react'
import {
  TypographyOverflow,
  CheckSolid16,
  Container,
  ExclamationSolid16
} from '@toptal/picasso'
import { JobProjectSpecCompleteness, Maybe } from '@staff-portal/graphql/staff'
import { JOB_PROJECT_SPEC_COMPLETENESS_MAPPING } from '@staff-portal/jobs'
import { NO_VALUE } from '@staff-portal/config'

type Props = {
  projectSpecCompleteness?: Maybe<JobProjectSpecCompleteness>
}

const SpecCompletenessField = ({ projectSpecCompleteness }: Props) => {
  return (
    <Container alignItems='center' flex>
      <TypographyOverflow size='medium'>
        {projectSpecCompleteness
          ? JOB_PROJECT_SPEC_COMPLETENESS_MAPPING[projectSpecCompleteness]
          : NO_VALUE}
      </TypographyOverflow>

      <Container left='xsmall' flex>
        {projectSpecCompleteness ? (
          <CheckSolid16
            color='green'
            data-testid='SpecCompletenessField-filled-icon'
          />
        ) : (
          <ExclamationSolid16
            color='red'
            data-testid='SpecCompletenessField-not-filled-icon'
          />
        )}
      </Container>
    </Container>
  )
}

export default SpecCompletenessField
