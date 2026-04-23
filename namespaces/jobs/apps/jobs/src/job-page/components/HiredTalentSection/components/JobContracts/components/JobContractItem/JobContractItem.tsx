import React from 'react'
import { Link } from '@staff-portal/graphql/staff'

import { JobContractFragment } from '../../data/get-job-contracts'
import JobContractItemHeader from '../JobContractItemHeader'
import JobContractItemFields from '../JobContractItemFields'

export type Props = {
  contract: JobContractFragment
  jobWebResource: Link
  onSuccessAction: () => void
}

const JobContractItem = ({
  contract,
  jobWebResource,
  onSuccessAction
}: Props) => {
  return <>
    <JobContractItemHeader
      contract={contract}
      onSuccessAction={onSuccessAction}
    />
    <JobContractItemFields
      contract={contract}
      jobWebResource={jobWebResource}
    />
  </>
}

export default JobContractItem
