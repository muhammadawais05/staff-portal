import { Table } from '@toptal/picasso'
import { SelectableTableRowCheckboxCell } from '@staff-portal/forms'
import React, { FC, memo } from 'react'
import { PurchaseOrderLine } from '@staff-portal/graphql/staff'
import WebResourceLinkWrapper from '@staff-portal/billing/src/components/WebResourceLinkWrapper'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'
import { WebResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql.types'

import { GetConsolidationDefaultsQuery } from '../../data/getConsolidationDefaults.graphql.types'
import EngagementsTableRowIcon from '../EngagementsTableRowIcon'
import * as S from './styles'
import { useEngagementTableRowState } from './utils'

const displayName = 'EngagementsTableRow'

type Engagement = Exclude<
  GetConsolidationDefaultsQuery['node'],
  undefined | null
>['consolidationDefaults']['nodes'][0]['engagements']['nodes'][0] & {
  effectivePurchaseOrder?: Pick<
    PurchaseOrderLine,
    'poLineNumber' | 'webResource'
  > | null
  consolidationDefault?: {
    id: string
    name: string
    deleted?: boolean
    client: {
      id: string
      webResource: WebResourceFragment
    }
  }
}

interface Props {
  isEven?: boolean
  engagement: Engagement
  isSelectable?: boolean
  parentConsolidationDefaultId?: string
}

const EngagementsTableRow: FC<Props> = memo<Props>(
  ({
    engagement: {
      id,
      client,
      job,
      talent,
      effectivePurchaseOrder,
      isWorking,
      consolidationDefault
    },
    isEven,
    parentConsolidationDefaultId,
    isSelectable = false
  }) => {
    const { isDisabled, isCheckboxDisabled } = useEngagementTableRowState({
      isWorking: !!isWorking,
      consolidationDefault,
      isSelectable,
      parentConsolidationDefaultId
    })

    return (
      <Table.Row
        stripeEven={isEven}
        data-testid={displayName}
        css={S.rowStyle(isDisabled)}
      >
        {isSelectable && (
          <SelectableTableRowCheckboxCell
            data-testid={`${displayName}-checkbox`}
            disabled={isCheckboxDisabled}
            fieldName='engagementIds'
            id={id}
          />
        )}
        <Table.Cell data-testid={`${displayName}-company`}>
          <WebResourceLinkWrapper webResource={client?.webResource} inline />
          {isDisabled && (
            <EngagementsTableRowIcon
              isWorking={!!isWorking}
              webResource={{
                text: consolidationDefault?.name as string,
                url: `${client?.webResource.url}#legal_and_billing`
              }}
            />
          )}
        </Table.Cell>
        <Table.Cell data-testid={`${displayName}-job`}>
          <WebResourceLinkWrapper webResource={job?.webResource} />
        </Table.Cell>
        <Table.Cell data-testid={`${displayName}-talent`}>
          <WebResourceLinkWrapper webResource={talent?.webResource} />
        </Table.Cell>
        <Table.Cell data-testid={`${displayName}-po-number`}>
          {effectivePurchaseOrder ? (
            <WebResourceLinkWrapper
              webResource={effectivePurchaseOrder?.webResource}
            />
          ) : (
            EMPTY_DATA
          )}
        </Table.Cell>
        {isSelectable && (
          <Table.Cell data-testid={`${displayName}-consolidationDefault`}>
            {consolidationDefault ? (
              <WebResourceLinkWrapper
                webResource={{
                  text: consolidationDefault.name,
                  url: `${consolidationDefault.client.webResource.url}#legal_and_billing`
                }}
              />
            ) : (
              EMPTY_DATA
            )}
          </Table.Cell>
        )}
      </Table.Row>
    )
  }
)

EngagementsTableRow.displayName = displayName

export default EngagementsTableRow
