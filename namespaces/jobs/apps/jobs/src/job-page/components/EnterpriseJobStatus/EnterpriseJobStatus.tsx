import React from 'react'
import { Container, Info16 } from '@toptal/picasso'
import { WrapWithTooltip } from '@staff-portal/ui'
import { SourcingRequestEnterpriseJobStatus } from '@staff-portal/graphql/staff'
import {
  JOB_REQUEST_ENTERPRISE_STATUS_TEXT_MAPPING,
  JOB_REQUEST_ENTERPRISE_STATUS_TITLE_MAPPING
} from '@staff-portal/jobs'

export interface Props {
  enterpriseJobStatus?: SourcingRequestEnterpriseJobStatus | null
}

const EnterpriseJobStatus = ({ enterpriseJobStatus }: Props) => {
  if (!enterpriseJobStatus) {
    return null
  }

  return (
    <Container flex alignItems='center'>
      {JOB_REQUEST_ENTERPRISE_STATUS_TITLE_MAPPING[enterpriseJobStatus]}
      <WrapWithTooltip
        interactive
        enableTooltip
        content={
          enterpriseJobStatus &&
          JOB_REQUEST_ENTERPRISE_STATUS_TEXT_MAPPING[enterpriseJobStatus]
        }
      >
        <Container as='span' left='xsmall' flex>
          <Info16 />
        </Container>
      </WrapWithTooltip>
    </Container>
  )
}

export default EnterpriseJobStatus
