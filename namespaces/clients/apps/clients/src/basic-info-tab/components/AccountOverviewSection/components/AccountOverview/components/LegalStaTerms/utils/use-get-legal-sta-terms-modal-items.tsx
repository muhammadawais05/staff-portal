import React from 'react'
import { TypographyOverflow } from '@toptal/picasso'
import {
  DetailedListItem,
  LinkWrapper,
  TypographyOverflowLink
} from '@staff-portal/ui'
import { useUserDateFormatter } from '@staff-portal/current-user'

import { CompanyOverviewFragment } from '../../../../../data'

export type Props = Pick<CompanyOverviewFragment, 'activeStaContract'>

export const useGetLegalStaTermsModalItems = ({ activeStaContract }: Props) => {
  const userDateFormatter = useUserDateFormatter()
  const staTerms = activeStaContract?.staTerms

  const getTerminationPeriod = () =>
    staTerms?.terminationPeriodApplicable
      ? `${staTerms?.terminationPeriodInDays} business days`
      : 'Not applicable'

  const getType = () => (staTerms?.standard ? 'Standard' : 'Custom')

  const getSignedOnDate = () =>
    activeStaContract?.signatureReceivedAt &&
    userDateFormatter(activeStaContract?.signatureReceivedAt)

  return [
    [
      [
        'Type',
        <TypographyOverflowLink>
          <LinkWrapper
            wrapWhen={Boolean(activeStaContract?.webResource?.url)}
            href={activeStaContract?.webResource?.url as string}
          >
            {getType()}
          </LinkWrapper>
        </TypographyOverflowLink>
      ],
      [
        'Termination period',
        <TypographyOverflow size='medium'>
          {getTerminationPeriod()}
        </TypographyOverflow>
      ]
    ],
    [
      [
        'Signed On',
        <TypographyOverflow size='medium'>
          {getSignedOnDate()}
        </TypographyOverflow>
      ]
    ]
  ].map(item =>
    item.map(([label, value]) => ({ label, value } as DetailedListItem))
  )
}
