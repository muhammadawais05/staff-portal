import React from 'react'
import { ContractKind } from '@staff-portal/graphql/staff'

import { wrapComponent } from '../../../../../../utils'
import ContractItem from '../ContractItem'
import { createContractFragmentMock } from '../../../data/contract-fragment/mocks'

export default {
  title: 'Company Profile/Legal And Billing/ContractItem',
  component: ContractItem,
  args: {
    clientId: '2039015'
  },
  argTypes: {
    clientId: {
      control: { type: 'text' }
    }
  }
}

interface Props {
  clientId: string
}

export const WithTOPContract = ({ clientId }: Props) =>
  wrapComponent(
    <ContractItem clientId={clientId} contract={createContractFragmentMock()} />
  )

export const WithSTAContract = ({ clientId }: Props) =>
  wrapComponent(
    <ContractItem
      clientId={clientId}
      contract={createContractFragmentMock({ kind: ContractKind.STA })}
    />
  )
