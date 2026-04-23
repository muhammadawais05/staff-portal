import { Container, QuestionMark16, Tooltip, Typography } from '@toptal/picasso'
import React, { FC, HTMLAttributes, memo, ComponentProps } from 'react'
import { getDocumentStatusColor } from '@staff-portal/billing/src/_lib/helpers/billing'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'

import { PaymentListItemFragment } from '../../../__fragments__/paymentListItemFragment.graphql.types'
import { InvoiceListItemFragment } from '../../../__fragments__/invoiceListItemFragment.graphql.types'
import {
  CommercialDocumentType,
  getTooltipContent,
  getDocumentStatusText
} from '../../utils'

const displayName = 'CommercialDocumentStatus'

type PaymentDocumentType = Pick<
  PaymentListItemFragment,
  'status' | 'statusComment' | 'subjectObject'
>

type InvoiceDocumentType = Pick<
  InvoiceListItemFragment,
  | 'status'
  | 'statusComment'
  | 'subjectObject'
  | 'consolidatedDocument'
  | 'actionDueOn'
>

export interface Props
  extends HTMLAttributes<HTMLElement>,
    Pick<ComponentProps<typeof Typography>, 'size'> {
  document: PaymentDocumentType | InvoiceDocumentType
  nodeType?: CommercialDocumentType
  withDate?: boolean
  showTooltip?: boolean
}

const CommercialDocumentStatus: FC<Props> = memo<Props>(
  ({
    document: { status, ...documentProps },
    nodeType,
    withDate,
    showTooltip = true,
    size,
    ...rest
  }) => {
    // Only parent document should have a status indicator
    if ((documentProps as InvoiceListItemFragment)?.consolidatedDocument) {
      return (
        <Typography
          {...rest}
          color='dark-grey'
          weight='semibold'
          as='span'
          size={size}
        >
          {EMPTY_DATA}
        </Typography>
      )
    }

    const tooltipContent = getTooltipContent({
      nodeType,
      document: { ...documentProps, status }
    })

    const statusContent = (
      <Typography
        {...rest}
        color={getDocumentStatusColor(status)}
        weight='semibold'
        as='span'
        size={size}
      >
        {getDocumentStatusText(
          {
            status,
            actionDueOn: (documentProps as InvoiceListItemFragment)?.actionDueOn
          },
          { withDate }
        )}
      </Typography>
    )

    if (!tooltipContent || !showTooltip) {
      return statusContent
    }

    return (
      <Tooltip
        content={tooltipContent}
        interactive
        data-testid={`${displayName}-tooltip`}
      >
        <Container as='span' flex alignItems='center' inline>
          {statusContent}
          <Container as='span' left='xsmall' flex alignItems='center'>
            <QuestionMark16 color='dark-grey' />
          </Container>
        </Container>
      </Tooltip>
    )
  }
)

CommercialDocumentStatus.displayName = displayName

export default CommercialDocumentStatus
