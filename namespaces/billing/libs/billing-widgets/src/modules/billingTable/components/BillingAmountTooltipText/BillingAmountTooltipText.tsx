import { Typography } from '@toptal/picasso'
import { camelCase } from 'lodash-es'
import { useTranslation } from 'react-i18next'
import React, { FC, ReactNode, memo } from 'react'
import {
  CommercialDocument,
  Client,
  DocumentStatus
} from '@staff-portal/graphql/staff'
import { EnumKeysToCamelCase } from '@staff-portal/billing/src/@types/types'

const displayName = 'BillingAmountTooltipText'

interface Props {
  data: Pick<CommercialDocument, 'status'> & {
    subjectObject?: Pick<Client, 'fullName'>
  }
  postText?: ReactNode
  preText?: ReactNode
  testid?: string
}

export const BillingAmountTooltipText: FC<Props> = memo(
  ({
    data: { status, subjectObject },
    postText,
    preText,
    testid = displayName
  }) => {
    const { t: translate } = useTranslation('common')
    const subjectName = subjectObject?.fullName
    const pseudoStatus = camelCase(status) as EnumKeysToCamelCase<
      typeof DocumentStatus
    >
    const transformedStatus = translate(
      `documents.statuses.${pseudoStatus}` as const
    )

    let content = ''

    if (transformedStatus && subjectName) {
      content = `${transformedStatus}, ${subjectName}`
    } else if (subjectName) {
      content = subjectName
    } else {
      content = `${transformedStatus}, `
    }

    return (
      <>
        {preText && (
          <Typography data-testid={`${testid}-preText`}>{preText}</Typography>
        )}

        <Typography data-testid={`${testid}-text`}>{content}</Typography>
        {postText && (
          <Typography data-testid={`${testid}-postText`}>{postText}</Typography>
        )}
      </>
    )
  }
)

BillingAmountTooltipText.displayName = displayName

export default BillingAmountTooltipText
