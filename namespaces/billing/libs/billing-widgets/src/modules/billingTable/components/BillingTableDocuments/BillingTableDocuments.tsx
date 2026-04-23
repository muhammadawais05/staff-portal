import { Container, Typography } from '@toptal/picasso'
import React, { FC, memo, ComponentProps } from 'react'
import { CommercialDocument } from '@staff-portal/graphql/staff'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'

import BillingTableDocument from '../BillingTableDocument'

const displayName = 'BillingTableDocuments'

interface Props {
  data?: {
    nodes?: (ComponentProps<typeof BillingTableDocument>['document'] &
      Pick<CommercialDocument, 'id'>)[]
  }
  testid?: string
  hasChildAdjustments?: boolean
}

export const BillingTableDocuments: FC<Props> = memo(
  ({ data, testid = displayName, hasChildAdjustments }) => {
    if (!data?.nodes?.length) {
      return (
        <Typography data-testid={`${testid}-empty`} as='span'>
          {EMPTY_DATA}
        </Typography>
      )
    }

    return (
      <Typography data-testid={`${testid}-wrapper`} as='span'>
        {data.nodes.map((document, index) => (
          <Container
            right={0.5}
            as='span'
            data-testid={`${testid}-item_${index}`}
            key={document.id || index}
          >
            <BillingTableDocument
              document={document}
              testid={`${testid}-item_${index}`}
              hasChildAdjustments={hasChildAdjustments}
            />
          </Container>
        ))}
      </Typography>
    )
  }
)

BillingTableDocuments.displayName = displayName

export default BillingTableDocuments
