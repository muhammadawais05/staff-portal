import React from 'react'
import {
  Button,
  Container,
  // eslint-disable-next-line no-restricted-imports
  Link as PicassoLink,
  Tooltip,
  Checkbox
} from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { concatMessages } from '@staff-portal/data-layer-service'
import { WrapWithTooltip } from '@staff-portal/ui'

import { GetCompanyJobsQuery } from '../../data/get-company-jobs.staff.gql.types'

interface Props {
  toggleShowSubsidiaries: () => void
  showSubsidiaries: boolean
  hasChildren?: boolean
  addJobLink?: NonNullable<GetCompanyJobsQuery['node']>['addJobLink']
}

const JobsTabActions = ({
  addJobLink,
  toggleShowSubsidiaries,
  showSubsidiaries,
  hasChildren
}: Props) => {
  if (!hasChildren && !addJobLink) {
    return null
  }

  return (
    <Container alignItems='center'>
      {hasChildren && (
        <Container right='small' inline>
          <Tooltip content='This will show jobs from subsidiaries companies.'>
            <Checkbox
              label='View Subsidiaries'
              onClick={toggleShowSubsidiaries}
              checked={showSubsidiaries}
              data-testid='jobs-tab-actions-view-subsidiaries'
            />
          </Tooltip>
        </Container>
      )}

      {addJobLink && (
        <WrapWithTooltip
          enableTooltip={!!addJobLink.messages.length}
          content={concatMessages(addJobLink.messages)}
        >
          <Button
            as={Link as typeof PicassoLink}
            size='small'
            href={addJobLink?.url}
            disabled={!addJobLink?.enabled}
          >
            Add New Job
          </Button>
        </WrapWithTooltip>
      )}
    </Container>
  )
}

export default JobsTabActions
