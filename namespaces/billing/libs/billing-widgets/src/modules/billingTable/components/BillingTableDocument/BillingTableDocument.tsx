import React, { FC, memo, ComponentProps } from 'react'
import { Exclamation16 } from '@toptal/picasso'
import { CommercialDocument } from '@staff-portal/graphql/staff'
import LinkWrapper from '@staff-portal/billing/src/components/LinkWrapper'

import * as S from './styles'
import { hasAdjustmentText } from '../../utils'
import AmountWithStatusColor from '../../../commercialDocument/components/AmountWithStatusColor'
import BillingAmountChildAdjustmentText from '../BillingAmountChildAdjustmentText'
import BillingAmountTooltip from '../BillingAmountTooltip'

type Document = ComponentProps<
  typeof BillingAmountChildAdjustmentText
>['document'] &
  ComponentProps<typeof BillingAmountTooltip>['data'] &
  Pick<CommercialDocument, 'url' | 'amount' | 'id'>
export interface BillingTableDocumentProps {
  document: Document
  hasChildAdjustments?: boolean
  tooltipPlacement?: 'bottom' | 'left' | 'right' | 'top'
  testid?: string
}

const displayName = 'BillingTableDocument'

export const BillingTableDocument: FC<BillingTableDocumentProps> = memo(
  ({
    document,
    hasChildAdjustments,
    tooltipPlacement,
    testid = displayName
  }) => {
    const showExclamationMark =
      hasChildAdjustments || hasAdjustmentText(document)
    const { amount, status } = document
    const content = (
      <LinkWrapper
        href={document.url as string}
        noUnderline
        data-testid={`${testid}-link`}
      >
        <AmountWithStatusColor
          amount={amount}
          status={status}
          data-testid={`${testid}-amount`}
        />
        {showExclamationMark && (
          <Exclamation16
            css={S.tableExclamationIcon}
            data-testid={`${testid}-exclamationMark`}
          />
        )}
      </LinkWrapper>
    )
    const showTooltip = (document.status as string) !== ''

    return showTooltip ? (
      <BillingAmountTooltip
        data={document}
        testid={`${testid}-tooltip`}
        postText={
          <BillingAmountChildAdjustmentText
            document={document}
            hasChildAdjustments={hasChildAdjustments}
          />
        }
        placement={tooltipPlacement}
      >
        <div>{content}</div>
      </BillingAmountTooltip>
    ) : (
      content
    )
  }
)

BillingTableDocument.defaultProps = { hasChildAdjustments: false }

export default BillingTableDocument
