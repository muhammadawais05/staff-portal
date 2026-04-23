import React from 'react'
import {
  Typography,
  TypographyProps,
  QuestionMark16,
  Tooltip,
  Container
} from '@toptal/picasso'
import {
  TalentSpecializationApplicationStatus,
  SpecializationApplicationRejectionReasonValue
} from '@staff-portal/graphql/staff'
import { titleize } from '@staff-portal/string'

import { TalentSpecializationApplicationFragment } from '../../data/talent-specialization-application-fragment'

export const TALENT_SPECIALIZATION_APPLICATION_STATUS_MAPPING: {
  [key: string]: {
    color: TypographyProps['color']
    text: string
  }
} = {
  [TalentSpecializationApplicationStatus.APPROVED]: {
    color: 'green',
    text: 'Approved'
  },
  [TalentSpecializationApplicationStatus.CANCELLED]: {
    color: 'dark-grey',
    text: 'Cancelled'
  },
  [TalentSpecializationApplicationStatus.PENDING]: {
    color: 'yellow',
    text: 'Applied'
  },
  [TalentSpecializationApplicationStatus.REJECTED]: {
    color: 'red',
    text: 'Rejected'
  },
  [TalentSpecializationApplicationStatus.REJECTED_INACTIVE]: {
    color: 'red',
    text: 'Rejected (Inactive)'
  }
}

export type Props = Pick<
  NonNullable<TalentSpecializationApplicationFragment>,
  'status' | 'rejectionReason'
>

const TalentSpecializationApplicationItemStatus = ({
  status,
  rejectionReason
}: Props) => {
  if (!status) {
    return null
  }

  const talentStatus = TALENT_SPECIALIZATION_APPLICATION_STATUS_MAPPING[status]

  return (
    <Container as='span' flex alignItems='center' inline>
      <Typography as='span' color={talentStatus.color} weight='semibold'>
        {talentStatus.text}
      </Typography>
      {rejectionReason && (
        <Tooltip
          content={
            <>
              <Typography as='div' color='inherit'>
                Rejected at {titleize(rejectionReason.place)}.
              </Typography>
              <Typography as='div' color='inherit'>
                {rejectionReason.reason ===
                SpecializationApplicationRejectionReasonValue.OTHER
                  ? `Comment: ${rejectionReason.comment}`
                  : `Reason: ${titleize(rejectionReason.reason)}.`}
              </Typography>
            </>
          }
        >
          <Container
            flex
            as='span'
            left='xsmall'
            data-testid='rejection-reason-tooltip-icon'
          >
            <QuestionMark16 color='grey' />
          </Container>
        </Tooltip>
      )}
    </Container>
  )
}

export default TalentSpecializationApplicationItemStatus
