import React from 'react'
import { Typography, ColorType, Container } from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'
import { TalentAgreementStatus } from '@staff-portal/graphql/staff'
import {
  DEFAULT_DATE_FORMAT,
  parseAndFormatDateTime
} from '@staff-portal/date-time-utils'
import { DetailedList as DL } from '@staff-portal/ui'

import { TalentAgreementFragment } from '../TalentContractsAndAgreementsSection/data/get-talent-contracts'

interface Props {
  agreement: TalentAgreementFragment
}

const STATUS_MAP: Record<
  TalentAgreementStatus,
  { text: string; color: ColorType }
> = {
  [TalentAgreementStatus.ACCEPTED]: { text: 'Accepted', color: 'green' },
  [TalentAgreementStatus.SENT]: { text: 'Sent', color: 'yellow' }
}

const AgreementItemFields = ({ agreement }: Props) => {
  const { agreementStatus, agreementSender, sentAt, acceptedAt } = agreement

  return (
    <Container top='small'>
      <DL labelColumnWidth={11} defaultValue={NO_VALUE}>
        <DL.Row>
          <DL.Item label='Sender' value={agreementSender?.fullName} />
          <DL.Item label='Status'>
            <Typography
              weight='semibold'
              size='medium'
              color={STATUS_MAP[agreementStatus].color}
            >
              {STATUS_MAP[agreementStatus].text}
            </Typography>
          </DL.Item>
        </DL.Row>
        <DL.Row>
          <DL.Item
            label='Agreement Sent at'
            value={sentAt ? parseAndFormatDateTime(sentAt) : null}
          />
          <DL.Item
            label='Agreement Accepted at'
            value={
              acceptedAt
                ? parseAndFormatDateTime(acceptedAt, {
                    dateFormat: DEFAULT_DATE_FORMAT
                  })
                : null
            }
          />
        </DL.Row>
      </DL>
    </Container>
  )
}

export default AgreementItemFields
