import React from 'react'
import { Container } from '@toptal/picasso'
import {
  ResendContractButton,
  DeleteContractButton,
  VerifyContractButton
} from '@staff-portal/contracts'

import { TalentContractFragment } from '../TalentContractsAndAgreementsSection/data/get-talent-contracts'
import ContractAndAgreementHeader from '../ContractAndAgreementHeader'
import ContractItemFields from '../ContractItemFields'

interface Props {
  contract: TalentContractFragment & { legacy?: boolean | null }
  onMutationSuccess: (data: unknown) => void
}

const TalentContractItem = ({ contract, onMutationSuccess }: Props) => {
  const resendContractOperation = contract.operations.resendContract
  const destroyContractOperation = contract.operations.destroyContract
  const verifyContractOperation = contract.operations?.verifyContract

  const actions = (
    <>
      <VerifyContractButton
        contractId={contract.id}
        operation={verifyContractOperation}
        onMutationSuccess={onMutationSuccess}
      />

      <ResendContractButton
        contractId={contract.id}
        operation={resendContractOperation}
        onMutationSuccess={onMutationSuccess}
      />

      <DeleteContractButton
        contractId={contract.id}
        contractKind={contract.kind}
        contractStatus={contract.contractStatus}
        contractWebResource={contract.webResource}
        operation={destroyContractOperation}
        onMutationSuccess={onMutationSuccess}
      />
    </>
  )

  return (
    <Container data-testid='talent-contract-item'>
      <ContractAndAgreementHeader
        webResource={contract.webResource}
        actions={actions}
      />
      <ContractItemFields contract={contract} />
    </Container>
  )
}

export default TalentContractItem
