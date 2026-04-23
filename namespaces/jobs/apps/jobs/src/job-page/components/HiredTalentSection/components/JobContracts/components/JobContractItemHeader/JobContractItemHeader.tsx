import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { LinkWrapper } from '@staff-portal/ui'
import {
  DeleteContractButton,
  ResendContractButton,
  VerifyContractButton
} from '@staff-portal/contracts'

import { JobContractFragment } from '../../data/get-job-contracts'

export type Props = {
  contract: JobContractFragment
  onSuccessAction: () => void
}

const JobContractItemHeader = ({
  contract,
  contract: {
    operations: { destroyContract, resendContract, verifyContract },
    webResource
  },
  onSuccessAction
}: Props) => {
  return (
    <Container
      flex
      top='small'
      bottom='small'
      alignItems='center'
      justifyContent='space-between'
    >
      <Typography variant='heading' size='small'>
        <LinkWrapper
          wrapWhen={Boolean(webResource.url)}
          href={webResource.url as string}
        >
          {webResource.text}
        </LinkWrapper>
      </Typography>

      <Container flex>
        <VerifyContractButton
          contractId={contract.id}
          operation={verifyContract}
          onMutationSuccess={onSuccessAction}
        />

        <ResendContractButton
          contractId={contract.id}
          operation={resendContract}
          onMutationSuccess={onSuccessAction}
          hasLongLabel
        />

        <DeleteContractButton
          contractId={contract.id}
          contractKind={contract.kind}
          contractStatus={contract.status}
          contractWebResource={contract.webResource}
          operation={destroyContract}
          onMutationSuccess={onSuccessAction}
        />
      </Container>
    </Container>
  )
}

export default JobContractItemHeader
