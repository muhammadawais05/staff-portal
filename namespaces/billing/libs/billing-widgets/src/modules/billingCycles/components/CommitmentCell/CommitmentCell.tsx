import { Amount, Exclamation16, Tooltip, Typography } from '@toptal/picasso'
import { Link } from '@topkit/react-router'
import { DateTime } from 'luxon'
import { Trans, useTranslation } from 'react-i18next'
import { isEqual, startCase, uniqueId } from 'lodash-es'
import React, { FC, ReactNode, memo } from 'react'
import { parse } from '@staff-portal/billing/src/_lib/dateTime'

import { CommitmentFragment } from '../../../__fragments__/commitmentFragment.graphql.types'
import * as S from './styles'

interface Props {
  isRemoved: boolean
  actualCommitment: CommitmentFragment
  originalCommitment: CommitmentFragment
}

const displayName = 'CommitmentCell'

export const CommitmentCell: FC<Props> = memo(
  ({ isRemoved, actualCommitment, originalCommitment }) => {
    const { t: translate } = useTranslation('billingCycleTable')

    const tooltip: ReactNode[] = []

    const addLine = (...args: ReactNode[]) =>
      tooltip.push(
        <Typography invert key={uniqueId()}>
          {args}
        </Typography>
      )

    const commitment =
      actualCommitment &&
      translate(
        `CommitmentAvailability.${actualCommitment.availability}` as const
      )

    if (isEqual(actualCommitment, originalCommitment)) {
      return (
        <Typography
          data-testid='BillingCycleTableRowCommitment'
          css={S.typography(isRemoved)}
        >
          {commitment}
        </Typography>
      )
    }

    addLine(
      translate('CommitmentChange.date', {
        date: parse(actualCommitment.startDate).toLocaleString(
          DateTime.DATE_MED
        )
      })
    )

    if (actualCommitment.companyRate !== originalCommitment.companyRate) {
      addLine(
        ' ',
        <Trans
          components={[
            <Amount amount={originalCommitment.companyRate} key='orig' />,
            <Amount amount={actualCommitment.companyRate} key='actual' />
          ]}
          i18nKey='CommitmentChange.companyRate'
          key={uniqueId()}
          t={translate}
        />
      )
    }

    if (actualCommitment.talentRate !== originalCommitment.talentRate) {
      addLine(
        ' ',
        <Trans
          components={[
            <Amount amount={originalCommitment.talentRate} key='orig' />,
            <Amount amount={actualCommitment.talentRate} key='actual' />
          ]}
          i18nKey='CommitmentChange.talentRate'
          key={uniqueId()}
          t={translate}
        />
      )
    }

    if (actualCommitment.availability !== originalCommitment.availability) {
      addLine(
        ' ',
        translate('CommitmentChange.availability', {
          from: startCase(originalCommitment.availability),
          to: startCase(actualCommitment.availability)
        })
      )
    }

    if (
      actualCommitment.availabilityHours !==
      originalCommitment.availabilityHours
    ) {
      addLine(
        ' ',
        translate('CommitmentChange.availabilityHours', {
          from: originalCommitment.availabilityHours,
          to: actualCommitment.availabilityHours
        })
      )
    }

    return (
      <Typography
        css={S.typography(isRemoved)}
        data-testid='BillingCycleTableRowCommitment'
        forwardedAs='div'
      >
        {actualCommitment &&
          translate(
            `CommitmentAvailability.${actualCommitment.availability}` as const
          )}
        <Tooltip content={tooltip} interactive>
          <Link>
            <Exclamation16
              css={S.tableExclamationIcon}
              data-testid='ExclamationIcon'
            />
          </Link>
        </Tooltip>
      </Typography>
    )
  }
)

CommitmentCell.displayName = displayName

export default CommitmentCell
