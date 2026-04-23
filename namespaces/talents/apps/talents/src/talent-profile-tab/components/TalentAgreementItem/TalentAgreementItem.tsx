import React from 'react'
import { Container } from '@toptal/picasso'

import AgreementItemFields from '../AgreementItemFields'
import { TalentAgreementFragment } from '../TalentContractsAndAgreementsSection/data/get-talent-contracts'
import ContractAndAgreementHeader from '../ContractAndAgreementHeader'

interface Props {
  agreement: TalentAgreementFragment
}

const TalentAgreementItem = ({ agreement }: Props) => {
  return (
    <Container data-testid='talent-agreement-item'>
      <ContractAndAgreementHeader webResource={agreement.webResource} />
      <AgreementItemFields agreement={agreement} />
    </Container>
  )
}

export default TalentAgreementItem
