import React from 'react'
import { Container } from '@toptal/picasso'
import { DetailedList as DL } from '@staff-portal/ui'
import { useUserDateFormatter } from '@staff-portal/current-user'
import { ContractTypeField, ContractStatusField } from '@staff-portal/talents'
import { NO_VALUE } from '@staff-portal/config'

import { TalentContractFragment } from '../TalentContractsAndAgreementsSection/data/get-talent-contracts'

interface Props {
  contract: TalentContractFragment & { legacy?: boolean | null }
}

const ContractItemFields = ({ contract }: Props) => {
  const {
    kind,
    contractSender,
    sentAt,
    legacy,
    signatureReceivedAt,
    contractStatus
  } = contract

  const userDateFormatter = useUserDateFormatter()

  return (
    <Container top='small'>
      <DL labelColumnWidth={11} defaultValue={NO_VALUE}>
        <DL.Row>
          <DL.Item label='Type'>
            {kind && <ContractTypeField kind={kind} />}
          </DL.Item>
        </DL.Row>
        <DL.Row>
          <DL.Item label='Sender' value={contractSender?.fullName || null} />
          <DL.Item label='Status'>
            {contractStatus && (
              <ContractStatusField weight='semibold' status={contractStatus} />
            )}
          </DL.Item>
        </DL.Row>
        <DL.Row>
          <DL.Item label='Sent at' value={userDateFormatter(sentAt)} />
          <DL.Item
            label='Signature Received at'
            value={
              signatureReceivedAt && userDateFormatter(signatureReceivedAt)
            }
          />
        </DL.Row>
        <DL.Row>
          <DL.Item label='Legacy' value={legacy ? 'Yes' : 'No'} />
        </DL.Row>
      </DL>
    </Container>
  )
}

export default ContractItemFields
